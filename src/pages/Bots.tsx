import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { BotCard } from "@/components/trading/BotCard";
import { useTradingStore } from "@/stores/tradingStore";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Bot, PlusCircle } from "lucide-react";

const Bots = () => {
  const { bots } = useTradingStore();
  const runningBots = bots.filter((b) => b.status === "running");
  const stoppedBots = bots.filter((b) => b.status !== "running");

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-slide-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">My Bots</h1>
            <p className="text-muted-foreground mt-1">
              Manage and monitor your trading bots
            </p>
          </div>
          <Link to="/create">
            <Button variant="glow">
              <PlusCircle className="h-4 w-4" />
              Create New Bot
            </Button>
          </Link>
        </div>

        {bots.length === 0 ? (
          <div className="glass-card rounded-xl p-12 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
              <Bot className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">No bots yet</h3>
            <p className="mt-2 text-muted-foreground">
              Create your first trading bot to start automating your trades.
            </p>
            <Link to="/create">
              <Button variant="glow" className="mt-6">
                <PlusCircle className="h-4 w-4" />
                Create Bot
              </Button>
            </Link>
          </div>
        ) : (
          <>
            {runningBots.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                  Running ({runningBots.length})
                </h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {runningBots.map((bot) => (
                    <BotCard key={bot.id} bot={bot} />
                  ))}
                </div>
              </div>
            )}

            {stoppedBots.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold mb-4 text-muted-foreground">
                  Stopped ({stoppedBots.length})
                </h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {stoppedBots.map((bot) => (
                    <BotCard key={bot.id} bot={bot} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Bots;
