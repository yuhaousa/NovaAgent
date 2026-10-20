import type { Metadata } from "next";
import ModesScreen from "@/screens/Modes";

export const metadata: Metadata = { title: "学习模式库" };

export default function Page() {
  return <ModesScreen />;
}
