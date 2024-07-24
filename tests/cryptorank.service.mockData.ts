import { GetCurrenciesResponse, TokenModel } from '../service/cryptorank.types';

const mockToken: TokenModel = {
  id: 1,
  rank: 1,
  slug: 'bitcoin',
  name: 'Bitcoin',
  symbol: 'BTC',
  category: 'cryptocurrency',
  type: 'coin',
  volume24hBase: 1000000000,
  circulatingSupply: 18500000,
  totalSupply: 21000000,
  maxSupply: 21000000,
  values: {
    USD: {
      price: 30000,
      volume24h: 1000000000,
      high24h: 31000,
      low24h: 29000,
      marketCap: 555000000000,
      percentChange24h: 2.5,
      percentChange7d: 5.0,
      percentChange30d: 10.0,
      percentChange3m: 20.0,
      percentChange6m: 40.0,
    },
  },
  lastUpdated: new Date().toISOString(),
  tokens: [],
};

export const mockGetCurrenciesResponse: GetCurrenciesResponse = {
  data: [mockToken],
};
