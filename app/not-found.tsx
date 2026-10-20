import Link from "next/link";

export default function NotFound() {
  return (
    <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px" }}>
      <h1 style={{ margin: 0, fontSize: "24px" }}>页面不存在 · Page not found</h1>
      <Link href="/" style={{ fontWeight: 600 }}>返回首页 · Back to home</Link>
    </main>
  );
}
