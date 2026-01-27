import { AlertTriangle } from "lucide-react";

export function Disclaimer() {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-warning/30 bg-warning/5 p-4 text-sm">
      <AlertTriangle className="h-5 w-5 shrink-0 text-warning mt-0.5" />
      <p className="text-muted-foreground">
        <span className="font-medium text-foreground">Disclaimer: </span>
        This platform provides trading automation tools only and does not offer financial advice. 
        Trading cryptocurrencies involves significant risk and may result in loss of capital. 
        Past performance is not indicative of future results.
      </p>
    </div>
  );
}
