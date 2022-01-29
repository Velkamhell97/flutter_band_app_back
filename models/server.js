const express = require('express');
const cors = require('cors');


class Server {

  constructor () {
    this.app = express();
    this.port = process.env.PORT;

    this.server = require('http').createServer(this.app);

    this.middlewares();
  }

  middlewares() {
    this.app.use(cors());

    this.app.use(express.json());
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`Server app listening at ${this.port}`);
    })
  }
}

module.exports = Server;