import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTradingStore } from "@/stores/tradingStore";
import { StrategyType, Bot } from "@/types/trading";
import { Bot as BotIcon, Grid3X3, DollarSign, TrendingUp, Zap, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const strategies = [
  {
    id: "grid" as StrategyType,
    name: "Grid Trading",
    description: "Places buy and sell orders at preset intervals within a price range",
    icon: Grid3X3,
  },
  {
    id: "dca" as StrategyType,
    name: "Dollar Cost Averaging",
    description: "Invests fixed amounts at regular intervals regardless of price",
    icon: DollarSign,
  },
  {
    id: "momentum" as StrategyType,
    name: "Momentum Trading",
    description: "Follows price trends and rides momentum for potential gains",
    icon: TrendingUp,
  },
  {
    id: "arbitrage" as StrategyType,
    name: "Arbitrage",
    description: "Exploits price differences across markets or exchanges",
    icon: Zap,
  },
];

const tradingPairs = [
  "BTC/USDT",
  "ETH/USDT",
  "SOL/USDT",
  "AVAX/USDT",
  "MATIC/USDT",
  "LINK/USDT",
  "DOT/USDT",
  "ADA/USDT",
];

const CreateBot = () => {
  const navigate = useNavigate();
  const { addBot } = useTradingStore();

  const [name, setName] = useState("");
  const [strategy, setStrategy] = useState<StrategyType>("grid");
  const [pair, setPair] = useState("BTC/USDT");
  const [investment, setInvestment] = useState("");
  const [stopLoss, setStopLoss] = useState("");
  const [takeProfit, setTakeProfit] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newBot: Bot = {
      id: Date.now().toString(),
      name,
      strategy,
      pair,
      status: "stopped",
      pnl: 0,
      pnlPercent: 0,
      tradesCount: 0,
      createdAt: new Date().toISOString(),
    };

    addBot(newBot);
    navigate("/bots");
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-8 animate-slide-in">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Create Bot</h1>
            <p className="text-muted-foreground mt-1">
              Configure a new trading bot
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Bot Name */}
          <div className="glass-card rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <BotIcon className="h-5 w-5 text-primary" />
              Bot Details
            </h2>
            <div className="space-y-2">
              <Label htmlFor="name">Bot Name</Label>
              <Input
                id="name"
                placeholder="e.g., BTC Grid Trader"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-secondary border-border"
              />
            </div>
          </div>

          {/* Strategy Selection */}
          <div className="glass-card rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-semibold">Trading Strategy</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {strategies.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setStrategy(s.id)}
                  className={cn(
                    "flex flex-col items-start gap-2 rounded-lg border p-4 text-left transition-all duration-200",
                    strategy === s.id
                      ? "border-primary bg-primary/10 shadow-glow"
                      : "border-border bg-secondary/50 hover:bg-secondary hover:border-border/80"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <s.icon
                      className={cn(
                        "h-5 w-5",
                        strategy === s.id ? "text-primary" : "text-muted-foreground"
                      )}
                    />
                    <span className="font-medium">{s.name}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{s.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Trading Pair & Investment */}
          <div className="glass-card rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-semibold">Trading Configuration</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="pair">Trading Pair</Label>
                <Select value={pair} onValueChange={setPair}>
                  <SelectTrigger className="bg-secondary border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    {tradingPairs.map((p) => (
                      <SelectItem key={p} value={p}>
                        {p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="investment">Investment (USDT)</Label>
                <Input
                  id="investment"
                  type="number"
                  placeholder="1000"
                  value={investment}
                  onChange={(e) => setInvestment(e.target.value)}
                  required
                  className="bg-secondary border-border font-mono"
                />
              </div>
            </div>
          </div>

          {/* Risk Management */}
          <div className="glass-card rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-semibold">Risk Management</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="stopLoss">Stop Loss (%)</Label>
                <Input
                  id="stopLoss"
                  type="number"
                  placeholder="5"
                  value={stopLoss}
                  onChange={(e) => setStopLoss(e.target.value)}
                  className="bg-secondary border-border font-mono"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="takeProfit">Take Profit (%)</Label>
                <Input
                  id="takeProfit"
                  type="number"
                  placeholder="15"
                  value={takeProfit}
                  onChange={(e) => setTakeProfit(e.target.value)}
                  className="bg-secondary border-border font-mono"
                />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Optional: Set automatic exit points for risk management
            </p>
          </div>

          {/* Submit */}
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" variant="glow" className="flex-1">
              <BotIcon className="h-4 w-4" />
              Create Bot
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default CreateBot;
