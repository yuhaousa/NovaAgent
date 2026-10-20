import type { Metadata } from "next";
import MainScreen from "@/screens/Main";

export const metadata: Metadata = { title: "今日工作台" };

export default function Page() {
  return <MainScreen />;
}
