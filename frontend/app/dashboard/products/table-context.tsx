"use client"

import * as React from "react"
import { Product } from "@/types/product"

type ProductTableContextValue = {
  onEdit: (product: Product) => void
  onDelete: (product: Product) => void
}

const ProductTableContext = React.createContext<ProductTableContextValue | undefined>(undefined)

export function ProductTableProvider({ value, children }: { value: ProductTableContextValue, children: React.ReactNode }) {
  return <ProductTableContext.Provider value={value}>{children}</ProductTableContext.Provider>
}

export function useProductTable() {
  const ctx = React.useContext(ProductTableContext)
  if (!ctx) {
    throw new Error("useProductTable must be used within ProductTableProvider")
  }
  return ctx
}