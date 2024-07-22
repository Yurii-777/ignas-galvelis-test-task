import express = require('express');
import bodyParser = require('body-parser');

import { APILogger } from './logger/api.logger';
import { CryptoDataManagerController } from './controller/cryptoDataManager.controller';

import { getTokenData } from './middlewares/getTokenData.middleware';
import { handleValidate } from './middlewares/handleValidate';

import { handleResponse } from './utils/handleResponse';

class App {
  public express: express.Application;
  public logger: APILogger;
  public cryptoDataManagerController: CryptoDataManagerController;

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
    this.logger = new APILogger();
    this.cryptoDataManagerController = new CryptoDataManagerController();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
      if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
      }
      next();
    });
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  private routes(): void {
    // For health check
    this.express.get('/healthcheck', (req, res, next) => {
      res.send('Ok!');
    });

    // document api
    this.express.get('/api/crypto-data/:id', getTokenData, handleValidate, (req, res, next) => {
      this.cryptoDataManagerController.fetchTokenInfo(req, res, next);
    });

    // global error handler
    this.express.use((error, req, res, next) => {
      this.logger.error(error);
      return handleResponse(res, 500, error.statusMessage, undefined, error);
    });

    // handle undefined routes
    this.express.use('*', (req, res, next) => {
      res.status(404).send('API endpoint not found');
    });
  }
}

export default new App().express;
