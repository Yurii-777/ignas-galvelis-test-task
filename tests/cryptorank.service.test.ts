import axios from 'axios';

import { CryptorankService } from '../service/cryptorank.service';

import { mockGetCurrenciesResponse } from './cryptorank.service.mockData';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('CryptorankService', () => {
  let cryptorankService: CryptorankService;

  beforeEach(() => {
    cryptorankService = new CryptorankService();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  it('should get currencies successfully', async () => {
    mockedAxios.get.mockResolvedValue({
      status: 200,
      data: mockGetCurrenciesResponse,
    });

    const result = await cryptorankService.getCurrencies();
    expect(result).toEqual(mockGetCurrenciesResponse);
  });

  it('should return null when the status code is not 200', async () => {
    mockedAxios.get.mockResolvedValue({
      status: 404,
      data: {},
    });

    const result = await cryptorankService.getCurrencies();
    expect(result).toBeNull();
  });
});
