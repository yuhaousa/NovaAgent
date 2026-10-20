import type { Metadata } from "next";
import LessonsScreen from "@/screens/Lessons";

export const metadata: Metadata = { title: "经验库" };

export default function Page() {
  return <LessonsScreen />;
}
