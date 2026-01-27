import { useTradingStore } from "@/stores/tradingStore";
import { cn } from "@/lib/utils";
import { FlaskConical, Rocket } from "lucide-react";

export function TradingModeToggle() {
  const { mode, setMode } = useTradingStore();

  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        Trading Mode
      </span>
      <div className="relative flex rounded-lg bg-secondary p-1">
        <button
          onClick={() => setMode("paper")}
          className={cn(
            "relative z-10 flex flex-1 items-center justify-center gap-2 rounded-md py-2 text-sm font-medium transition-all duration-200",
            mode === "paper"
              ? "text-warning"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <FlaskConical className="h-4 w-4" />
          Paper
        </button>
        <button
          onClick={() => setMode("live")}
          className={cn(
            "relative z-10 flex flex-1 items-center justify-center gap-2 rounded-md py-2 text-sm font-medium transition-all duration-200",
            mode === "live"
              ? "text-success"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Rocket className="h-4 w-4" />
          Live
        </button>
        <div
          className={cn(
            "absolute top-1 h-[calc(100%-8px)] w-[calc(50%-4px)] rounded-md transition-all duration-200",
            mode === "paper"
              ? "left-1 bg-warning/20 border border-warning/30"
              : "left-[calc(50%+2px)] bg-success/20 border border-success/30"
          )}
        />
      </div>
    </div>
  );
}
