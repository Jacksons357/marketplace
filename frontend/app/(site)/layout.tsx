import { Navbar } from "@/components/nav-bar";
import "../globals.css"; // garante estilos globais (Tailwind etc.)

export const metadata = {
  title: "Marketplace Multi-ONG",
  description: "E-commerce social conectando ONGs e doadores",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />

      <main className="flex-1 mt-16">{children}</main>

    </div>
  );
}
