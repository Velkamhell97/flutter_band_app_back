const { Socket, Server } = require('socket.io');

//-Cuando un cliente (puede ser una pagina o un telefono) se conecta al server se pasa por este metodo
const socketController = async (client = new Socket(), server = new Server()) => {
  console.log('Client Connected (From Server)');
  
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

    //-Este mensaje es broadcast, a todos
    server.emit('message', { server: 'Velkamhell'})
  })
}

module.exports = {
  socketController
}