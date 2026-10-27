// Murilo Lobato - RA: 10752958

import ThemeToggle from "../../components/ThemeToggle";
import LegacyScripts from "../../components/LegacyScripts";
import "../../styles/pages/quiz.css";

export const metadata = {
  title: "Jogar | FraudShield",
  description: "Dois jogos curtos para treinar a identificar golpes digitais."
};

export default function Page() {
  return (
    <>
      <header className="cabecalho-principal">
                  <a className="marca" href="/" aria-label="FraudShield — início"><img src="/img/logo.png" alt="" /><span>Fraud<b>Shield</b></span></a>

                  <nav className="menu-navegacao" aria-label="Navegação principal">
                      <a href="/">Início</a>
                      <a href="/golpes">Golpes</a>
                      <a href="/dicas">Dicas</a>
                      <a href="/quiz" aria-current="page" className="ativo">Jogar</a>
                      <a href="/sobre">Sobre</a>
                      <a href="/contato">Contato</a>
                  </nav>

                  <ThemeToggle />
              </header>

              <main>
                  <header className="introducao">
                      <h1>Escolha um jogo</h1>
                      <p>Sem cronômetro e sem cadastro. Errar aqui é de graça — é justamente pra isso que serve.</p>
                  </header>

                  <ol className="cartoes secao">
                      <li className="cartao">
                          <p className="etiqueta">Fase 1</p>
                          <h2>Golpe ou seguro?</h2>
                          <p>Leia cada situação e decida: é golpe ou é uma atitude segura?</p>
                          <a className="botao" href="/quiz1">▶ Jogar</a>
                      </li>

                      <li className="cartao">
                          <p className="etiqueta">Fase 2</p>
                          <h2>Encontre os sinais</h2>
                          <p>Toque nas palavras da mensagem que deveriam acender o alerta.</p>
                          <a className="botao" href="/quiz2">▶ Jogar</a>
                      </li>
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

              <footer className="rodape-principal">
                  <p><strong>FraudShield</strong> · projeto de extensão de Murilo Lobato</p>

                  <nav aria-label="Links do rodapé">
                      <a href="/sobre">Sobre</a>
                      <a href="/contato">Contato</a>
                  </nav>
              </footer>
      <LegacyScripts scripts={["/js/progresso.js","/js/quiz.js"]} />
    </>
  );
}
