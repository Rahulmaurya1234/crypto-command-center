import { Trade } from "@/types/trading";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { format } from "date-fns";

interface TradeHistoryTableProps {
  trades: Trade[];
  limit?: number;
}

export function TradeHistoryTable({ trades, limit }: TradeHistoryTableProps) {
  const displayTrades = limit ? trades.slice(0, limit) : trades;

  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="text-muted-foreground">Time</TableHead>
            <TableHead className="text-muted-foreground">Bot</TableHead>
            <TableHead className="text-muted-foreground">Pair</TableHead>
            <TableHead className="text-muted-foreground">Side</TableHead>
            <TableHead className="text-muted-foreground text-right">Price</TableHead>
            <TableHead className="text-muted-foreground text-right">Amount</TableHead>
            <TableHead className="text-muted-foreground text-right">Total</TableHead>
            <TableHead className="text-muted-foreground text-right">P&L</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayTrades.map((trade) => {
            const isBuy = trade.side === "buy";
            const hasPnl = trade.pnl !== undefined;
            const isProfitable = hasPnl && trade.pnl! >= 0;

            return (
              <TableRow key={trade.id} className="border-border">
                <TableCell className="font-mono text-sm text-muted-foreground">
                  {format(new Date(trade.timestamp), "MMM dd, HH:mm")}
                </TableCell>
                <TableCell className="font-medium">{trade.botName}</TableCell>
                <TableCell className="font-mono">{trade.pair}</TableCell>
                <TableCell>
                  <div
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
                      isBuy
                        ? "bg-success/20 text-success"
                        : "bg-destructive/20 text-destructive"
                    )}
                  >
                    {isBuy ? (
                      <ArrowDownRight className="h-3 w-3" />
                    ) : (
                      <ArrowUpRight className="h-3 w-3" />
                    )}
                    {trade.side.toUpperCase()}
                  </div>
                </TableCell>
                <TableCell className="text-right font-mono">
                  ${trade.price.toLocaleString()}
                </TableCell>
                <TableCell className="text-right font-mono">
                  {trade.amount}
                </TableCell>
                <TableCell className="text-right font-mono">
                  ${trade.total.toLocaleString()}
                </TableCell>
                <TableCell className="text-right font-mono">
                  {hasPnl ? (
                    <span className={isProfitable ? "profit" : "loss"}>
                      {isProfitable ? "+" : ""}${trade.pnl!.toFixed(2)}
                    </span>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
