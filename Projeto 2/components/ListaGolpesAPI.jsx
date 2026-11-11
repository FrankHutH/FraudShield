"use client";

import { useEffect, useState } from "react";

export default function ListaGolpesAPI() {
  const [golpes, setGolpes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    let ativo = true;

    async function carregarGolpes() {
      try {
        const resposta = await fetch("/api/golpes");

        if (!resposta.ok) {
          throw new Error("Não foi possível carregar os exemplos.");
        }

        const dados = await resposta.json();

        if (!Array.isArray(dados)) {
          throw new Error("JSON inválido");
        }

        if (ativo) {
          setGolpes(dados);
        }
      } catch {
        if (ativo) {
          setErro("Não foi possível carregar os exemplos.");
        }
      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    }

    carregarGolpes();

    return () => {
      ativo = false;
    };
  }, []);

  function renderizarGolpes() {
    if (carregando) {
      return <p role="status">Carregando exemplos...</p>;
    }

    if (erro) {
      return <p role="alert">{erro}</p>;
    }

    if (golpes.length === 0) {
      return <p>Nenhum exemplo encontrado.</p>;
    }

    return (
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
    );
  }

  return (
    <section className="secao" aria-labelledby="titulo-exemplos-api">
      <h2 id="titulo-exemplos-api">Mais exemplos de golpes</h2>
      <p>Estes exemplos são carregados da API do FraudShield.</p>
      {renderizarGolpes()}
    </section>
  );
}
