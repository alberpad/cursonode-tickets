"use strict";
var socketEscritorio;
(function (socketEscritorio) {
    let socket = io();
    let small = $('small');
    let searchParams = new URLSearchParams(window.location.search);
    if (!searchParams.has('escritorio')) {
        window.location = 'index.html';
        throw new Error('El escritorio es necesario');
    }
    let escritorio = searchParams.get('escritorio');
    console.log(escritorio);
    $('h1').text(`Escritorio: ${escritorio}`);
    $('button').on('click', function () {
        socket.emit('atenderTicket', { escritorio: escritorio }, function (resp) {
            console.log(resp);
            if (resp.numero === -1) {
                small.text(`No hay tickets`);
                alert('No hay más tickets');
                return;
            }
            small.text(`Ticket ${resp.numero}`);
        });
    });
})(socketEscritorio || (socketEscritorio = {}));
//# sourceMappingURL=socket.escritorio.js.map