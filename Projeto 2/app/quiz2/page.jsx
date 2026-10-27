// Murilo Lobato - RA: 10752958

import LegacyScripts from "../../components/LegacyScripts";
import "../../styles/pages/quiz2.css";

export const metadata = {
  title: "Encontre os sinais | FraudShield",
  description: "Jogo: encontre as palavras suspeitas em mensagens de golpe."
};

export default function Page() {
  return (
    <>
<main>
                  <a className="voltar" href="/quiz">← Voltar aos jogos</a>

                  <header className="introducao">
                      <p className="etiqueta">Fase 2</p>
                      <h1>Encontre os sinais</h1>
                      <p>Toque nas palavras que deveriam acender o alerta. Se a mensagem parecer limpa, verifique sem marcar nada.</p>
                  </header>

                  <section className="placar-jogo" aria-label="Placar">
                      <p id="progressoJogo2" role="status"></p>
                      <p className="placar" id="placarJogo2">Pontos nesta sessão: 0</p>
                  </section>

                  <section className="painel" aria-labelledby="mensagem-titulo">
                      <h2 id="mensagem-titulo" tabIndex="-1">Mensagem recebida</h2>
                      <p className="mensagem-jogo" id="mensagemJogo"></p>

                      <ul className="legenda" aria-label="Legenda da correção">
                          <li className="palavra-correta">✓ Achou</li>
                          <li className="palavra-incorreta">✕ Não era</li>
                          <li className="palavra-perdida">! Faltou</li>
                      </ul>
                  </section>

                  <p id="resultadoJogo2" className="resultado" role="status" aria-atomic="true" tabIndex="-1"></p>

                  <p className="acoes">
                      <button className="botao" id="botaoVerificarJogo2" type="button">Verificar</button>
                      <button className="botao secundario" id="botaoProximaMensagem" type="button" disabled>Próxima mensagem</button>
                      <button className="botao" id="botaoProximaRodadaJogo2" type="button" hidden>Próxima rodada</button>
                      <button className="botao secundario" id="botaoEncerrarJogo2" type="button" hidden>Parar por aqui</button>
                  </p>

                  <p className="aviso">Uma palavra sozinha não prova que é golpe. O que pesa é o conjunto: pressa, dinheiro, senha, link.</p>
              </main>

<LegacyScripts scripts={["/js/dados/mensagens.js","/js/progresso.js","/js/feedback.js","/js/quiz2.js"]} />
    </>
  );
}
