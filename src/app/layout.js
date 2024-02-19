import { Inter } from "next/font/google";
import "./globals.css";

import { Web3ModalProvider } from "../context/Web3Modal";

export const metadata = {
  title: "Web3Modal",
  description: "Web3Modal Example",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {" "}
        <Web3ModalProvider>{children}</Web3ModalProvider>
      </body>
    </html>
  );
}
