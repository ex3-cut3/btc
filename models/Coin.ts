export interface Coin {
   time: {
      updated: string,
      updatedISO: string,
      updateduk: string,
   },
   disclaimer: string,
   chartName: string,
   bpi: Currencies
}

export interface Currency {
   code: string,
   symbol: string,
   rate: string,
   description: string,
   rate_float: number
}

export interface Currencies {
   USD: Currency,
   GBP: Currency,
   EUR: Currency
}

export type CustomRecord<T> = Record<string, T>;
