import axios from 'axios';

import { DexscreenerService } from '../service/dexscreener.service';

import { mockSearchTokenInfoResponse } from './dexscreener.service.mockData';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('DexscreenerService', () => {
  let dexscreenerService: DexscreenerService;

  beforeEach(() => {
    dexscreenerService = new DexscreenerService();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  it('should search token info successfully', async () => {
    mockedAxios.get.mockResolvedValue({
      status: 200,
      data: mockSearchTokenInfoResponse,
    });

    const result = await dexscreenerService.searchTokenInfo('ETH');
    expect(result).toEqual(mockSearchTokenInfoResponse);
  });

  it('should return null when the status code is not 200', async () => {
    mockedAxios.get.mockResolvedValue({
      status: 404,
      data: {},
    });

    const result = await dexscreenerService.searchTokenInfo('ETH');
    expect(result).toBeNull();
  });
});
