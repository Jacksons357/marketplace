"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  ChevronDown,
  LogOut,
  LayoutDashboard,
  ShoppingCart,
  ListCheck,
  Building,
  UserPlus,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useSession, signOut } from "next-auth/react";
import { Skeleton } from "./ui/skeleton";
import { useCart } from "@/contexts/cart-context";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const user = session?.user;

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <nav className="bg-white border-b border-border fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary">Marketplace</span>
          </Link>

          {/* Links Desktop */}
          <div className="hidden md:block">
            <NavbarLinks user={user} status={status} />
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-primary hover:text-primary-foreground hover:bg-primary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && <NavbarMobileMenu user={user} />}
    </nav>
  );
}

/* ------------------- Subcomponents ------------------- */

function NavbarLinks({
  user,
  status,
}: {
  user?: any;
  status: "authenticated" | "unauthenticated" | "loading";
}) {
  const { items } = useCart();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  if (status === "loading") {
    // Skeleton enquanto carrega sessão
    return (
      <div className="ml-10 flex items-center space-x-4">
        <Skeleton className="h-8 w-24 rounded-md" />
        <Skeleton className="h-8 w-20 rounded-md" />
      </div>
    );
  }

  if (!user) {
    // Visitante
    return (
      <div className="ml-10 flex items-center space-x-4">
        <NavbarDropdown />
        <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Link href="/auth/login">Login</Link>
        </Button>
      </div>
    );
  }

  // Usuário autenticado
  return (
    <div className="ml-10 flex items-center space-x-4">
      {user.role === "ADMIN" ? (
        <Button variant="outline" asChild>
          <Link href="/dashboard/admin">Painel da ONG</Link>
        </Button>
      ) : (
        <>
          <Button variant="ghost" asChild>
            <Link href="/cart">
              <ShoppingCart className="w-4 h-4 mr-1" /> Carrinho
              {totalItems > 0 && (
                <span className=" bg-primary text-white text-xs font-bold rounded-full px-1.5">
                  {totalItems}
                </span>
              )}
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/orders">
              <ListCheck className="w-4 h-4 mr-1" /> Pedidos
            </Link>
          </Button>
        </>
      )}
      <UserMenu user={user} />
    </div>
  );
}

function NavbarDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="bg-transparent flex items-center gap-2">
          Criar Conta <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href="/auth/admin/register">
            <Building className="mr-2 h-4 w-4" />
            Criar Organização
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/auth/user/register">
            <UserPlus className="mr-2 h-4 w-4" />
            Criar Usuário
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function UserMenu({ user }: { user: any }) {
  if (!user) {
    // Mostra skeleton no dropdown enquanto carrega
    return (
      <Button
        variant="outline"
        disabled
        className="flex items-center gap-2 min-w-[120px] justify-between"
      >
        <Skeleton className="h-5 w-20" />
        <ChevronDown className="w-4 h-4 opacity-50" />
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          {user.name ?? "Conta"} <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {user.role === "ADMIN" && (
          <DropdownMenuItem asChild>
            <Link href="/dashboard/admin">
              <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
            </Link>
          </DropdownMenuItem>
        )}
        {user.role === "USER" && (
          <>
            <DropdownMenuItem asChild>
              <Link href="/cart">
                <ShoppingCart className="mr-2 h-4 w-4" /> Meu Carrinho
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/orders">
                <ListCheck className="mr-2 h-4 w-4" /> Meus Pedidos
              </Link>
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut className="mr-2 h-4 w-4" /> Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function NavbarMobileMenu({ user }: { user?: any }) {
  if (!user) {
    return (
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 md:hidden">
        <Link
          href="/auth/admin/register"
          className="block px-3 py-2 text-muted-foreground hover:text-primary"
        >
          <Building className="mr-2 h-4 w-4 inline" /> Criar Organização
        </Link>
        <Link
          href="/auth/user/register"
          className="block px-3 py-2 text-muted-foreground hover:text-primary"
        >
          <UserPlus className="mr-2 h-4 w-4 inline" /> Criar Usuário
        </Link>
        <Link
          href="/auth/login"
          className="block px-3 py-2 bg-primary text-primary-foreground rounded-md"
        >
          Login
        </Link>
      </div>
    );
  }

  return (
    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 md:hidden">
      {user.role === "ADMIN" && (
        <Link href="/dashboard/admin" className="block px-3 py-2 text-primary font-medium">
          Painel da ONG
        </Link>
      )}
      {user.role === "USER" && (
        <>
          <Link href="/cart" className="block px-3 py-2 text-muted-foreground hover:text-primary">
            Carrinho
          </Link>
          <Link href="/orders" className="block px-3 py-2 text-muted-foreground hover:text-primary">
            Pedidos
          </Link>
        </>
      )}
      <button
        onClick={() => signOut()}
        className="w-full text-left px-3 py-2 rounded-md bg-destructive text-destructive-foreground hover:bg-destructive/90"
      >
        Sair
      </button>
    </div>
  );
}
