import { PriceQueryResponse, PriceQuery } from './price-query.type';
import { map, pick } from 'lodash-es';
import { parse } from 'date-fns';
import { PriceQueryFetched } from './price-query.actions';

export function filterPriceQueryResponseByDate(
  action: PriceQueryFetched
): PriceQuery[] {
  /*
  endDate is coming with time as (HH:MM:SS - 00:00:00) & want it like (HH:MM:SS - 23:59:59) to check all the trasnsction happend in a day.
  So, Taking next day date with time (HH:MM:SS - 00:00:00) for comparision.
  */
  action.dateRecordObj.endDate.setDate(
    action.dateRecordObj.endDate.getDate() + 1
  );
  return transformPriceQueryResponse(action.queryResults).filter(
    dateObj =>
      new Date(dateObj.date) >= new Date(action.dateRecordObj.startDate) &&
      new Date(dateObj.date) <= new Date(action.dateRecordObj.endDate)
  );
}

export function transformPriceQueryResponse(
  response: PriceQueryResponse[]
): PriceQuery[] {
  return map(
    response,
    responseItem =>
      ({
        ...pick(responseItem, [
          'date',
          'open',
          'high',
          'low',
          'close',
          'volume',
          'change',
          'changePercent',
          'label',
          'changeOverTime'
        ]),
        dateNumeric: parse(responseItem.date).getTime()
      } as PriceQuery)
  );
}
