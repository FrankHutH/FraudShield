// Murilo Lobato - RA: 10752958

import ThemeToggle from "../../components/ThemeToggle";
import "../../styles/pages/golpes.css";

export const metadata = {
  title: "Golpes | FraudShield",
  description: "Como funcionam os golpes com voz clonada, vídeo falso, mensagem falsa e falso atendimento."
};

export default function Page() {
  return (
    <>
      <header className="cabecalho-principal">
                  <a className="marca" href="/" aria-label="FraudShield — início"><img src="/img/logo.png" alt="" /><span>Fraud<b>Shield</b></span></a>

                  <nav className="menu-navegacao" aria-label="Navegação principal">
                      <a href="/">Início</a>
                      <a href="/golpes" aria-current="page" className="ativo">Golpes</a>
                      <a href="/dicas">Dicas</a>
                      <a href="/quiz">Jogar</a>
                      <a href="/sobre">Sobre</a>
                      <a href="/contato">Contato</a>
                  </nav>

                  <ThemeToggle />
              </header>

              <main>
                  <header className="introducao">
                      <h1>Como o golpe chega até você</h1>
                      <p>Hoje dá para imitar a voz, o rosto e até o jeito de escrever de alguém. Veja os quatro truques mais usados e o que fazer em cada um.</p>
                  </header>

                  <ul className="cartoes secao">
                      <li className="cartao">
                          <p className="etiqueta">Ligação ou áudio</p>
                          <h3>Voz clonada</h3>
                          <p className="fala">“Vó, sou eu. Bati o carro, não conta pra ninguém. Me manda um Pix?”</p>

                          <details>
                              <summary>Como se proteger</summary>
                              <p>Poucos segundos de um áudio seu nas redes bastam para copiar sua voz.</p>
                              <p><strong>O que fazer:</strong> desligue e ligue de volta para o número que você já conhece.</p>
                          </details>
                      </li>

                      <li className="cartao">
                          <p className="etiqueta">Vídeo ou foto</p>
                          <h3>Famoso que nunca disse aquilo</h3>
                          <p className="fala">Um apresentador conhecido “indicando” um investimento que dobra seu dinheiro.</p>

                          <details>
                              <summary>Como se proteger</summary>
                              <p>Rosto e voz podem ser montados por computador. O vídeo pode parecer perfeito.</p>
                              <p><strong>O que fazer:</strong> procure a mesma notícia no perfil oficial da pessoa ou num jornal.</p>
                          </details>
                      </li>

                      <li className="cartao">
                          <p className="etiqueta">WhatsApp ou SMS</p>
                          <h3>Mensagem falsa</h3>
                          <p className="fala">“Sua conta será bloqueada hoje. Clique no link para regularizar.”</p>

                          <details>
                              <summary>Como se proteger</summary>
                              <p>Imita empresas de verdade, com logo e tudo. O truque é a ameaça com prazo.</p>
                              <p><strong>O que fazer:</strong> não clique. Abra o aplicativo oficial por conta própria.</p>
                          </details>
                      </li>

                      <li className="cartao">
                          <p className="etiqueta">Telefone</p>
                          <h3>Falso atendente</h3>
                          <p className="fala">“Aqui é da central do banco. Vou mandar um código, pode me falar qual chegou?”</p>

                          <details>
                              <summary>Como se proteger</summary>
                              <p>A pessoa sabe seu nome e parte dos seus dados, e fala como funcionário.</p>
                              <p><strong>O que fazer:</strong> desligue e ligue para o número que está atrás do seu cartão.</p>
                          </details>
                      </li>
                  </ul>

                  <aside className="chamada" aria-labelledby="titulo-chamada">
                      <header>
                          <h2 id="titulo-chamada">Acha que pegaria esses?</h2>
                          <p>Teste no jogo “Golpe ou seguro?”.</p>
                      </header>

                      <a className="botao" href="/quiz1">▶ Testar</a>
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
