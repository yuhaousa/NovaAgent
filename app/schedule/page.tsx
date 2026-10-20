import type { Metadata } from "next";
import ScheduleScreen from "@/screens/Schedule";

export const metadata: Metadata = { title: "定时与触发式学习" };

export default function Page() {
  return <ScheduleScreen />;
}
