"use client";

import { useGetOrdersByUserIdQuery } from "@/lib/queries/order";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Order, OrderItem } from "@/types/order";

function formatCurrency(value?: number) {
  try {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value ?? 0);
  } catch {
    return `${value}`;
  }
}

function formatDate(iso?: string) {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    return d.toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
  } catch {
    return iso;
  }
}

export default function OrderPage() {
  const { data: session } = useSession();
  const token = session?.user?.accessToken || "";

  const { data: orders, isLoading } = useGetOrdersByUserIdQuery(token);

  const isAuthenticated = !!session;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold tracking-tight">Meus Pedidos</h1>
      <p className="text-sm text-muted-foreground">Acompanhe seus pedidos e status.</p>

      <Separator className="my-4" />

      {!isAuthenticated && (
        <Card>
          <CardContent className="py-6">
            <p className="text-sm text-muted-foreground">
              Faça login para visualizar seus pedidos.
            </p>
          </CardContent>
        </Card>
      )}

      {isAuthenticated && (
        <div className="space-y-4">
          {isLoading ? (
            <Card>
              <CardContent className="py-6">
                <p className="text-sm text-muted-foreground">Carregando pedidos...</p>
              </CardContent>
            </Card>
          ) : !orders || orders.length === 0 ? (
            <Card>
              <CardContent className="py-6">
                <p className="text-sm text-muted-foreground">Você ainda não possui pedidos.</p>
              </CardContent>
            </Card>
          ) : (
            orders.map((order: Order) => (
              <Card key={order.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <CardTitle className="text-base font-medium">
                    Pedido #{order.id?.slice(0, 8)} - <Badge>{order.organizationName}</Badge>
                  </CardTitle>
                  <Badge variant={order.status === "PENDING" ? "secondary" : "default"}>
                    {order.status}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Criado em</span>
                      <div>{formatDate(order.createdAt)}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Atualizado em</span>
                      <div>{formatDate(order.updatedAt)}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Total</span>
                      <div className="font-medium">{formatCurrency(order.totalPrice)}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Itens</span>
                      <div>{order.items?.length ?? 0}</div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    {order.items?.map((item: OrderItem) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between text-sm border rounded-md p-2"
                      >
                        <div className="truncate max-w-[60%]">
                          <span className="text-muted-foreground">Produto</span>: {item.name}
                        </div>
                        <div className="flex items-center gap-3">
                          <div>
                            <span className="text-muted-foreground">Qtd.</span>: {item.quantity}
                          </div>
                          <div className="font-medium">
                            {formatCurrency(item.priceAtPurchase)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
}