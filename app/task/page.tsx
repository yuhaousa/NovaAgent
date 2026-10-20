import type { Metadata } from "next";
import TaskScreen from "@/screens/Task";

export const metadata: Metadata = { title: "任务执行" };

export default function Page() {
  return <TaskScreen />;
}
