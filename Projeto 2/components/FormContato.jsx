"use client";

import { useState } from "react";

// Formulário local de demonstração: não envia dados para servidor.
export default function FormContato() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [preparada, setPreparada] = useState("");
  const [status, setStatus] = useState("");

  function preparar(evento) {
    evento.preventDefault();
    if (!nome.trim() || !email.trim() || !mensagem.trim()) {
      setStatus("Preencha todos os campos com algo além de espaços.");
      return;
    }
    setPreparada("Nome: " + nome.trim() + "\nE-mail: " + email.trim() + "\n\n" + mensagem.trim());
    setStatus("Mensagem preparada. Nada foi enviado ou armazenado. Copie o texto abaixo.");
  }

  async function copiar() {
    try {
      await navigator.clipboard.writeText(preparada);
      setStatus("Mensagem copiada. O formulário não realizou nenhum envio.");
    } catch {
      setStatus("Selecione o texto e copie usando a opção de copiar do seu dispositivo.");
      document.getElementById("mensagemPreparada")?.select();
    }
  }

  return (
    <form onSubmit={preparar}>
      <label htmlFor="nome">Nome</label>
      <input id="nome" name="nome" autoComplete="name" maxLength={100} required value={nome} onChange={(e) => setNome(e.target.value)} />

      <label htmlFor="email">E-mail</label>
      <input type="email" id="email" name="email" autoComplete="email" maxLength={200} required value={email} onChange={(e) => setEmail(e.target.value)} />

      <label htmlFor="mensagem">Mensagem</label>
      <textarea id="mensagem" name="mensagem" maxLength={3000} aria-describedby="privacidade" required value={mensagem} onChange={(e) => setMensagem(e.target.value)} />
      <small id="privacidade">Não escreva senhas, códigos ou dados de cartão.</small>

      <button className="botao" type="submit">Preparar mensagem</button>
      {status && <p className="aviso" role="status">{status}</p>}

      {preparada && (
        <>
          <label htmlFor="mensagemPreparada">Mensagem pronta para copiar</label>
          <textarea id="mensagemPreparada" readOnly value={preparada} />
          <button className="botao secundario" type="button" onClick={copiar}>Copiar mensagem</button>
        </>
      )}
    </form>
  );
}
