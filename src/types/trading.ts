export type TradingMode = 'paper' | 'live';

export type BotStatus = 'running' | 'stopped' | 'error';

export type OrderSide = 'buy' | 'sell';

export type StrategyType = 'grid' | 'dca' | 'momentum' | 'arbitrage';

export interface Bot {
  id: string;
  name: string;
  strategy: StrategyType;
  pair: string;
  status: BotStatus;
  pnl: number;
  pnlPercent: number;
  tradesCount: number;
  createdAt: string;
  lastTradeAt?: string;
}

export interface Trade {
  id: string;
  botId: string;
  botName: string;
  pair: string;
  side: OrderSide;
  price: number;
  amount: number;
  total: number;
  fee: number;
  timestamp: string;
  pnl?: number;
}

export interface StrategyConfig {
  name: string;
  strategy: StrategyType;
  pair: string;
  investment: number;
  gridLevels?: number;
  gridSpacing?: number;
  dcaInterval?: number;
  dcaAmount?: number;
  stopLoss?: number;
  takeProfit?: number;
}

export interface PortfolioStats {
  totalValue: number;
  totalPnl: number;
  totalPnlPercent: number;
  activeBots: number;
  totalTrades: number;
  winRate: number;
}
