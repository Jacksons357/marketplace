import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useCart } from "@/contexts/cart-context";
import { toast } from "sonner";

export default function ClearCartDialog() {
  const { clearCart } = useCart();
  const [open, setOpen] = useState(false);

  function handleConfirmClear() {
    clearCart();
    toast.success("Carrinho limpo com sucesso 🗑️");
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Limpar Carrinho
      </Button>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Limpar carrinho</DialogTitle>
        </DialogHeader>

        <p>Tem certeza que deseja remover todos os itens do carrinho?</p>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={handleConfirmClear}>Confirmar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
