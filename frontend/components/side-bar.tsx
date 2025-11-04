import Link from "next/link";
import { Package, ShoppingBag, BarChart3, LayoutDashboard, Settings } from "lucide-react";
import { Separator } from "./ui/separator";

export default function Sidebar() {
  const items = [
    { href: "/dashboard", label: "Visão Geral", icon: LayoutDashboard },
    { href: "/dashboard/products", label: "Produtos", icon: Package },
    { href: "/dashboard/orders", label: "Pedidos", icon: ShoppingBag },
  ];

  return (
    <aside className="w-64 border-r bg-card/50 backdrop-blur-sm shrink-0">
      <div className="px-4 py-6 h-full flex flex-col">
        <div className="mb-6">
          <h2 className="text-lg font-semibold">Admin Dashboard</h2>
          <p className="text-xs text-muted-foreground">
            Gerencie produtos e pedidos
          </p>
        </div>

        <nav className="space-y-1 flex-1 overflow-auto">
          {items.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <Icon className="h-4 w-4" />
              <span className="text-sm">{label}</span>
            </Link>
          ))}
          <Separator />

          <Link
            key={"/dashboard/logs"}
            href={"/dashboard/logs"}
            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <Settings className="h-4 w-4" />
            <span className="text-sm">Logs</span>
          </Link>
          <Link
            key={"/dashboard/logs-ai"}
            href={"/dashboard/logs-ai"}
            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <Settings className="h-4 w-4" />
            <span className="text-sm">Logs AI</span>
          </Link>
        </nav>
      </div>
    </aside>
  );
}