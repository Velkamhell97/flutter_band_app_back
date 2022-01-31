const { Socket, Server } = require('socket.io');
const Band = require('../models/band');

const Bands = require('../models/bands');

//-La bandas se crearan siempre que se modifiquen archivos del backend, que idealmente esto no ocurre
//-por eso se podria decir que esto es una medio persistencia, tambien se podria trabajar con json
const bands = new Bands();

bands.addBand(new Band('Goku'))

//-Cuando un cliente (puede ser una pagina o un telefono) se conecta al server se pasa por este metodo
const socketController = async (client = new Socket(), server = new Server()) => {
  console.log('Client Connected (From Server)');

  client.emit('get-bands', bands.getBands())

  client.on('add-band', (name) => {
    bands.addBand(new Band(name));

    server.emit('get-bands', bands.getBands())
  })

  client.on('vote-band', (id) => {
    bands.voteBand(id);

    server.emit('get-bands', bands.getBands())
  })

  client.on('delete-band', (id) => {
    bands.deleteBand(id);

    server.emit('get-bands', bands.getBands())
  })

  //-Cuando un cliente se desconecta, ya sea reiniciando el navegador o saliendo de la pagina se dispara este evento
  client.on('disconnect', () => {
    console.log('Client Disconnected (From Server)');
  })

  //*---------------------------------------Message Event-----------------------------*//
  //-Cuando el cliente emite el evento mensaje, el servidor lo recibe y lo responde con un evento de igual nomber
  //-el cliente escucha este evento y lo procesa
  client.on('message', (payload) => {
    //-Para ver formateado el objeto utilizamos el %O
    console.log(`Message From Client %O`, payload);

    //-Este mensaje es broadcast, a todos, es decir que se va ejecutar el on 'message', del cliente asi
    //-este lo haya enviado
    // server.emit('message', { server: 'Velkamhell'})

    client.broadcast.emit('message', payload);

  })

  //*---------------------------------------Mobile Message Event-----------------------------*//
  client.on('mobile-message', (payload) => {
    //-Para ver formateado el objeto utilizamos el %O
    console.log(`Message From Mobile %O`, payload);

    //-Este mensaje es broadcast, lo emite a todos los clientes conectados incluyendo el que lo emitio, cabe aclarar
    //-que para que esto pase el que lo emitio tambien debe tener un evento on 'mobile-message'
    // server.emit('mobile-message', payload)

    //Este mensaje igual lo emite a todos los clientes excepto el que lo emitio
    client.broadcast.emit('mobile-message', payload);
  })

  
}

module.exports = {
  socketController
}