import { Request, Response, NextFunction } from 'express';

import { APILogger } from '../logger/api.logger';
import { DexscreenerService } from '../service/dexscreener.service';

import { handleResponse } from '../utils/handleResponse';
import { mapDexscreenerPairs } from '../mappers/dexscreener.mappers';

export class CryptoDataManagerController {
  private logger: APILogger;
  private dexscreenerService: DexscreenerService;

  constructor() {
    this.logger = new APILogger();
    this.dexscreenerService = new DexscreenerService();
  }

  async fetchTokenInfo(req: Request, res: Response, next: NextFunction) {
    this.logger.info('Controller: fetchTokenInfo', null);

    try {
      const tokenName = req.params.id;

      const dexscreenerData = await this.dexscreenerService.searchTokenInfo(tokenName);

      if (!dexscreenerData) {
        return handleResponse(res, 400, 'Token data was not retrived');
      }

      const hasPairs = !!dexscreenerData?.pairs?.length;

      if (!hasPairs) {
        return handleResponse(res, 400, 'Token pairs are empty');
      }

      const formattedResponse = mapDexscreenerPairs(dexscreenerData);

      return handleResponse(res, 200, 'Token data was retrived successfully', formattedResponse);
    } catch (error) {
      return next(error);
    }
  }
}
