import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <p>Você precisa estar logado para acessar o dashboard.</p>
  }

  const { name, email, role, phone, organizationId } = session.user;


  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Dashboard Admin</h1>
      <p>Bem-vindo, {name}!</p>
      <ul className="mt-4">
        <li><strong>Email:</strong> {email}</li>
        <li><strong>Telefone:</strong> {phone}</li>
        <li><strong>Role:</strong> {role}</li>
        <li><strong>Organization ID:</strong> {organizationId}</li>
      </ul>
    </div>
  );
}
