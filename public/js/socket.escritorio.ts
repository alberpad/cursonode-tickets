// import io from 'socket.io';
namespace socketEscritorio {
  // Comando para establecer la conexión
  // @ts-ignore
  let socket = io();

  // // Comando para detectar conexiones
  // socket.on('connect', function() {
  //   console.log('Conectado al servidor');
  // });

  // socket.on('disconnect', function() {
  //   console.log('Desconectado del servidor');
  // });
  let small = $('small');
  let searchParams = new URLSearchParams(window.location.search);
  if (!searchParams.has('escritorio')) {
    window.location = <any>'index.html';
    throw new Error('El escritorio es necesario');
  }
  let escritorio = searchParams.get('escritorio');
  console.log(escritorio);
  $('h1').text(`Escritorio: ${escritorio}`);
  $('button').on('click', function() {
    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp: any) {
      console.log(resp);
      if (resp.numero === -1) {
        small.text(`No hay tickets`);

        alert('No hay más tickets');
        return;
      }
      small.text(`Ticket ${resp.numero}`);
    });
  });
}
