import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { BotStatusCard } from "@/components/trading/BotStatusCard";
import { SimpleTradeHistory } from "@/components/trading/SimpleTradeHistory";
import { AlertsList } from "@/components/trading/AlertsList";
import { Disclaimer } from "@/components/trading/Disclaimer";
import { useTradingStore } from "@/stores/tradingStore";
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";

const Index = () => {
  const { stats } = useTradingStore();

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-slide-in">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Monitor and control your BTC/USD trading bot
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="glass-card rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Current Price</p>
                <p className="text-xl font-bold font-mono">${stats.currentPrice.toLocaleString()}</p>
              </div>
            </div>
          </div>
          
          <div className="glass-card rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${stats.totalPnl >= 0 ? 'bg-success/20' : 'bg-destructive/20'}`}>
                {stats.totalPnl >= 0 ? (
                  <TrendingUp className="h-5 w-5 text-success" />
                ) : (
                  <TrendingDown className="h-5 w-5 text-destructive" />
                )}
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total P&L</p>
                <p className={`text-xl font-bold font-mono ${stats.totalPnl >= 0 ? 'text-success' : 'text-destructive'}`}>
                  {stats.totalPnl >= 0 ? '+' : ''}${stats.totalPnl.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
          
          <div className="glass-card rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                <span className="text-lg font-bold">{stats.todayTradesCount}</span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Today's Trades</p>
                <p className="text-sm text-muted-foreground">out of max allowed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Bot Status & Controls */}
          <BotStatusCard />
          
          {/* Alerts */}
          <AlertsList />
        </div>

        {/* Trade History */}
        <SimpleTradeHistory limit={5} />

        {/* Disclaimer */}
        <Disclaimer />
      </div>
    </DashboardLayout>
  );
};

export default Index;
