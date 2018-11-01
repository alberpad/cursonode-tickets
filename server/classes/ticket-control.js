"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}
class TicketControl {
    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];
        let data = require('../data/data.json');
        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
        }
        else {
            this.reiniciarConteo();
        }
    }
    siguiente() {
        this.ultimo += 1;
        let ticket = new Ticket(this.ultimo, 0);
        this.tickets.push(ticket);
        this.grabarArchivo();
        return `Ticket ${this.ultimo}`;
    }
    getUltimoTicket() {
        return `Ticket ${this.ultimo}`;
    }
    getUltimos4() {
        return this.ultimos4;
    }
    atenderTicket(escritorio) {
        if (!this.tickets) {
            return new Ticket(-1, -1);
        }
        console.log(this.tickets[0]);
        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift();
        let atenderTicket = new Ticket(numeroTicket, escritorio);
        this.ultimos4.unshift(atenderTicket);
        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1);
        }
        console.log('ultimos4: ', this.ultimos4);
        this.grabarArchivo();
        return atenderTicket;
    }
    reiniciarConteo() {
        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];
        this.grabarArchivo();
        console.log('Se ha inicializado el sistema');
    }
    grabarArchivo() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        };
        let jsonDataString = JSON.stringify(jsonData);
        fs_1.default.writeFileSync('./server/data/data.json', jsonDataString);
    }
}
exports.TicketControl = TicketControl;
exports.default = TicketControl;
//# sourceMappingURL=ticket-control.js.map