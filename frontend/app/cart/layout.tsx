import { Navbar } from "@/components/nav-bar";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />

      <main className="flex-1 mt-30">{children}</main>

    </div>
  );
}