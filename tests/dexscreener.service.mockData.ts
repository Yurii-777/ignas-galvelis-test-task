import { SearchTokenInfoResponse, TokenModel } from '../service/dexscreener.types';

const mockToken: TokenModel = {
  chainId: '1',
  dexId: 'uniswap',
  url: 'https://dexscreener.com/ethereum/0x...',
  pairAddress: '0x...',
  baseToken: {
    address: '0x...',
    name: 'Ethereum',
    symbol: 'ETH',
  },
  quoteToken: {
    address: '0x...',
    name: 'US Dollar',
    symbol: 'USD',
  },
  priceNative: '2000',
  priceUsd: '2000',
  volume: {
    h24: 1000000,
    h6: 250000,
    h1: 50000,
    m5: 5000,
  },
  pairCreatedAt: 1622547800,
};

export const mockSearchTokenInfoResponse: SearchTokenInfoResponse = {
  schemaVersion: '1.0',
  pairs: [mockToken],
};
