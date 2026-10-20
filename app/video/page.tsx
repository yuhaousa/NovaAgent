import type { Metadata } from "next";
import VideoScreen from "@/screens/Video";

export const metadata: Metadata = { title: "AI 视频课" };

export default function Page() {
  return <VideoScreen />;
}
