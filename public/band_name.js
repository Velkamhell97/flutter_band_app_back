const socket = io();

//-Cuando el cliente se conecta al servdior emite el evento connect
socket.on('connect', () => {
  console.log('Server Connected (From Client)');
})

//-Cuando se cae el servidor, se emite el evento al cliente
socket.on('disconnect', () => {
  console.log('Server Disconnect (From Client)');
})

//*---------------------------------------Message Event-----------------------------*//
//-Los emits de los clientes si van unicamente al servidor y no a otros clientes (por defecto)
socket.emit('message', {
  client: 'Daniel',
})

//-Si se envia con el broadcast.client, este codigo no se escuchara cuando sea desde el mismo cliente
//-de donde se emita un evento de igual nombre
socket.on('message', (payload) => {
  console.log('Message From Server %O', payload);
})

//*---------------------------------------Mobile Message Event-----------------------------*//
socket.on('mobile-message', (payload) => {
  console.log('Message From Server Emitted By Mobile %O', payload);
})

//*---------------------------------------Bands Event-----------------------------*//
socket.on('get-bands', (payload) => {
  console.clear();
  console.table(payload);
})
