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
import { Timeframe } from "@/types/trading";
import { Settings, TrendingUp, Shield, Clock, ArrowLeft, Save, FlaskConical, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";
import { Disclaimer } from "@/components/trading/Disclaimer";

const ConfigureBot = () => {
  const navigate = useNavigate();
  const { botConfig, updateRSIConfig, setMode } = useTradingStore();
  const isRunning = botConfig.status === 'running';

  // Form state initialized from current config
  const [rsiPeriod, setRsiPeriod] = useState(botConfig.rsiConfig.period.toString());
  const [buyThreshold, setBuyThreshold] = useState(botConfig.rsiConfig.buyThreshold.toString());
  const [sellThreshold, setSellThreshold] = useState(botConfig.rsiConfig.sellThreshold.toString());
  const [timeframe, setTimeframe] = useState<Timeframe>(botConfig.rsiConfig.timeframe);
  const [capitalPercentage, setCapitalPercentage] = useState(botConfig.rsiConfig.capitalPercentage.toString());
  const [stopLoss, setStopLoss] = useState(botConfig.rsiConfig.stopLossPercent.toString());
  const [takeProfit, setTakeProfit] = useState(botConfig.rsiConfig.takeProfitPercent.toString());
  const [maxTrades, setMaxTrades] = useState(botConfig.rsiConfig.maxTradesPerDay.toString());
  const [mode, setLocalMode] = useState(botConfig.mode);

  // Validation
  const validateNumber = (value: string, min: number, max: number): boolean => {
    const num = parseFloat(value);
    return !isNaN(num) && num >= min && num <= max;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all inputs
    const errors: string[] = [];
    
    if (!validateNumber(rsiPeriod, 5, 50)) errors.push("RSI Period must be between 5 and 50");
    if (!validateNumber(buyThreshold, 10, 40)) errors.push("Buy threshold must be between 10 and 40");
    if (!validateNumber(sellThreshold, 60, 90)) errors.push("Sell threshold must be between 60 and 90");
    if (!validateNumber(capitalPercentage, 1, 20)) errors.push("Capital percentage must be between 1% and 20%");
    if (!validateNumber(stopLoss, 1, 20)) errors.push("Stop Loss must be between 1% and 20%");
    if (!validateNumber(takeProfit, 1, 50)) errors.push("Take Profit must be between 1% and 50%");
    if (!validateNumber(maxTrades, 1, 10)) errors.push("Max trades per day must be between 1 and 10");

    if (errors.length > 0) {
      alert(errors.join("\n"));
      return;
    }

    // Update config
    if (mode !== botConfig.mode) {
      setMode(mode);
    }
    
    updateRSIConfig({
      period: parseInt(rsiPeriod),
      buyThreshold: parseInt(buyThreshold),
      sellThreshold: parseInt(sellThreshold),
      timeframe,
      capitalPercentage: parseFloat(capitalPercentage),
      stopLossPercent: parseFloat(stopLoss),
      takeProfitPercent: parseFloat(takeProfit),
      maxTradesPerDay: parseInt(maxTrades),
    });

    navigate("/");
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-6 animate-slide-in">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Configure Bot</h1>
            <p className="text-muted-foreground mt-1">
              Adjust your RSI trading strategy settings
            </p>
          </div>
        </div>

        {isRunning && (
          <div className="rounded-lg border border-warning/50 bg-warning/10 p-4 text-warning text-sm">
            ⚠️ Bot is currently running. Stop the bot before making changes.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Trading Mode */}
          <div className="glass-card rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" />
              Trading Mode
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                disabled={isRunning}
                onClick={() => setLocalMode('paper')}
                className={cn(
                  "flex items-center justify-center gap-2 rounded-lg border p-4 transition-all",
                  mode === 'paper'
                    ? "border-primary bg-primary/10"
                    : "border-border bg-secondary/50 hover:bg-secondary",
                  isRunning && "opacity-50 cursor-not-allowed"
                )}
              >
                <FlaskConical className={cn("h-5 w-5", mode === 'paper' ? "text-primary" : "text-muted-foreground")} />
                <span className={cn("font-medium", mode === 'paper' ? "text-primary" : "text-muted-foreground")}>
                  Paper Trading
                </span>
              </button>
              <button
                type="button"
                disabled={isRunning}
                onClick={() => setLocalMode('live')}
                className={cn(
                  "flex items-center justify-center gap-2 rounded-lg border p-4 transition-all",
                  mode === 'live'
                    ? "border-warning bg-warning/10"
                    : "border-border bg-secondary/50 hover:bg-secondary",
                  isRunning && "opacity-50 cursor-not-allowed"
                )}
              >
                <Rocket className={cn("h-5 w-5", mode === 'live' ? "text-warning" : "text-muted-foreground")} />
                <span className={cn("font-medium", mode === 'live' ? "text-warning" : "text-muted-foreground")}>
                  Live Trading
                </span>
              </button>
            </div>
            {mode === 'live' && (
              <p className="text-sm text-warning">⚠️ Live trading uses real funds. Proceed with caution.</p>
            )}
          </div>

          {/* RSI Strategy Settings */}
          <div className="glass-card rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              RSI Strategy Settings
            </h2>
            <p className="text-sm text-muted-foreground">
              Trading Pair: <span className="font-mono font-medium text-foreground">BTC/USD</span> (fixed)
            </p>
            
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="rsiPeriod">RSI Period</Label>
                <Input
                  id="rsiPeriod"
                  type="number"
                  min={5}
                  max={50}
                  placeholder="14"
                  value={rsiPeriod}
                  onChange={(e) => setRsiPeriod(e.target.value)}
                  disabled={isRunning}
                  className="bg-secondary border-border font-mono"
                />
                <p className="text-xs text-muted-foreground">Range: 5–50 (default: 14)</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeframe">Timeframe</Label>
                <Select value={timeframe} onValueChange={(v) => setTimeframe(v as Timeframe)} disabled={isRunning}>
                  <SelectTrigger className="bg-secondary border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="5m">5 minutes</SelectItem>
                    <SelectItem value="15m">15 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="buyThreshold">Buy when RSI &lt;</Label>
                <Input
                  id="buyThreshold"
                  type="number"
                  min={10}
                  max={40}
                  placeholder="30"
                  value={buyThreshold}
                  onChange={(e) => setBuyThreshold(e.target.value)}
                  disabled={isRunning}
                  className="bg-secondary border-border font-mono"
                />
                <p className="text-xs text-muted-foreground">Range: 10–40 (oversold signal)</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sellThreshold">Sell when RSI &gt;</Label>
                <Input
                  id="sellThreshold"
                  type="number"
                  min={60}
                  max={90}
                  placeholder="70"
                  value={sellThreshold}
                  onChange={(e) => setSellThreshold(e.target.value)}
                  disabled={isRunning}
                  className="bg-secondary border-border font-mono"
                />
                <p className="text-xs text-muted-foreground">Range: 60–90 (overbought signal)</p>
              </div>
            </div>
          </div>

          {/* Risk Management */}
          <div className="glass-card rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Risk Management
            </h2>
            
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="capitalPercentage">Capital per Trade (%)</Label>
                <Input
                  id="capitalPercentage"
                  type="number"
                  min={1}
                  max={20}
                  step={0.5}
                  placeholder="10"
                  value={capitalPercentage}
                  onChange={(e) => setCapitalPercentage(e.target.value)}
                  disabled={isRunning}
                  className="bg-secondary border-border font-mono"
                />
                <p className="text-xs text-muted-foreground">Max: 20% per trade</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxTrades">Max Trades per Day</Label>
                <Input
                  id="maxTrades"
                  type="number"
                  min={1}
                  max={10}
                  placeholder="3"
                  value={maxTrades}
                  onChange={(e) => setMaxTrades(e.target.value)}
                  disabled={isRunning}
                  className="bg-secondary border-border font-mono"
                />
                <p className="text-xs text-muted-foreground">Range: 1–10</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="stopLoss">Stop Loss (%)</Label>
                <Input
                  id="stopLoss"
                  type="number"
                  min={1}
                  max={20}
                  step={0.5}
                  placeholder="5"
                  value={stopLoss}
                  onChange={(e) => setStopLoss(e.target.value)}
                  required
                  disabled={isRunning}
                  className="bg-secondary border-border font-mono"
                />
                <p className="text-xs text-muted-foreground">Required (1%–20%)</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="takeProfit">Take Profit (%)</Label>
                <Input
                  id="takeProfit"
                  type="number"
                  min={1}
                  max={50}
                  step={0.5}
                  placeholder="10"
                  value={takeProfit}
                  onChange={(e) => setTakeProfit(e.target.value)}
                  required
                  disabled={isRunning}
                  className="bg-secondary border-border font-mono"
                />
                <p className="text-xs text-muted-foreground">Required (1%–50%)</p>
              </div>
            </div>
          </div>

          {/* Limits Info */}
          <div className="glass-card rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Execution Info
            </h2>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>• Signals are sent to a third-party executor for automatic trades</p>
              <p>• This app is for configuration and monitoring only</p>
              <p>• No manual buy/sell execution from this interface</p>
            </div>
          </div>

          {/* Disclaimer */}
          <Disclaimer />

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
            <Button 
              type="submit" 
              variant="glow" 
              className="flex-1"
              disabled={isRunning}
            >
              <Save className="h-4 w-4" />
              Save Configuration
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default ConfigureBot;
