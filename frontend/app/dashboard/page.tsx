import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <p>Você precisa estar logado para acessar o dashboard.</p>
  }

  const { name, email, role, phone, organizationId } = session.user;

  const isAdmin = role === "ADMIN";

  if (!isAdmin) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-semibold">Acesso restrito</h1>
        <p className="text-sm text-muted-foreground">
          O dashboard é exclusivo para administradores.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard Admin</h1>
        <p className="text-sm text-muted-foreground">Bem-vindo, {name}!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Gerenciar Produtos</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            CRUD de produtos, categorias e estoque.
            <div className="mt-3">
              <Link href="/dashboard/products" className="underline">
                Ir para Produtos
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pedidos</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Consultar pedidos, status e detalhes.
            <div className="mt-3">
              <Link href="/dashboard/orders" className="underline">
                Ir para Pedidos
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Métricas</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Visão de vendas, receita e produtos mais vendidos.
            <div className="mt-3">
              <Link href="/dashboard/metrics" className="underline">
                Ir para Métricas
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Seu Perfil</CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <ul className="space-y-1">
              <li>
                <span className="text-muted-foreground">Email:</span> {email}
              </li>
              <li>
                <span className="text-muted-foreground">Telefone:</span> {phone}
              </li>
              <li>
                <span className="text-muted-foreground">Organization ID:</span> {organizationId}
              </li>
              <li>
                <span className="text-muted-foreground">Role:</span> {role}
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Atalhos</CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <div className="flex flex-wrap gap-3">
              <Link href="/dashboard/products" className="px-3 py-1 rounded-md bg-accent text-accent-foreground">
                Produtos
              </Link>
              <Link href="/dashboard/orders" className="px-3 py-1 rounded-md bg-accent text-accent-foreground">
                Pedidos
              </Link>
              <Link href="/dashboard/metrics" className="px-3 py-1 rounded-md bg-accent text-accent-foreground">
                Métricas
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
