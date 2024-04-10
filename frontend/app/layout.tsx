import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Projeto Publicatate Engenharia",
  description: "Projeto de CRUD de Funcionarios e Fornecedores",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
