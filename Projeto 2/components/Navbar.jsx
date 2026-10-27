// Murilo Lobato - RA: 10752958
"use client";

import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Início" },
  { href: "/golpes", label: "Golpes" },
  { href: "/dicas", label: "Dicas" },
  { href: "/quiz", label: "Jogar" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" }
];

export default function Navbar() {
  const caminho = usePathname();

  return (
    <nav className="menu-navegacao" aria-label="Navegação principal">
      {links.map(({ href, label }) => {
        const ativo = href === "/quiz"
          ? ["/quiz", "/quiz1", "/quiz2"].includes(caminho)
          : caminho === href;

        return (
          <a
            key={href}
            href={href}
            aria-current={ativo ? "page" : undefined}
            className={ativo ? "ativo" : undefined}
          >
            {label}
          </a>
        );
      })}
    </nav>
  );
}
