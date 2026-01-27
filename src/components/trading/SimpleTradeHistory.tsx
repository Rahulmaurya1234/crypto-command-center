import { useTradingStore } from "@/stores/tradingStore";
import { cn } from "@/lib/utils";
import { History, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface SimpleTradeHistoryProps {
  limit?: number;
}

export function SimpleTradeHistory({ limit = 10 }: SimpleTradeHistoryProps) {
  const { trades } = useTradingStore();
  const displayTrades = limit ? trades.slice(0, limit) : trades;

  return (
    <div className="glass-card rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <History className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">Trade History</h2>
      </div>

      {displayTrades.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-8">
          No trades yet
        </p>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">Time</TableHead>
                <TableHead className="text-muted-foreground">Side</TableHead>
                <TableHead className="text-muted-foreground text-right">Price</TableHead>
                <TableHead className="text-muted-foreground text-right">Amount</TableHead>
                <TableHead className="text-muted-foreground text-right">Total</TableHead>
                <TableHead className="text-muted-foreground text-right">P&L</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayTrades.map((trade) => (
                <TableRow key={trade.id} className="border-border">
                  <TableCell className="font-mono text-sm">
                    {format(new Date(trade.timestamp), "MMM d, h:mm a")}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {trade.side === "buy" ? (
                        <ArrowUpRight className="h-4 w-4 text-success" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-destructive" />
                      )}
                      <span
                        className={cn(
                          "font-medium uppercase text-sm",
                          trade.side === "buy" ? "text-success" : "text-destructive"
                        )}
                      >
                        {trade.side}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    ${trade.price.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {trade.amount.toFixed(6)}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    ${trade.total.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    {trade.pnl !== undefined ? (
                      <span
                        className={cn(
                          "font-mono font-medium",
                          trade.pnl >= 0 ? "text-success" : "text-destructive"
                        )}
                      >
                        {trade.pnl >= 0 ? "+" : ""}${trade.pnl.toFixed(2)}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
