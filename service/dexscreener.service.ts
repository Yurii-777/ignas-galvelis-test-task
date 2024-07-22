const axios = require('axios');

import { APILogger } from '../logger/api.logger';

import { DEXSCREENER_API } from '../constants/dexscreenerApi';
import { SearchTokenInfoResponse } from './dexscreener.types';

export class DexscreenerService {
  private logger: APILogger;

  constructor() {
    this.logger = new APILogger();
  }

  async searchTokenInfo(tokenName: string): Promise<null | SearchTokenInfoResponse> {
    this.logger.info('DexscreenerService: searchTokenInfo', null);

    try {
      const result = await axios.get(DEXSCREENER_API.SEARCH_PAIRS.replace('${tokenName}', tokenName));

      if (result?.status !== 200) return null;

      return result.data;
    } catch (error) {
      this.logger.info('ERROR DexscreenerService: searchTokenInfo :::', error);

      return null;
    }
  }
}
