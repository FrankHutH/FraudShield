"use client";
import { useState } from "react";
export default function ContatoForm() {
  const [texto,setTexto]=useState("");
  const [status,setStatus]=useState("");
  function preparar(e) {
    e.preventDefault();
    const form=new FormData(e.currentTarget);
    setTexto("Nome: "+form.get("nome")+"\nE-mail: "+form.get("email")+"\nMensagem: "+form.get("mensagem"));
    setStatus("Mensagem preparada. Copie o texto abaixo.");
  }
  async function copiar() {
    try { await navigator.clipboard.writeText(texto); setStatus("Mensagem copiada."); }
    catch { setStatus("Selecione e copie manualmente o texto abaixo."); }
  }
  return <form onSubmit={preparar}><label htmlFor="nome">Nome</label><input id="nome" name="nome" autoComplete="name" maxLength={100} required/>
    <label htmlFor="email">E-mail</label><input id="email" name="email" type="email" autoComplete="email" maxLength={200} required/>
    <label htmlFor="mensagem">Mensagem</label><textarea id="mensagem" name="mensagem" maxLength={3000} required/>
    <small>Não escreva senhas, códigos ou dados de cartão.</small>
    <button className="botao" type="submit">Preparar mensagem</button><p className="aviso" role="status">{status}</p>
    {texto && <><label htmlFor="mensagemPreparada">Mensagem pronta para copiar</label><textarea id="mensagemPreparada" value={texto} readOnly/><button className="botao secundario" type="button" onClick={copiar}>Copiar mensagem</button></>}
  </form>;
}
