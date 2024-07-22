const axios = require('axios');

import { APILogger } from '../logger/api.logger';

export class BirdseyeService {
  private logger: APILogger;

  constructor() {
    this.logger = new APILogger();
  }

  async searchTokenInfo(tokenName: string) {
    this.logger.info('BirdseyeService: searchTokenInfo', null);

    try {
      // TODO: Get tokens info
      // Unauthorized for many API endpoints ...
    } catch (error) {
      this.logger.info('ERROR BirdseyeService: searchTokenInfo :::', error);

      return null;
    }
  }
}
