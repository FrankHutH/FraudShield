// Murilo Lobato - RA: 10752958

import Script from "next/script";
import "../styles/globals.css";

export const metadata = {
  title: "FraudShield",
  description: "Aprenda a reconhecer golpes digitais com explicações simples e jogos educativos.",
  icons: { icon: "/img/favicon.png" },
  other: { "theme-color": "#0b1b3f" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        {children}
        <Script src="/js/tema.js" strategy="beforeInteractive" />
      </body>
    </html>
  );
}
