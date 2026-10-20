import type { Metadata } from "next";
import ReviewScreen from "@/screens/Review";

export const metadata: Metadata = { title: "晚间复盘" };

export default function Page() {
  return <ReviewScreen />;
}
