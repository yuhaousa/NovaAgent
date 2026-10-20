import type { Metadata, Viewport } from "next";
import { LangProvider } from "@/components/lang";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "学习助手 · NovaAgent", template: "%s · 学习助手" },
  description: "学习型工作 Agent：在你做事时向你学习。",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&family=JetBrains+Mono:wght@500&display=swap"
        />
      </head>
      <body>
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
