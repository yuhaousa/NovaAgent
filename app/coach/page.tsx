import type { Metadata } from "next";
import CoachScreen from "@/screens/Coach";

export const metadata: Metadata = { title: "AI 教练" };

export default function Page() {
  return <CoachScreen />;
}
