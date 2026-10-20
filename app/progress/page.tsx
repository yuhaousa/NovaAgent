import type { Metadata } from "next";
import ProgressScreen from "@/screens/Progress";

export const metadata: Metadata = { title: "学习进度" };

export default function Page() {
  return <ProgressScreen />;
}
