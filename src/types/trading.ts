export type TradingMode = 'paper' | 'live';

export type BotStatus = 'running' | 'stopped';

export type OrderSide = 'buy' | 'sell';

export type Timeframe = '5m' | '15m';

export interface RSIConfig {
  period: number;
  buyThreshold: number;
  sellThreshold: number;
  timeframe: Timeframe;
  capitalPercentage: number;
  stopLossPercent: number;
  takeProfitPercent: number;
  maxTradesPerDay: number;
}

export interface BotConfig {
  status: BotStatus;
  mode: TradingMode;
  pair: 'BTC/USD';
  strategy: 'RSI';
  rsiConfig: RSIConfig;
  lastUpdated: string;
}

export interface Trade {
  id: string;
  pair: string;
  side: OrderSide;
  price: number;
  amount: number;
  total: number;
  fee: number;
  timestamp: string;
  pnl?: number;
  status: 'open' | 'closed';
}

export interface Signal {
  id: string;
  type: OrderSide;
  price: number;
  timestamp: string;
  rsiValue: number;
  executed: boolean;
}

export interface Alert {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  message: string;
  timestamp: string;
}

export interface DashboardStats {
  currentPrice: number;
  rsiValue: number;
  openTrade: Trade | null;
  todayTradesCount: number;
  totalPnl: number;
}
