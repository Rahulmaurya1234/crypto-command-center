import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { TradeHistoryTable } from "@/components/trading/TradeHistoryTable";
import { useTradingStore } from "@/stores/tradingStore";
import { History, Download, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

const TradeHistory = () => {
  const { trades } = useTradingStore();

  const totalVolume = trades.reduce((sum, t) => sum + t.total, 0);
  const totalPnl = trades.reduce((sum, t) => sum + (t.pnl || 0), 0);

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-slide-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Trade History</h1>
            <p className="text-muted-foreground mt-1">
              View all your executed trades
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="glass-card rounded-xl p-5">
            <p className="stat-label">Total Trades</p>
            <p className="stat-value">{trades.length}</p>
          </div>
          <div className="glass-card rounded-xl p-5">
            <p className="stat-label">Total Volume</p>
            <p className="stat-value">${totalVolume.toLocaleString()}</p>
          </div>
          <div className="glass-card rounded-xl p-5">
            <p className="stat-label">Total P&L</p>
            <p className={`stat-value ${totalPnl >= 0 ? "profit" : "loss"}`}>
              {totalPnl >= 0 ? "+" : ""}${totalPnl.toFixed(2)}
            </p>
          </div>
        </div>

        {trades.length === 0 ? (
          <div className="glass-card rounded-xl p-12 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
              <History className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">No trades yet</h3>
            <p className="mt-2 text-muted-foreground">
              Your trade history will appear here once your bots start trading.
            </p>
          </div>
        ) : (
          <TradeHistoryTable trades={trades} />
        )}
      </div>
    </DashboardLayout>
  );
};

export default TradeHistory;
