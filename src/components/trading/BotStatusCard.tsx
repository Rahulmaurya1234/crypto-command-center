import { useTradingStore } from "@/stores/tradingStore";
import { cn } from "@/lib/utils";
import { Bot, Play, Square, AlertOctagon, FlaskConical, Rocket, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function BotStatusCard() {
  const { botConfig, stats, startBot, stopBot, emergencyStop } = useTradingStore();
  const isRunning = botConfig.status === 'running';
  const isPaperMode = botConfig.mode === 'paper';

  return (
    <div className="glass-card rounded-xl p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={cn(
            "flex h-12 w-12 items-center justify-center rounded-xl",
            isRunning ? "bg-success/20" : "bg-secondary"
          )}>
            <Bot className={cn(
              "h-6 w-6",
              isRunning ? "text-success" : "text-muted-foreground"
            )} />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Trading Bot</h2>
            <p className="text-sm text-muted-foreground">{botConfig.pair} • RSI Strategy</p>
          </div>
        </div>
        <Link to="/configure">
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4" />
            Configure
          </Button>
        </Link>
      </div>

      {/* Status Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg bg-secondary/50 p-4">
          <p className="text-xs text-muted-foreground mb-1">Bot Status</p>
          <div className="flex items-center gap-2">
            <div className={cn(
              "h-2.5 w-2.5 rounded-full",
              isRunning ? "bg-success animate-pulse" : "bg-muted-foreground"
            )} />
            <span className={cn(
              "font-semibold",
              isRunning ? "text-success" : "text-muted-foreground"
            )}>
              {isRunning ? "Running" : "Stopped"}
            </span>
          </div>
        </div>

        <div className="rounded-lg bg-secondary/50 p-4">
          <p className="text-xs text-muted-foreground mb-1">Trading Mode</p>
          <div className="flex items-center gap-2">
            {isPaperMode ? (
              <>
                <FlaskConical className="h-4 w-4 text-primary" />
                <span className="font-semibold text-primary">Paper</span>
              </>
            ) : (
              <>
                <Rocket className="h-4 w-4 text-warning" />
                <span className="font-semibold text-warning">Live</span>
              </>
            )}
          </div>
        </div>

        <div className="rounded-lg bg-secondary/50 p-4">
          <p className="text-xs text-muted-foreground mb-1">Current Price</p>
          <span className="font-mono font-semibold">
            ${stats.currentPrice.toLocaleString()}
          </span>
        </div>

        <div className="rounded-lg bg-secondary/50 p-4">
          <p className="text-xs text-muted-foreground mb-1">RSI Value</p>
          <span className={cn(
            "font-mono font-semibold",
            stats.rsiValue < 30 ? "text-success" : 
            stats.rsiValue > 70 ? "text-destructive" : "text-foreground"
          )}>
            {stats.rsiValue.toFixed(1)}
          </span>
        </div>

        <div className="rounded-lg bg-secondary/50 p-4">
          <p className="text-xs text-muted-foreground mb-1">Today's Trades</p>
          <span className="font-mono font-semibold">{stats.todayTradesCount}</span>
        </div>

        <div className="rounded-lg bg-secondary/50 p-4">
          <p className="text-xs text-muted-foreground mb-1">Open Trade</p>
          <span className={cn(
            "font-semibold",
            stats.openTrade ? "text-primary" : "text-muted-foreground"
          )}>
            {stats.openTrade ? `${stats.openTrade.side.toUpperCase()} @ $${stats.openTrade.price.toLocaleString()}` : "None"}
          </span>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex gap-3">
        {!isRunning ? (
          <Button 
            variant="glow" 
            className="flex-1"
            onClick={startBot}
          >
            <Play className="h-4 w-4" />
            Start Bot
          </Button>
        ) : (
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={stopBot}
          >
            <Square className="h-4 w-4" />
            Stop Bot
          </Button>
        )}
        <Button 
          variant="destructive" 
          onClick={emergencyStop}
          disabled={!isRunning}
        >
          <AlertOctagon className="h-4 w-4" />
          Emergency Stop
        </Button>
      </div>
    </div>
  );
}
