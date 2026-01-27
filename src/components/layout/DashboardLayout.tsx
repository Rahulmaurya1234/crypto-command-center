import { ReactNode } from "react";
import { AppSidebar } from "./AppSidebar";
import { useTradingStore } from "@/stores/tradingStore";
import { cn } from "@/lib/utils";
import { FlaskConical, Rocket } from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { mode } = useTradingStore();

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <main className="ml-64 min-h-screen transition-all duration-300">
        {/* Top Status Bar */}
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background/80 backdrop-blur-lg px-6">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium border",
                mode === "paper"
                  ? "trading-mode-paper"
                  : "trading-mode-live"
              )}
            >
              {mode === "paper" ? (
                <>
                  <FlaskConical className="h-3 w-3" />
                  Paper Trading
                </>
              ) : (
                <>
                  <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                  <Rocket className="h-3 w-3" />
                  Live Trading
                </>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">
              <span className="font-mono">BTC: </span>
              <span className="font-mono text-foreground">$42,350.00</span>
            </div>
            <div className="text-sm text-muted-foreground">
              <span className="font-mono">ETH: </span>
              <span className="font-mono text-foreground">$2,485.00</span>
            </div>
          </div>
        </header>
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
