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
socket.emit('message', {
  client: 'Daniel',
})

socket.on('message', (payload) => {
  console.log('Message From Server %O', payload);
})