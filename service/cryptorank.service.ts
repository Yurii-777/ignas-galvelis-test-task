const axios = require('axios');

import { APILogger } from '../logger/api.logger';

import { CRYPTORANK_API } from '../constants/cryptorankApi';
import { GetCurrenciesResponse } from './cryptorank.types';

export class CryptorankService {
  private logger: APILogger;

  constructor() {
    this.logger = new APILogger();
  }

  async getCurrencies(): Promise<null | GetCurrenciesResponse> {
    try {
      const result = await axios.get(
        CRYPTORANK_API.GET_CURRENCIES.replace('${API_KEY}', process.env.CRYPTORANK_API_KEY),
      );

      if (result?.status !== 200) return null;

      return result.data;
    } catch (error) {
      this.logger.info('ERROR CryptorankService: getCurrencies :::', error);

      return null;
    }
  }
}
