import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useTradingStore } from "@/stores/tradingStore";
import { StatsCard } from "@/components/dashboard/StatsCard";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { TrendingUp, Target, Clock, BarChart3 } from "lucide-react";

// Mock performance data
const performanceData = [
  { date: "Jan 1", value: 10000, pnl: 0 },
  { date: "Jan 5", value: 10250, pnl: 250 },
  { date: "Jan 10", value: 10180, pnl: 180 },
  { date: "Jan 15", value: 10650, pnl: 650 },
  { date: "Jan 20", value: 11200, pnl: 1200 },
  { date: "Jan 25", value: 11850, pnl: 1850 },
  { date: "Jan 30", value: 12420, pnl: 2420 },
];

const Analytics = () => {
  const { stats } = useTradingStore();

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-slide-in">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Track your trading performance and insights
          </p>
        </div>

        {/* Performance Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Return"
            value={`${stats.totalPnlPercent}%`}
            icon={<TrendingUp className="h-5 w-5" />}
            trend="up"
            trendValue={`$${stats.totalPnl.toLocaleString()}`}
          />
          <StatsCard
            title="Win Rate"
            value={`${stats.winRate}%`}
            icon={<Target className="h-5 w-5" />}
            subtitle={`${stats.totalTrades} total trades`}
          />
          <StatsCard
            title="Avg Trade Duration"
            value="4.2h"
            icon={<Clock className="h-5 w-5" />}
            subtitle="average hold time"
          />
          <StatsCard
            title="Best Bot"
            value="BTC Grid"
            icon={<BarChart3 className="h-5 w-5" />}
            trend="up"
            trendValue="12.5%"
          />
        </div>

        {/* Portfolio Value Chart */}
        <div className="glass-card rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-6">Portfolio Performance</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(187, 100%, 50%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(187, 100%, 50%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 18%)" />
                <XAxis
                  dataKey="date"
                  stroke="hsl(215, 20%, 55%)"
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis
                  stroke="hsl(215, 20%, 55%)"
                  fontSize={12}
                  tickLine={false}
                  tickFormatter={(value) => `$${value.toLocaleString()}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(222, 47%, 10%)",
                    border: "1px solid hsl(222, 30%, 18%)",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "hsl(210, 40%, 98%)" }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(187, 100%, 50%)"
                  strokeWidth={2}
                  fill="url(#colorValue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* P&L Chart */}
        <div className="glass-card rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-6">Cumulative P&L</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 18%)" />
                <XAxis
                  dataKey="date"
                  stroke="hsl(215, 20%, 55%)"
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis
                  stroke="hsl(215, 20%, 55%)"
                  fontSize={12}
                  tickLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(222, 47%, 10%)",
                    border: "1px solid hsl(222, 30%, 18%)",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "hsl(210, 40%, 98%)" }}
                />
                <Line
                  type="monotone"
                  dataKey="pnl"
                  stroke="hsl(142, 76%, 45%)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
