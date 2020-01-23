import { environment } from '../environments/environment';
const fetch = require('node-fetch');

export const stockPlugin = {
  name: 'stockPlugin',
  version: '1.0.0',
  register: async function(server, options) {
    server.route({
      method: 'GET',
      path: '/api/v1/stocks/{symbol}/{period}',
      handler: async (request, h) => {
        let stocks: any;
        const stockCacheKey: String = `${request.params.symbol}_${
          request.params.period
        }`;
        const stockCacheContent = await options.cache.get(stockCacheKey);
        if (stockCacheContent) {
          console.log('fetching data from Cache');
          stocks = stockCacheContent;
        } else {
          console.log('fetching data from API');
          const apiURL: String = `${environment.apiPath}${environment.Stocks}/${
            request.params.symbol
          }/chart/${request.params.period}?token=${environment.apiKey}`;
          const stock = await fetch(apiURL);
          stocks = await stock.json();
          await options.cache.put(
            stockCacheKey,
            stocks,
            environment.cacheTimeOut
          );
        }
        return stocks;
      }
    });
  }
};
