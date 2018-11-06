import { io } from '../server';
import { TicketControl } from '../classes/ticket-control';
import { on } from 'cluster';

const ticketControl = new TicketControl();

io.on('connection', (client: SocketIO.Socket) => {
  client.on('siguienteTicket', (data, callback) => {
    let siguiente = ticketControl.siguiente();
    console.log('Siguiente ticket: ', siguiente);
    callback(siguiente);
  });
  client.emit('estadoActual', {
    actual: ticketControl.getUltimoTicket(),
    ultimos4: ticketControl.getUltimos4()
  });

  client.on('atenderTicket', (data: any, callback: any) => {
    if (!data.escritorio) {
      return callback({
        err: true,
        mensaje: 'El escritorio es necesario'
      });
    }
    let atenderTicket = ticketControl.atenderTicket(data.escritorio);
    callback(atenderTicket);
    // actualizar o notificar cambios en los ULTIMOS 4
    client.broadcast.emit('ultimos4', {
      ultimos4: ticketControl.getUltimos4()
    });
  });
});
