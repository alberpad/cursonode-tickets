// import {io} from 'socket.io';

// Comando para establecer la conexión
// @ts-ignore
let socket = io();
let label = $('#lblNuevoTicket');

// Comando para detectar conexiones
socket.on('connect', function() {
  console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
  console.log('Desconectado del servidor');
});

socket.on('estadoActual', function(resp: any) {
  label.text(resp.actual);
});

$('button').on('click', function() {
  socket.emit('siguienteTicket', null, function(siguienteTicket: number) {
    label.text(siguienteTicket);
  });
});
