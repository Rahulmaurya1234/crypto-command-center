import { useTradingStore } from "@/stores/tradingStore";
import { FlaskConical, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

export function TradingModeToggle() {
  const { botConfig, setMode } = useTradingStore();
  const mode = botConfig.mode;
  const isRunning = botConfig.status === 'running';

  return (
    <div className="space-y-2">
      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        Trading Mode
      </label>
      <div className="flex gap-1 p-1 bg-secondary rounded-lg">
        <button
          onClick={() => setMode("paper")}
          disabled={isRunning}
          className={cn(
            "flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
            mode === "paper"
              ? "bg-primary/20 text-primary shadow-sm"
              : "text-muted-foreground hover:text-foreground",
            isRunning && "opacity-50 cursor-not-allowed"
          )}
        >
          <FlaskConical className="h-3.5 w-3.5" />
          Paper
        </button>
        <button
          onClick={() => setMode("live")}
          disabled={isRunning}
          className={cn(
            "flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
            mode === "live"
              ? "bg-warning/20 text-warning shadow-sm"
              : "text-muted-foreground hover:text-foreground",
            isRunning && "opacity-50 cursor-not-allowed"
          )}
        >
          <Rocket className="h-3.5 w-3.5" />
          Live
        </button>
      </div>
    </div>
  );
}
