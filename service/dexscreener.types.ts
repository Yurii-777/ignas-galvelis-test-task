interface Volume {
  h24: number;
  h6: number;
  h1: number;
  m5: number;
}

interface Token {
  address: string;
  name: string;
  symbol: string;
}

export interface TokenModel {
  chainId: string;
  dexId: string;
  url: string;
  pairAddress: string;
  baseToken: Token;
  quoteToken: Token;
  priceNative: string;
  priceUsd: string;
  volume: Volume;
  pairCreatedAt: number;
}

export interface SearchTokenInfoResponse {
  schemaVersion: '1.0';
  pairs: TokenModel[];
}
