import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { switchThemeDuration } from "./constants/switch-theme-duration";
import { ThemeProvider } from "./theme-provider";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import localFont from "next/font/local";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quiz App",
  description: "A quiz app",
};

const rubik = localFont({
  src: [
    {
      path: "../../assets/fonts/Rubik-Italic-VariableFont_wght.ttf",
      style: "italic",
    },
    {
      path: "../../assets/fonts/Rubik-VariableFont_wght.ttf",
      style: "normal",
    },
  ],
  variable: "--font-rubik",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${rubik.variable} font-sans`}>
      <body className={` ${rubik.variable} font-sans bg-slate-50 dark:bg-[#0d1117] ${switchThemeDuration}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="p-20 flex justify-end">
            <ThemeSwitcher />
          </div>
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
