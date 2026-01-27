import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TradingMode, BotConfig, Trade, Signal, Alert, DashboardStats, RSIConfig } from '@/types/trading';

interface TradingState {
  botConfig: BotConfig;
  trades: Trade[];
  signals: Signal[];
  alerts: Alert[];
  stats: DashboardStats;
  
  // Bot control actions
  startBot: () => void;
  stopBot: () => void;
  emergencyStop: () => void;
  
  // Configuration actions
  setMode: (mode: TradingMode) => void;
  updateRSIConfig: (config: Partial<RSIConfig>) => void;
  
  // Alert actions
  addAlert: (alert: Omit<Alert, 'id' | 'timestamp'>) => void;
  clearAlerts: () => void;
}

const defaultRSIConfig: RSIConfig = {
  period: 14,
  buyThreshold: 30,
  sellThreshold: 70,
  timeframe: '15m',
  capitalPercentage: 10,
  stopLossPercent: 5,
  takeProfitPercent: 10,
  maxTradesPerDay: 3,
};

const defaultBotConfig: BotConfig = {
  status: 'stopped',
  mode: 'paper',
  pair: 'BTC/USD',
  strategy: 'RSI',
  rsiConfig: defaultRSIConfig,
  lastUpdated: new Date().toISOString(),
};

// Mock trade history
const mockTrades: Trade[] = [
  {
    id: 't1',
    pair: 'BTC/USD',
    side: 'buy',
    price: 42150.00,
    amount: 0.025,
    total: 1053.75,
    fee: 1.05,
    timestamp: '2024-01-20T14:30:00Z',
    pnl: 45.20,
    status: 'closed',
  },
  {
    id: 't2',
    pair: 'BTC/USD',
    side: 'sell',
    price: 42350.00,
    amount: 0.025,
    total: 1058.75,
    fee: 1.06,
    timestamp: '2024-01-20T13:15:00Z',
    pnl: 52.50,
    status: 'closed',
  },
  {
    id: 't3',
    pair: 'BTC/USD',
    side: 'buy',
    price: 41980.00,
    amount: 0.03,
    total: 1259.40,
    fee: 1.26,
    timestamp: '2024-01-19T10:00:00Z',
    pnl: -15.30,
    status: 'closed',
  },
];

const mockAlerts: Alert[] = [
  {
    id: 'a1',
    type: 'info',
    message: 'Bot configuration saved successfully',
    timestamp: '2024-01-20T14:00:00Z',
  },
  {
    id: 'a2',
    type: 'success',
    message: 'Buy signal executed at $42,150',
    timestamp: '2024-01-20T14:30:00Z',
  },
];

const mockStats: DashboardStats = {
  currentPrice: 42350.00,
  rsiValue: 45.2,
  openTrade: null,
  todayTradesCount: 2,
  totalPnl: 82.40,
};

export const useTradingStore = create<TradingState>()(
  persist(
    (set, get) => ({
      botConfig: defaultBotConfig,
      trades: mockTrades,
      signals: [],
      alerts: mockAlerts,
      stats: mockStats,

      startBot: () => {
        const { botConfig, addAlert } = get();
        set({
          botConfig: {
            ...botConfig,
            status: 'running',
            lastUpdated: new Date().toISOString(),
          },
        });
        addAlert({
          type: 'success',
          message: `Bot started in ${botConfig.mode === 'paper' ? 'Paper' : 'Live'} trading mode`,
        });
      },

      stopBot: () => {
        const { botConfig, addAlert } = get();
        set({
          botConfig: {
            ...botConfig,
            status: 'stopped',
            lastUpdated: new Date().toISOString(),
          },
        });
        addAlert({
          type: 'info',
          message: 'Bot stopped gracefully',
        });
      },

      emergencyStop: () => {
        const { botConfig, addAlert } = get();
        set({
          botConfig: {
            ...botConfig,
            status: 'stopped',
            mode: 'paper', // Switch to paper mode on emergency
            lastUpdated: new Date().toISOString(),
          },
        });
        addAlert({
          type: 'warning',
          message: 'Emergency stop activated! Bot stopped and switched to Paper mode.',
        });
      },

      setMode: (mode) => {
        const { botConfig, addAlert } = get();
        if (botConfig.status === 'running') {
          addAlert({
            type: 'warning',
            message: 'Cannot change trading mode while bot is running. Stop the bot first.',
          });
          return;
        }
        set({
          botConfig: {
            ...botConfig,
            mode,
            lastUpdated: new Date().toISOString(),
          },
        });
        addAlert({
          type: 'info',
          message: `Trading mode changed to ${mode === 'paper' ? 'Paper' : 'Live'}`,
        });
      },

      updateRSIConfig: (config) => {
        const { botConfig, addAlert } = get();
        if (botConfig.status === 'running') {
          addAlert({
            type: 'warning',
            message: 'Cannot update configuration while bot is running. Stop the bot first.',
          });
          return;
        }
        set({
          botConfig: {
            ...botConfig,
            rsiConfig: { ...botConfig.rsiConfig, ...config },
            lastUpdated: new Date().toISOString(),
          },
        });
        addAlert({
          type: 'success',
          message: 'Bot configuration updated successfully',
        });
      },

      addAlert: (alert) =>
        set((state) => ({
          alerts: [
            {
              ...alert,
              id: Date.now().toString(),
              timestamp: new Date().toISOString(),
            },
            ...state.alerts.slice(0, 49), // Keep last 50 alerts
          ],
        })),

      clearAlerts: () => set({ alerts: [] }),
    }),
    {
      name: 'trading-store',
      partialize: (state) => ({
        botConfig: state.botConfig,
      }),
    }
  )
);
