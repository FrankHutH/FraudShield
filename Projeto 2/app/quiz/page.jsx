// Murilo Lobato - RA: 10752958

import LegacyScripts from "../../components/LegacyScripts";
import "../../styles/pages/quiz.css";
import Card from "../../components/Card";

export const metadata = {
  title: "Jogar | FraudShield",
  description: "Dois jogos curtos para treinar a identificar golpes digitais."
};

export default function Page() {
  return (
    <>
<main>
                  <header className="introducao">
                      <h1>Escolha um jogo</h1>
                      <p>Sem cronômetro e sem cadastro. Errar aqui é de graça — é justamente pra isso que serve.</p>
                  </header>

                  <ol className="cartoes secao">
                      <Card>
                          <p className="etiqueta">Fase 1</p>
                          <h2>Golpe ou seguro?</h2>
                          <p>Leia cada situação e decida: é golpe ou é uma atitude segura?</p>
                          <a className="botao" href="/quiz1">▶ Jogar</a>
                      </Card>

                      <Card>
                          <p className="etiqueta">Fase 2</p>
                          <h2>Encontre os sinais</h2>
                          <p>Toque nas palavras da mensagem que deveriam acender o alerta.</p>
                          <a className="botao" href="/quiz2">▶ Jogar</a>
                      </Card>
                  </ol>

                  <section className="painel placar-geral" aria-labelledby="titulo-placar">
                      <h2 id="titulo-placar">Seu placar</h2>

                      <p className="pontuacao-total" id="pontuacaoTotal">0 pontos</p>
                      <progress id="barraProgresso" value="0" max="100" aria-label="Progresso do treinamento">0%</progress>
                      <p id="textoProgresso">Progresso: 0%</p>

                      <ul className="status-jogos">
                          <li id="statusJogo1">Fase 1 — não concluída</li>
                          <li id="statusJogo2">Fase 2 — não concluída</li>
                      </ul>

                      <p><small>Cada acerto vale 10 pontos. O placar fica salvo só neste navegador.</small></p>

                      <button className="botao secundario" id="botaoZerarPontos" type="button">Zerar placar</button>
                  </section>
              </main>

<LegacyScripts scripts={["/js/progresso.js","/js/quiz.js"]} />
    </>
  );
}
