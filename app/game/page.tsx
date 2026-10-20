import type { Metadata } from "next";
import GameScreen from "@/screens/Game";

export const metadata: Metadata = { title: "情景闯关" };

export default function Page() {
  return <GameScreen />;
}
