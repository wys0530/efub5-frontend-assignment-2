import "./globals.css";
import Header from "./Header";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body>
        <Header session={session} />
        {children}
      </body>
    </html>
  );
}
