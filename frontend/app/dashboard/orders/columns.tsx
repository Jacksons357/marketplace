import { ColumnDef } from "@tanstack/react-table";
import { OrderResponse } from "@/types/order";

export const columns: ColumnDef<OrderResponse>[] = [
  {
    accessorKey: "createdAt",
    header: "Data",
    cell: ({ getValue }) => {
      const date = new Date(getValue() as string);
      return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}/${date.getFullYear()}`;
    },
  },
  {
    accessorKey: "user.name",
    header: "Cliente",
    cell: ({ row }) => row.original.user?.name || "—",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue() as string;
      const color =
        status === "PAID"
          ? "text-green-600"
          : status === "PENDING"
          ? "text-yellow-600"
          : "text-red-600";
      return <span className={`font-semibold ${color}`}>{status}</span>;
    },
  },
  {
    accessorKey: "totalPrice",
    header: "Total",
    cell: ({ getValue }) => {
      const price = Number(getValue());
      return `R$ ${price.toFixed(2)}`;
    },
  },
  {
    accessorKey: "items",
    header: "Itens do Pedido",
    cell: ({ row }) => (
      <div className="space-y-1">
        {row.original.items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between border-b border-gray-100 py-1 text-sm"
          >
            <span className="font-medium">{item.productName}</span>
            <span className="text-gray-600">
              x{item.quantity} — R$ {item.priceAtPurchase.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    ),
  },
];
