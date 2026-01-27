import { useTradingStore } from "@/stores/tradingStore";
import { Alert } from "@/types/trading";
import { cn } from "@/lib/utils";
import { Bell, CheckCircle, AlertTriangle, XCircle, Info, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

const alertIcons = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: XCircle,
};

const alertStyles = {
  info: "border-l-primary text-primary",
  success: "border-l-success text-success",
  warning: "border-l-warning text-warning",
  error: "border-l-destructive text-destructive",
};

interface AlertItemProps {
  alert: Alert;
}

function AlertItem({ alert }: AlertItemProps) {
  const Icon = alertIcons[alert.type];
  
  return (
    <div className={cn(
      "flex items-start gap-3 border-l-2 bg-secondary/30 p-3 rounded-r-lg",
      alertStyles[alert.type]
    )}>
      <Icon className="h-4 w-4 shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <p className="text-sm text-foreground">{alert.message}</p>
        <p className="text-xs text-muted-foreground mt-1">
          {format(new Date(alert.timestamp), "MMM d, h:mm a")}
        </p>
      </div>
    </div>
  );
}

export function AlertsList() {
  const { alerts, clearAlerts } = useTradingStore();
  
  return (
    <div className="glass-card rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Alerts & Messages</h2>
        </div>
        {alerts.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAlerts}
            className="text-muted-foreground hover:text-foreground"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Clear
          </Button>
        )}
      </div>
      
      {alerts.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-8">
          No alerts yet
        </p>
      ) : (
        <div className="space-y-2 max-h-[300px] overflow-y-auto">
          {alerts.slice(0, 10).map((alert) => (
            <AlertItem key={alert.id} alert={alert} />
          ))}
        </div>
      )}
    </div>
  );
}
