import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Settings as SettingsIcon, Bell, Shield, Key, Globe } from "lucide-react";

const Settings = () => {
  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-8 animate-slide-in">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your account and preferences
          </p>
        </div>

        {/* Notifications */}
        <div className="glass-card rounded-xl p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
              <Bell className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Notifications</h2>
              <p className="text-sm text-muted-foreground">
                Configure how you receive alerts
              </p>
            </div>
          </div>
          <Separator className="bg-border" />
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Trade Execution Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified when trades are executed
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Bot Status Changes</Label>
                <p className="text-sm text-muted-foreground">
                  Alerts when bots start, stop, or error
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Price Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Notifications for significant price movements
                </p>
              </div>
              <Switch />
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="glass-card rounded-xl p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Security</h2>
              <p className="text-sm text-muted-foreground">
                Protect your account
              </p>
            </div>
          </div>
          <Separator className="bg-border" />
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security
                </p>
              </div>
              <Button variant="outline" size="sm">
                Enable
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Session Timeout</Label>
                <p className="text-sm text-muted-foreground">
                  Auto-logout after inactivity
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>

        {/* API Configuration */}
        <div className="glass-card rounded-xl p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
              <Key className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">API Configuration</h2>
              <p className="text-sm text-muted-foreground">
                Connect your trading executor
              </p>
            </div>
          </div>
          <Separator className="bg-border" />
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="apiKey">API Key</Label>
              <Input
                id="apiKey"
                type="password"
                placeholder="Enter your API key"
                className="bg-secondary border-border font-mono"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="apiSecret">API Secret</Label>
              <Input
                id="apiSecret"
                type="password"
                placeholder="Enter your API secret"
                className="bg-secondary border-border font-mono"
              />
            </div>
            <Button variant="glow">Save API Credentials</Button>
          </div>
        </div>

        {/* Preferences */}
        <div className="glass-card rounded-xl p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
              <Globe className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Preferences</h2>
              <p className="text-sm text-muted-foreground">
                Customize your experience
              </p>
            </div>
          </div>
          <Separator className="bg-border" />
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Base Currency</Label>
                <p className="text-sm text-muted-foreground">
                  Display currency for values
                </p>
              </div>
              <span className="font-mono text-sm bg-secondary px-3 py-1.5 rounded-md">
                USD
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Timezone</Label>
                <p className="text-sm text-muted-foreground">
                  For trade timestamps
                </p>
              </div>
              <span className="font-mono text-sm bg-secondary px-3 py-1.5 rounded-md">
                EST
              </span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
