import type { Metadata } from "next";
import SkillMapScreen from "@/screens/SkillMap";

export const metadata: Metadata = { title: "技能图谱" };

export default function Page() {
  return <SkillMapScreen />;
}
