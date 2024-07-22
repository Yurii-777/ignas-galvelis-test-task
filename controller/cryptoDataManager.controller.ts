import { Request, Response, NextFunction } from 'express';

import { APILogger } from '../logger/api.logger';
import { DexscreenerService } from '../service/dexscreener.service';
import { CryptorankService } from '../service/cryptorank.service';
import { AiService } from '../service/ai.service';

import { handleResponse } from '../utils/handleResponse';
import { mapDexscreenerPairs } from '../mappers/dexscreener.mappers';

export class CryptoDataManagerController {
  private logger: APILogger;
  private dexscreenerService: DexscreenerService;
  private cryptorankService: CryptorankService;
  private aiService: AiService;

  constructor() {
    this.logger = new APILogger();
    this.dexscreenerService = new DexscreenerService();
    this.cryptorankService = new CryptorankService();
    this.aiService = new AiService();
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
      const tokenName = req.params.tokenName;
      const cryptorankCurrencies = await this.cryptorankService.getCurrencies();

      if (!cryptorankCurrencies) {
        return handleResponse(res, 400, 'Currencies was not retrived');
      }

      const foundCryptorankCurrency = cryptorankCurrencies.data.find(
        (tokenItem) => tokenItem.slug === tokenName.toLocaleLowerCase(),
      );

      if (!foundCryptorankCurrency) {
        return handleResponse(res, 400, 'Currency for provided token name was not found');
      }

      return handleResponse(res, 200, 'Tokenomics retrived successfully', foundCryptorankCurrency);
    } catch (error) {
      return next(error);
    }
  }

  async generateReport(req: Request, res: Response, next: NextFunction) {
    this.logger.info('CryptoDataManagerController: generateReport', null);

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

      const cryptorankCurrencies = await this.cryptorankService.getCurrencies();

      if (!cryptorankCurrencies) {
        return handleResponse(res, 400, 'Currencies was not retrived');
      }

      const foundCryptorankCurrency = cryptorankCurrencies.data.find(
        (tokenItem) => tokenItem.slug === tokenName.toLocaleLowerCase(),
      );

      const report = await this.aiService.generateReport({
        pairs: String(dexscreenerData?.pairs),
        tokenName,
        currencyData: foundCryptorankCurrency,
      });

      return handleResponse(res, 200, 'Report generated successfully', {
        data: report,
      });
    } catch (error) {
      return next(error);
    }
  }
}
