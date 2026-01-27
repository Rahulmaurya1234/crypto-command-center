import { create } from 'zustand';
import { TradingMode, Bot, Trade, PortfolioStats } from '@/types/trading';

interface TradingState {
  mode: TradingMode;
  setMode: (mode: TradingMode) => void;
  bots: Bot[];
  trades: Trade[];
  stats: PortfolioStats;
  toggleBot: (botId: string) => void;
  addBot: (bot: Bot) => void;
  removeBot: (botId: string) => void;
}

// Mock data for demonstration
const mockBots: Bot[] = [
  {
    id: '1',
    name: 'BTC Grid Trader',
    strategy: 'grid',
    pair: 'BTC/USDT',
    status: 'running',
    pnl: 1250.45,
    pnlPercent: 12.5,
    tradesCount: 156,
    createdAt: '2024-01-15T10:00:00Z',
    lastTradeAt: '2024-01-20T14:30:00Z',
  },
  {
    id: '2',
    name: 'ETH DCA Bot',
    strategy: 'dca',
    pair: 'ETH/USDT',
    status: 'running',
    pnl: 890.20,
    pnlPercent: 8.9,
    tradesCount: 48,
    createdAt: '2024-01-10T08:00:00Z',
    lastTradeAt: '2024-01-20T12:00:00Z',
  },
  {
    id: '3',
    name: 'SOL Momentum',
    strategy: 'momentum',
    pair: 'SOL/USDT',
    status: 'stopped',
    pnl: -125.30,
    pnlPercent: -2.5,
    tradesCount: 23,
    createdAt: '2024-01-18T15:00:00Z',
  },
];

const mockTrades: Trade[] = [
  {
    id: 't1',
    botId: '1',
    botName: 'BTC Grid Trader',
    pair: 'BTC/USDT',
    side: 'buy',
    price: 42150.00,
    amount: 0.025,
    total: 1053.75,
    fee: 1.05,
    timestamp: '2024-01-20T14:30:00Z',
    pnl: 45.20,
  },
  {
    id: 't2',
    botId: '1',
    botName: 'BTC Grid Trader',
    pair: 'BTC/USDT',
    side: 'sell',
    price: 42350.00,
    amount: 0.025,
    total: 1058.75,
    fee: 1.06,
    timestamp: '2024-01-20T13:15:00Z',
    pnl: 52.50,
  },
  {
    id: 't3',
    botId: '2',
    botName: 'ETH DCA Bot',
    pair: 'ETH/USDT',
    side: 'buy',
    price: 2480.00,
    amount: 0.5,
    total: 1240.00,
    fee: 1.24,
    timestamp: '2024-01-20T12:00:00Z',
  },
  {
    id: 't4',
    botId: '3',
    botName: 'SOL Momentum',
    pair: 'SOL/USDT',
    side: 'sell',
    price: 98.50,
    amount: 10,
    total: 985.00,
    fee: 0.99,
    timestamp: '2024-01-19T18:45:00Z',
    pnl: -15.30,
  },
];

const mockStats: PortfolioStats = {
  totalValue: 25420.50,
  totalPnl: 2015.35,
  totalPnlPercent: 8.6,
  activeBots: 2,
  totalTrades: 227,
  winRate: 68.5,
};

export const useTradingStore = create<TradingState>((set) => ({
  mode: 'paper',
  setMode: (mode) => set({ mode }),
  bots: mockBots,
  trades: mockTrades,
  stats: mockStats,
  toggleBot: (botId) =>
    set((state) => ({
      bots: state.bots.map((bot) =>
        bot.id === botId
          ? { ...bot, status: bot.status === 'running' ? 'stopped' : 'running' }
          : bot
      ),
      stats: {
        ...state.stats,
        activeBots: state.bots.filter((b) =>
          b.id === botId
            ? b.status !== 'running'
            : b.status === 'running'
        ).length,
      },
    })),
  addBot: (bot) =>
    set((state) => ({
      bots: [...state.bots, bot],
    })),
  removeBot: (botId) =>
    set((state) => ({
      bots: state.bots.filter((b) => b.id !== botId),
    })),
}));
