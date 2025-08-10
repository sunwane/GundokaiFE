import type { Metadata } from "next";
import { Lexend } from 'next/font/google';
import "./globals.css";

//set mặc định font chữ cho toàn bộ trang web
const lexend = Lexend({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700','800', '900'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Gundokai",
  description: "Gundokai, ai Gây thì giảm giá",
  icons: {
    icon: '/logo.png',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={lexend.className}>
        {children}
      </body>
    </html>
  );
}
