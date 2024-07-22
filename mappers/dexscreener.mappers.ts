import { SearchTokenInfoResponse } from '../service/dexscreener.types';

export const mapDexscreenerPairs = (response: SearchTokenInfoResponse) => {
  return response.pairs.map((pair) => {
    return {
      name: pair.baseToken.name,
      price: pair.priceUsd,
      volume: pair.volume.h24,
    };
  });
};
