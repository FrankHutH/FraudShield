// Murilo Lobato - RA: 10752958
"use client";

import { useEffect } from "react";

export default function LegacyScripts({ scripts }) {
  const chave = scripts.join("|");

  useEffect(() => {
    if (!chave) return;

    window.__fraudshieldInicializados ??= {};
    if (window.__fraudshieldInicializados[chave]) return;
    window.__fraudshieldInicializados[chave] = true;

    async function carregar() {
      for (const caminho of chave.split("|")) {
        await new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.src = caminho;
          script.async = false;
          script.onload = resolve;
          script.onerror = () => reject(new Error("Falha ao carregar " + caminho));
          document.body.appendChild(script);
        });
      }
    }

    carregar().catch((erro) => console.error("FraudShield:", erro));
  }, [chave]);

  return null;
}
