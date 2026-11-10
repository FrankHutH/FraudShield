"use client";

import { useEffect, useState } from "react";

export default function ListaGolpesAPI() {
  const [golpes, setGolpes] = useState([]);
  const [erro, setErro] = useState("");

  useEffect(() => {
    fetch("/api/golpes")
      .then((resposta) => {
        if (!resposta.ok) throw new Error("Não foi possível carregar os exemplos.");
        return resposta.json();
      })
      .then((dados) => setGolpes(dados))
      .catch(() => setErro("Não foi possível carregar os exemplos."));
  }, []);

  return (
    <section className="secao" aria-labelledby="titulo-exemplos-api">
      <h2 id="titulo-exemplos-api">Mais exemplos de golpes</h2>
      <p>Estes exemplos são carregados da API do FraudShield.</p>
      {erro ? (
        <p role="alert">{erro}</p>
      ) : golpes.length === 0 ? (
        <p role="status">Carregando exemplos...</p>
      ) : (
        <ul className="cartoes">
          {golpes.map((golpe) => (
            <li className="cartao" key={golpe.id}>
              <p className="etiqueta">{golpe.tipo}</p>
              <h3>{golpe.titulo}</h3>
              <p>{golpe.exemplo}</p>
              <a href={`/golpes/${golpe.id}`}>Ver como se proteger</a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
