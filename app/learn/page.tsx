import type { Metadata } from "next";
import LearnScreen from "@/screens/Learn";

export const metadata: Metadata = { title: "学习中心" };

export default function Page() {
  return <LearnScreen />;
}
