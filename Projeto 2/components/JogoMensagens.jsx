"use client";
import { useState } from "react";
import { ler, registrar, sortear } from "./pontuacao";
const normalizar = palavra => palavra.toLocaleLowerCase("pt-BR").replace(/[.,!?;:]/g, "");
export default function JogoMensagens({ dados }) {
  const [rodada, setRodada] = useState(() => sortear(dados));
  const [numero, setNumero] = useState(1);
  const [posicao, setPosicao] = useState(0);
  const [marcadas, setMarcadas] = useState([]);
  const [verificada, setVerificada] = useState(false);
  const [sessao, setSessao] = useState(0);
  const [pontosRodada, setPontosRodada] = useState(0);
  const [resultado, setResultado] = useState("");
  const [encerrado, setEncerrado] = useState(false);
  const mensagem = rodada[posicao];
  const palavras = mensagem.texto.split(" ");
  const sinais = mensagem.sinaisSuspeitos.map(normalizar);
  const ultima = posicao === rodada.length - 1;
  function verificar() {
    if (verificada) return;
    const corretas = palavras.filter((p,i) => marcadas.includes(i) && sinais.includes(normalizar(p))).length;
    const incorretas = marcadas.filter(i => !sinais.includes(normalizar(palavras[i]))).length;
    const acertou = corretas === sinais.length && incorretas === 0;
    const novosPontos = pontosRodada + (acertou ? 10 : 0);
    setVerificada(true);
    setPontosRodada(novosPontos);
    if (acertou) setSessao(n => n + 10);
    registrar(2, acertou ? 1 : 0, novosPontos, ultima);
    setResultado((acertou ? "✓ Você acertou! " : "✕ Sua resposta precisa de correção. ") +
      "Você encontrou " + corretas + " de " + sinais.length + " sinais. Seleções incorretas: " + incorretas + ".");
  }
  function avancar() { setPosicao(i => i+1); setMarcadas([]); setVerificada(false); setResultado(""); }
  function proxima() { setRodada(sortear(dados)); setNumero(n=>n+1); setPosicao(0); setMarcadas([]); setVerificada(false); setPontosRodada(0); setResultado(""); setEncerrado(false); }
  return <><section className="placar-jogo" aria-label="Placar">
    <p role="status">Rodada {numero} · Mensagem {posicao+1} de {rodada.length}</p>
    <p className="placar">Pontos nesta sessão: {sessao} · Total acumulado: {ler(2,"Pontos")} · Recorde: {ler(2,"Recorde")}</p>
  </section>
  <section className="painel" aria-labelledby="mensagem-titulo"><h2 id="mensagem-titulo">Mensagem recebida</h2>
    <p className="mensagem-jogo">{palavras.map((palavra, i) => {
      const sinal = sinais.includes(normalizar(palavra));
      const classe = verificada ? (sinal ? (marcadas.includes(i) ? "palavra-correta" : "palavra-perdida") : (marcadas.includes(i) ? "palavra-incorreta" : "")) : (marcadas.includes(i) ? "palavra-selecionada" : "");
      return <span key={i}><button type="button" className={"palavra-mensagem " + classe} aria-pressed={marcadas.includes(i)} disabled={verificada || encerrado} onClick={() => setMarcadas(atuais => atuais.includes(i) ? atuais.filter(x=>x!==i) : [...atuais,i])}>{verificada && sinal ? (marcadas.includes(i) ? "✓ " : "! ") : verificada && marcadas.includes(i) ? "✕ " : ""}{palavra}</button>{" "}</span>;
    })}</p>
    <ul className="legenda" aria-label="Legenda"><li className="palavra-correta">✓ Achou</li><li className="palavra-incorreta">✕ Não era</li><li className="palavra-perdida">! Faltou</li></ul>
  </section>
  <p className="resultado" role="status">{resultado}{verificada && ultima ? " Rodada concluída! Pontos da rodada: "+pontosRodada+"." : ""}</p>
  <p className="acoes"><button className="botao" type="button" disabled={verificada || encerrado} onClick={verificar}>Verificar</button>
    {verificada && !ultima && <button type="button" className="botao secundario" onClick={avancar}>Próxima mensagem</button>}
    {verificada && ultima && !encerrado && <><button type="button" className="botao" onClick={proxima}>Próxima rodada</button><button type="button" className="botao secundario" onClick={() => setEncerrado(true)}>Parar por aqui</button></>}</p>
  {encerrado && <p className="resultado resultado-resumo">Fim de jogo! Você fez {sessao} pontos nesta sessão.</p>}
  <p className="aviso">Uma palavra sozinha não prova que é golpe. O que pesa é o conjunto: pressa, dinheiro, senha, link.</p>
  </>;
}
