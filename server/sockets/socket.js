"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../server");
const ticket_control_1 = require("../classes/ticket-control");
const ticketControl = new ticket_control_1.TicketControl();
server_1.io.on('connection', (client) => {
    client.on('siguienteTicket', (data, callback) => {
        let siguiente = ticketControl.siguiente();
        console.log('Siguiente ticket: ', siguiente);
        callback(siguiente);
    });
    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });
    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            });
        }
        let atenderTicket = ticketControl.atenderTicket(data.escritorio);
        callback(atenderTicket);
        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()
        });
    });
});
//# sourceMappingURL=socket.js.map