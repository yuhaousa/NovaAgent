import type { Metadata } from "next";
import SessionScreen from "@/screens/Session";

export const metadata: Metadata = { title: "一个知识点，六种学法" };

export default function Page() {
  return <SessionScreen />;
}
