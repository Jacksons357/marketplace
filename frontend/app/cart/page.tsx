"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cart-context";
import Image from "next/image";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";
import { useCreateOrder } from "@/lib/mutations/order";
import { useSession } from "next-auth/react";
import ClearCartDialog from "@/components/clear-cart-dialog";
import { Spinner } from "@/components/ui/spinner";

export default function CartPage() {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;
  const { items, clearCart } = useCart();
  const [open, setOpen] = useState(false);
  const { mutateAsync, isPending } = useCreateOrder();

  const total = items.reduce(
    (sum, item) => sum + item.priceAtPurchase * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <div className="p-6 max-w-4xl mx-auto text-center">
        <h1 className="text-2xl font-semibold mb-4">Seu carrinho está vazio 🛒</h1>
        <Button asChild>
          <Link href="/">Voltar à loja</Link>
        </Button>
      </div>
    );
  }

  async function handleConfirmOrder() {
    try {
      const organizationId = items[0].organizationId

      await mutateAsync({
        token,
        params: {
          organizationId,
          items: items.map((item) => ({
            productId: item.productId,
            organizationId: item.organizationId,
            quantity: item.quantity,
            priceAtPurchase: item.priceAtPurchase,
          })),
        },
      });

      toast.success("Pagamento realizado com sucesso 💳");
      clearCart();
      setOpen(false);
    } catch (err: any) {
      toast.error(err.message || "Erro ao finalizar pedido");
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-card rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-6">Meu Carrinho</h1>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.productId}
            className="flex items-center justify-between border rounded-lg p-4"
          >
            <div className="flex items-center space-x-4">
              <Image
                src={item.imageUrl || ""}
                alt={item.name}
                width={64}
                height={64}
                className="rounded-md object-cover"
              />
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-muted-foreground">
                  {item.quantity} × R${item.priceAtPurchase.toFixed(2)}
                </p>
              </div>
            </div>
            <p className="font-semibold">
              R${(item.priceAtPurchase * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between items-center border-t pt-4">
        <p className="text-lg font-semibold">Total: R${total.toFixed(2)}</p>
        <div className="flex space-x-2">
          <ClearCartDialog />

          <Dialog open={open} onOpenChange={setOpen}>
            <Button onClick={() => setOpen(true)}>
              Finalizar Compra
            </Button>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirmar pagamento</DialogTitle>
              </DialogHeader>

              <p>
                Deseja simular o pagamento de{" "}
                <strong>R${total.toFixed(2)}</strong>?
              </p>

              <DialogFooter>
                <Button disabled={isPending} variant="outline" onClick={() => setOpen(false)}>
                  Cancelar
                </Button>
                <Button
                  onClick={handleConfirmOrder}
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <Spinner />
                      Confirmando...
                    </>
                  ) : (
                    "Confirmar"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
