export interface HeadCell {
  id: string;
  name: string;
}

export type RowData = Coin & { chartData: number[][] };
export interface Coin {
  id: string;
  icon: string;
  name: string;
  symbol: string;
  rank: number;
  price: number;
  priceBtc: number;
  marketCap: number;
  volume: number;
  availableSupply: number;
  totalSupply: number;
  priceChange1h: number;
  priceChange1d: number;
  priceChange1w: number;
}

export type SortValue = keyof Coin;

export type OrderDirection = "asc" | "desc";
