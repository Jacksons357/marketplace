"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Separator } from "./separator";

export function Footer() {
  return (
    <footer className="bg-card mt-8">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Sobre nós</h3>
            <p className="text-muted-foreground text-sm">
              Marketplace dedicado a conectar ONGs e consumidores conscientes,
              promovendo o comércio justo e sustentável.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary">
                  Sobre
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">
                  Contato
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-muted-foreground hover:text-primary">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Categorias</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/?category=Artesanato" className="text-sm text-muted-foreground hover:text-primary">
                  Artesanato
                </Link>
              </li>
              <li>
                <Link href="/?category=Decoração" className="text-sm text-muted-foreground hover:text-primary">
                  Decoração
                </Link>
              </li>
              <li>
                <Link href="/?category=Moda" className="text-sm text-muted-foreground hover:text-primary">
                  Moda
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Redes Sociais</h3>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="text-center text-sm text-muted-foreground">
          <p>© 2024 Marketplace ONGs. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}