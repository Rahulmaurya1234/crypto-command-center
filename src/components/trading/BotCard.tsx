import { Bot } from "@/types/trading";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Play, Pause, Trash2, TrendingUp, TrendingDown, Activity } from "lucide-react";
import { useTradingStore } from "@/stores/tradingStore";

interface BotCardProps {
  bot: Bot;
}

const strategyLabels: Record<string, string> = {
  grid: "Grid Trading",
  dca: "DCA",
  momentum: "Momentum",
  arbitrage: "Arbitrage",
};

export function BotCard({ bot }: BotCardProps) {
  const { toggleBot, removeBot } = useTradingStore();
  const isRunning = bot.status === "running";
  const isProfitable = bot.pnl >= 0;

  return (
    <div className="glass-card glow-border rounded-xl p-5 transition-all duration-300 hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-lg",
              isRunning ? "bg-success/20" : "bg-muted"
            )}
          >
            <Activity
              className={cn(
                "h-5 w-5",
                isRunning ? "text-success" : "text-muted-foreground"
              )}
            />
          </div>
          <div>
            <h3 className="font-semibold">{bot.name}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="font-mono">{bot.pair}</span>
              <span>•</span>
              <span>{strategyLabels[bot.strategy]}</span>
            </div>
          </div>
        </div>
        <div
          className={cn(
            "flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
            isRunning
              ? "bg-success/20 text-success"
              : "bg-muted text-muted-foreground"
          )}
        >
          <div
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              isRunning ? "bg-success animate-pulse" : "bg-muted-foreground"
            )}
          />
          {isRunning ? "Running" : "Stopped"}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-4">
        <div>
          <p className="text-xs text-muted-foreground">P&L</p>
          <div className="flex items-center gap-1">
            {isProfitable ? (
              <TrendingUp className="h-4 w-4 text-success" />
            ) : (
              <TrendingDown className="h-4 w-4 text-destructive" />
            )}
            <span
              className={cn(
                "font-mono font-semibold",
                isProfitable ? "profit" : "loss"
              )}
            >
              {isProfitable ? "+" : ""}${Math.abs(bot.pnl).toFixed(2)}
            </span>
          </div>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Return</p>
          <span
            className={cn(
              "font-mono font-semibold",
              isProfitable ? "profit" : "loss"
            )}
          >
            {isProfitable ? "+" : ""}{bot.pnlPercent.toFixed(1)}%
          </span>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Trades</p>
          <span className="font-mono font-semibold">{bot.tradesCount}</span>
        </div>
      </div>

      <div className="mt-5 flex gap-2">
        <Button
          variant={isRunning ? "outline" : "success"}
          size="sm"
          className="flex-1"
          onClick={() => toggleBot(bot.id)}
        >
          {isRunning ? (
            <>
              <Pause className="h-4 w-4" />
              Pause
            </>
          ) : (
            <>
              <Play className="h-4 w-4" />
              Start
            </>
          )}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-destructive"
          onClick={() => removeBot(bot.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
