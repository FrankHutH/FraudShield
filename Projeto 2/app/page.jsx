// Murilo Lobato - RA: 10752958

import ThemeToggle from "../components/ThemeToggle";

export const metadata = {
  title: "FraudShield",
  description: "Aprenda a reconhecer golpes digitais com o FraudShield. Explicações simples e dois jogos para treinar."
};

export default function Home() {
  return (
    <>
      <header className="cabecalho-principal">
                  <a className="marca" href="/" aria-label="FraudShield — início"><img src="/img/logo.png" alt="" /><span>Fraud<b>Shield</b></span></a>

                  <nav className="menu-navegacao" aria-label="Navegação principal">
                      <a href="/" aria-current="page" className="ativo">Início</a>
                      <a href="/golpes">Golpes</a>
                      <a href="/dicas">Dicas</a>
                      <a href="/quiz">Jogar</a>
                      <a href="/sobre">Sobre</a>
                      <a href="/contato">Contato</a>
                  </nav>

                  <ThemeToggle />
              </header>

              <main>
                  <section className="abertura" aria-labelledby="titulo-inicio">
                      <header>
                          <h1 id="titulo-inicio">Golpe não bate na porta. Chega pelo celular.</h1>

                          <p>Mensagem de “troquei de número”, ligação com a voz do seu neto, central do banco pedindo código. O FraudShield mostra como esses golpes funcionam e treina seu olho com dois jogos curtos.</p>

                          <p className="acoes">
                              <a className="botao" href="/quiz">▶ Jogar agora</a>
                              <a className="botao secundario" href="/golpes">Ver os golpes</a>
                          </p>
                      </header>

                      <img className="logo-grande" src="/img/logo.png" alt="" />
                  </section>

                  <section className="secao exemplo" aria-labelledby="titulo-exemplo">
                      <article className="celular" aria-label="Exemplo de mensagem suspeita">
                          <header>Número desconhecido <small>agora</small></header>
                          <p>Oi mãe, troquei de número! Salva esse. Preciso de um <mark>Pix urgente</mark> pra pagar um boleto, <mark>hoje ainda</mark>. Depois te explico.</p>
                      </article>

                      <section>
                          <h2 id="titulo-exemplo">Parece normal, né?</h2>
                          <p>Repare em três coisas: número novo, pedido de dinheiro e pressa. Juntas, são a receita mais comum de golpe no WhatsApp.</p>
                          <p><strong>O que fazer:</strong> ligue para o número antigo da pessoa antes de qualquer Pix.</p>
                      </section>
                  </section>

                  <section className="secao" aria-labelledby="titulo-regras">
                      <h2 id="titulo-regras">Quatro regras antes de responder qualquer coisa</h2>

                      <ol className="cartoes numerada">
                          <li className="cartao">
                              <h3>Sem pressa.</h3>
                              <p>Quem aplica golpe precisa que você decida agora. Você pode esperar.</p>
                          </li>

                          <li className="cartao">
                              <h3>Confirme por outro caminho.</h3>
                              <p>Ligue para um número que você já tinha salvo.</p>
                          </li>

                          <li className="cartao">
                              <h3>Código é só seu.</h3>
                              <p>Banco nenhum pede senha ou código de SMS por mensagem.</p>
                          </li>

                          <li className="cartao">
                              <h3>Pergunte a alguém.</h3>
                              <p>Mostrar a mensagem para outra pessoa já desarma muito golpe.</p>
                          </li>
                      </ol>
                  </section>

                  <aside className="chamada" aria-labelledby="titulo-chamada">
                      <header>
                          <h2 id="titulo-chamada">Vamos treinar?</h2>
                          <p>Dois jogos, cinco minutos, nenhum cadastro.</p>
                      </header>

                      <a className="botao" href="/quiz">▶ Começar</a>
                  </aside>
              </main>

              <footer className="rodape-principal">
                  <p><strong>FraudShield</strong> · projeto de extensão de Murilo Lobato</p>

                  <nav aria-label="Links do rodapé">
                      <a href="/sobre">Sobre</a>
                      <a href="/contato">Contato</a>
                  </nav>
              </footer>
    </>
  );
}
