import express from 'express';
import socketIO from 'socket.io';
import http from 'http';

import path from 'path';

const app: express.Application = express();
let server: http.Server = http.createServer(app);

const publicPath: string = path.resolve(__dirname, '../public');
const port: string = process.env.PORT || '3000';

app.use(express.static(publicPath));

// IO = esta es la comunicacion del backend
export const io = socketIO(server);
// require('./sockets/socket');
import './sockets/socket';

server.listen(port, (err: any) => {
  if (err) throw new Error(err);

  console.log(`Servidor corriendo en puerto ${port}`);
});
