import fs from 'fs';

class Ticket {
  constructor(numero: number, escritorio: number) {
    this.numero = numero;
    this.escritorio = escritorio;
  }
  numero: number;
  escritorio: number;
}

export class TicketControl {
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
    } else {
      this.reiniciarConteo();
    }
  }

  siguiente(): string {
    this.ultimo += 1;
    let ticket: Ticket = new Ticket(this.ultimo, 0);
    this.tickets.push(ticket);
    this.grabarArchivo();
    return `Ticket ${this.ultimo}`;
  }

  getUltimoTicket(): string {
    return `Ticket ${this.ultimo}`;
  }

  getUltimos4(): Ticket[] {
    return this.ultimos4;
  }

  atenderTicket(escritorio: number): Ticket {
    if (!this.tickets) {
      return new Ticket(-1, -1);
    }
    console.log(this.tickets[0]);
    //let numeroTicket = 1;
    let numeroTicket: number = this.tickets[0].numero;
    // Eliminamos el primer elemento de tickets
    this.tickets.shift();
    let atenderTicket = new Ticket(numeroTicket, escritorio);
    // Metemos el próximo ticket en atender al incicio de ultimos4
    this.ultimos4.unshift(atenderTicket);
    if (this.ultimos4.length > 4) {
      // Borramos el último
      this.ultimos4.splice(-1, 1);
    }

    console.log('ultimos4: ', this.ultimos4);

    this.grabarArchivo();
    return atenderTicket;
  }

  reiniciarConteo(): void {
    this.ultimo = 0;
    this.tickets = [];
    this.ultimos4 = [];
    this.grabarArchivo();
    console.log('Se ha inicializado el sistema');
  }

  grabarArchivo(): void {
    let jsonData = {
      ultimo: this.ultimo,
      hoy: this.hoy,
      tickets: this.tickets,
      ultimos4: this.ultimos4
    };
    let jsonDataString = JSON.stringify(jsonData);
    fs.writeFileSync('./server/data/data.json', jsonDataString);
  }

  ultimo: number;
  hoy: number;
  tickets: Ticket[];
  ultimos4: Ticket[];
}

export default TicketControl;
