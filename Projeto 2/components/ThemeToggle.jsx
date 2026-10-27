// Murilo Lobato - RA: 10752958
"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [tema, setTema] = useState("claro");

  useEffect(() => {
    const prefereEscuro = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const salvo = window.localStorage.getItem("tema");
    const inicial = salvo === "claro" || salvo === "escuro" ? salvo : prefereEscuro ? "escuro" : "claro";
    setTema(inicial);
    document.documentElement.dataset.tema = inicial;
  }, []);

  function alternarTema() {
    const proximo = tema === "escuro" ? "claro" : "escuro";
    document.documentElement.dataset.tema = proximo;
    window.localStorage.setItem("tema", proximo);
    setTema(proximo);
  }

  return (
    <button className="alternar-tema" id="alternarTema" type="button"
      aria-pressed={tema === "escuro"} onClick={alternarTema}>
      {tema === "escuro" ? "☀ Claro" : "☾ Escuro"}
    </button>
  );
}
