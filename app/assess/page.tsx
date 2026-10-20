import type { Metadata } from "next";
import AssessScreen from "@/screens/Assess";

export const metadata: Metadata = { title: "能力测评" };

export default function Page() {
  return <AssessScreen />;
}
