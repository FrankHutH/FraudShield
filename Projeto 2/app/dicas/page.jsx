// Murilo Lobato - RA: 10752958

import ThemeToggle from "../../components/ThemeToggle";
import "../../styles/pages/dicas.css";

export const metadata = {
  title: "Dicas | FraudShield",
  description: "Seis hábitos simples para se proteger de golpes digitais."
};

export default function Page() {
  return (
    <>
      <header className="cabecalho-principal">
                  <a className="marca" href="/" aria-label="FraudShield — início"><img src="/img/logo.png" alt="" /><span>Fraud<b>Shield</b></span></a>

                  <nav className="menu-navegacao" aria-label="Navegação principal">
                      <a href="/">Início</a>
                      <a href="/golpes">Golpes</a>
                      <a href="/dicas" aria-current="page" className="ativo">Dicas</a>
                      <a href="/quiz">Jogar</a>
                      <a href="/sobre">Sobre</a>
                      <a href="/contato">Contato</a>
                  </nav>

                  <ThemeToggle />
              </header>

              <main>
                  <header className="introducao">
                      <h1>Seis hábitos que atrapalham qualquer golpista</h1>
                      <p>Não precisa entender de tecnologia. Precisa só de um pouco de desconfiança e destes seis costumes.</p>
                  </header>

                  <ol className="cartoes secao numerada">
                      <li className="cartao">
                          <h3>Desconfie do “agora”.</h3>
                          <p>Prazo curto é pra você não pensar. Nada sério se resolve em cinco minutos por mensagem.</p>
                      </li>

                      <li className="cartao">
                          <h3>Número novo? Ligue no antigo.</h3>
                          <p>Se alguém “trocou de número”, confirme pelo contato que você já tinha.</p>
                      </li>

                      <li className="cartao">
                          <h3>Código de SMS não se passa.</h3>
                          <p>Nem para o banco, nem para o WhatsApp, nem para parente. Quem pede, quer entrar na sua conta.</p>
                      </li>

                      <li className="cartao">
                          <h3>Link recebido, link ignorado.</h3>
                          <p>Para ver sua conta, abra o aplicativo do banco você mesmo.</p>
                      </li>

                      <li className="cartao">
                          <h3>Leia o nome antes do Pix.</h3>
                          <p>O nome que aparece na confirmação é de quem vai receber. Não bate? Cancele.</p>
                      </li>

                      <li className="cartao">
                          <h3>Mostre pra alguém.</h3>
                          <p>Ficou em dúvida, mande um print para um filho, neto ou amigo antes de responder.</p>
                      </li>
                  </ol>

                  <aside className="chamada" aria-labelledby="titulo-chamada">
                      <header>
                          <h2 id="titulo-chamada">Pare. Confirme. Depois decida.</h2>
                          <p>Agora tente achar os sinais numa mensagem de verdade.</p>
                      </header>

                      <a className="botao" href="/quiz2">▶ Encontrar os sinais</a>
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
