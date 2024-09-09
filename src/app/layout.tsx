import { Inter } from "next/font/google";
import { Metadata } from "next";
import "./globals.css";
import ReduxProvider from './redux/provider'; // Correct path to `provider.tsx`

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Assignment",
  icons: {
    icon: './icon/logo.png', 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
