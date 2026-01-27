import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { BotCard } from "@/components/trading/BotCard";
import { TradeHistoryTable } from "@/components/trading/TradeHistoryTable";
import { useTradingStore } from "@/stores/tradingStore";
import {
  Wallet,
  TrendingUp,
  Bot,
  BarChart3,
  Target,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  const { stats, bots, trades } = useTradingStore();

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-slide-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Monitor your trading bots and portfolio performance
            </p>
          </div>
          <Link to="/create">
            <Button variant="glow">
              <Bot className="h-4 w-4" />
              Create Bot
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Portfolio Value"
            value={`$${stats.totalValue.toLocaleString()}`}
            icon={<Wallet className="h-5 w-5" />}
            trend="up"
            trendValue={`${stats.totalPnlPercent}%`}
            subtitle="all time"
          />
          <StatsCard
            title="Total P&L"
            value={`$${stats.totalPnl.toLocaleString()}`}
            icon={<TrendingUp className="h-5 w-5" />}
            trend={stats.totalPnl >= 0 ? "up" : "down"}
            trendValue={`${stats.totalPnlPercent}%`}
          />
          <StatsCard
            title="Active Bots"
            value={stats.activeBots}
            icon={<Bot className="h-5 w-5" />}
            subtitle={`${bots.length} total`}
          />
          <StatsCard
            title="Win Rate"
            value={`${stats.winRate}%`}
            icon={<Target className="h-5 w-5" />}
            subtitle={`${stats.totalTrades} trades`}
          />
        </div>

        {/* Bots Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Active Bots</h2>
            <Link to="/bots">
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {bots.slice(0, 3).map((bot) => (
              <BotCard key={bot.id} bot={bot} />
            ))}
          </div>
        </div>

        {/* Recent Trades */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recent Trades</h2>
            <Link to="/history">
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
          <TradeHistoryTable trades={trades} limit={5} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
