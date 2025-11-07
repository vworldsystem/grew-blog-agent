"use client";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <title>루미 블로그 에이전트 v3</title>
        <meta name="description" content="Grew Blog Agent - 루미 감성형 지원" />
      </head>
      <body style={{ background: "#e8fff3", fontFamily: "Pretendard, sans-serif" }}>
        {children}
        <footer style={{ textAlign: "center", marginTop: "40px", fontSize: "13px" }}>
          © Grew Blog Agent · SEO / 쿠팡 / 애드센스 / 루미 감성형 지원 🌸
        </footer>
      </body>
    </html>
  );
}
