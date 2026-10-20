import type { Metadata } from "next";
import ScenariosScreen from "@/screens/Scenarios";

export const metadata: Metadata = { title: "场景配置" };

export default function Page() {
  return <ScenariosScreen />;
}
