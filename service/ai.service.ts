const axios = require('axios');

import { APILogger } from '../logger/api.logger';
import { INITIAL_INSTRUCTION, OPEN_AI_API, OPEN_AI_MODELS } from '../constants/openAIapi';

export class AiService {
  private logger: APILogger;

  constructor() {
    this.logger = new APILogger();
  }

  async generateReport({ pairs, tokenName, currencyData }) {
    this.logger.info('AiService: generateReport', null);

    try {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPEN_AI_KEY}`,
      };

      const payload = {
        model: OPEN_AI_MODELS.GPT_4o,
        messages: [
          {
            role: 'system',
            content: INITIAL_INSTRUCTION,
          },
          {
            role: 'user',
            content: `pairs: ${pairs}. tokenName: ${tokenName} currencyData: ${currencyData}`,
          },
        ],
        temperature: 0.8,
        top_p: 1,
      };

      const { data } = await axios({
        method: 'post',
        headers,
        url: OPEN_AI_API.GENERATE_MESSAGE,
        data: payload,
      });

      const isSuccessful = data?.choices && !!data.choices.length;

      if (!isSuccessful) {
        return null;
      }

      const { message } = data.choices[0];
      return message?.content || null;
    } catch (error) {
      this.logger.info('ERROR AiService: generateReport :::', error);

      return null;
    }
  }
}
