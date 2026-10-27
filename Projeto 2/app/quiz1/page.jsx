// Murilo Lobato - RA: 10752958

import LegacyScripts from "../../components/LegacyScripts";
import "../../styles/pages/quiz1.css";

export const metadata = {
  title: "Golpe ou seguro? | FraudShield",
  description: "Jogo: decida se cada situação é golpe ou atitude segura."
};

export default function Page() {
  return (
    <>
<main>
                  <a className="voltar" href="/quiz">← Voltar aos jogos</a>

                  <header className="introducao">
                      <p className="etiqueta">Fase 1</p>
                      <h1>Golpe ou seguro?</h1>
                      <p>Toque numa situação e escolha a caixa certa. Também dá para arrastar o cartão até a caixa.</p>
                  </header>

                  <section className="placar-jogo" aria-label="Placar">
                      <p id="progressoJogo1" role="status"></p>
                      <p className="placar" id="placarJogo1">Pontos nesta sessão: 0</p>
                  </section>

                  <section aria-labelledby="situacoes">
                      <h2 id="situacoes" tabIndex="-1">Situações</h2>
                      <ul className="cartoes" id="listaCartoes"></ul>
                  </section>

                  <section className="cartoes categorias" aria-label="Caixas de resposta">
                      <article className="categoria golpe" id="areaGolpe">
                          <h2>✕ Golpe</h2>
                          <p>Tem algo errado aqui.</p>
                          <button className="botao secundario" type="button" id="botaoClassificarGolpe" disabled>É golpe</button>
                          <ul className="lista-classificados" id="cartoesGolpe"></ul>
                      </article>

                      <article className="categoria seguro" id="areaSeguro">
                          <h2>✓ Seguro</h2>
                          <p>Isso protege você.</p>
                          <button className="botao secundario" type="button" id="botaoClassificarSeguro" disabled>É seguro</button>
                          <ul className="lista-classificados" id="cartoesSeguro"></ul>
                      </article>
                  </section>

                  <p id="resultadoJogo1" className="resultado" role="status" aria-atomic="true" tabIndex="-1"></p>

                  <p className="acoes">
                      <button className="botao" id="botaoProximaRodada" type="button" hidden>Próxima rodada</button>
                      <button className="botao secundario" id="botaoEncerrarJogo1" type="button" hidden>Parar por aqui</button>
                  </p>

                  <p className="aviso">Os exemplos são para treino. Uma atitude segura diminui o risco, mas não garante que todo contato seja legítimo.</p>
              </main>

<LegacyScripts scripts={["/js/dados/situacoes.js","/js/dados/feedback.js","/js/progresso.js","/js/feedback.js","/js/quiz1.js"]} />
    </>
  );
}
