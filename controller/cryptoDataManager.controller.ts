import { Request, Response, NextFunction } from 'express';

import { APILogger } from '../logger/api.logger';
import { DexscreenerService } from '../service/dexscreener.service';
import { CryptorankService } from '../service/cryptorank.service';

import { handleResponse } from '../utils/handleResponse';
import { mapDexscreenerPairs } from '../mappers/dexscreener.mappers';

export class CryptoDataManagerController {
  private logger: APILogger;
  private dexscreenerService: DexscreenerService;
  private cryptorankService: CryptorankService;

  constructor() {
    this.logger = new APILogger();
    this.dexscreenerService = new DexscreenerService();
    this.cryptorankService = new CryptorankService();
  }

  async fetchTokenInfo(req: Request, res: Response, next: NextFunction) {
    this.logger.info('CryptoDataManagerController: fetchTokenInfo', null);

    try {
      const tokenName = req.params.tokenName;

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

  async fetchTokenomics(req: Request, res: Response, next: NextFunction) {
    this.logger.info('CryptoDataManagerController: fetchTokenomics', null);

    try {
      const cryptorankCurrencies = await this.cryptorankService.getCurrencies();

      if (!cryptorankCurrencies) {
        return handleResponse(res, 400, 'Currencies was not retrived');
      }

      return handleResponse(res, 200, 'Tokenomics retrived successfully', cryptorankCurrencies);
    } catch (error) {
      return next(error);
    }
  }
}
