import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  className?: string;
}

export function StatsCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  trendValue,
  className,
}: StatsCardProps) {
  return (
    <div
      className={cn(
        "glass-card glow-border rounded-xl p-5 transition-all duration-300 hover:shadow-lg",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="stat-label">{title}</p>
          <p className="stat-value">{value}</p>
          {(subtitle || trendValue) && (
            <div className="flex items-center gap-2 pt-1">
              {trendValue && (
                <span
                  className={cn(
                    "text-sm font-medium font-mono",
                    trend === "up" && "profit",
                    trend === "down" && "loss",
                    trend === "neutral" && "text-muted-foreground"
                  )}
                >
                  {trend === "up" && "+"}
                  {trendValue}
                </span>
              )}
              {subtitle && (
                <span className="text-xs text-muted-foreground">{subtitle}</span>
              )}
            </div>
          )}
        </div>
        {icon && (
          <div className="rounded-lg bg-secondary p-2.5 text-primary">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
