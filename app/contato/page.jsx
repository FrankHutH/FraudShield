// Murilo Lobato - RA: 10752958

import ThemeToggle from "../../components/ThemeToggle";
import LegacyScripts from "../../components/LegacyScripts";
import "../../styles/pages/contato.css";

export const metadata = {
  title: "Contato | FraudShield",
  description: "Mande uma dúvida ou sugestão para o FraudShield."
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
                      <a href="/quiz">Jogar</a>
                      <a href="/sobre">Sobre</a>
                      <a href="/contato" aria-current="page" className="ativo">Contato</a>
                  </nav>

                  <ThemeToggle />
              </header>

              <main>
                  <header className="introducao">
                      <h1>Fale com a gente</h1>
                      <p>Viu um golpe que não está aqui? Tem uma sugestão? Escreva.</p>
                  </header>

                  <section className="contato" aria-label="Orientações e formulário de contato">
                      <aside className="painel painel-azul">
                          <h2>Recebeu algo estranho agora?</h2>

                          <ol className="passos">
                              <li>Não mande dinheiro nem dados.</li>
                              <li>Ligue para a pessoa ou empresa por um número que você já conhece.</li>
                              <li>Não passe senha nem código.</li>
                              <li>Já fez o Pix? Ligue na hora para o seu banco, pelo número atrás do cartão.</li>
                          </ol>

                          <a href="/dicas">Ver todas as dicas</a>
                      </aside>

                      <article className="painel">
                          <h2>Sua mensagem</h2>
                          <p>Este formulário é de demonstração: ele monta o texto para você copiar, mas não envia nada.</p>

                          <form id="contactForm">
                              <label htmlFor="nome">Nome</label>
                              <input id="nome" name="nome" autoComplete="name" maxLength="100" required />

                              <label htmlFor="email">E-mail</label>
                              <input type="email" id="email" name="email" autoComplete="email" maxLength="200" required />

                              <label htmlFor="mensagem">Mensagem</label>
                              <textarea id="mensagem" name="mensagem" maxLength="3000" aria-describedby="privacidade" required></textarea>
                              <small id="privacidade">Não escreva senhas, códigos ou dados de cartão.</small>

                              <button className="botao" type="submit">Preparar mensagem</button>
                              <p id="formStatus" className="aviso" role="status" hidden></p>

                              <label htmlFor="mensagemPreparada" id="rotuloPreparada" hidden>Mensagem pronta para copiar</label>
                              <textarea id="mensagemPreparada" readOnly hidden></textarea>
                              <button className="botao secundario" id="copiarMensagem" type="button" hidden>Copiar mensagem</button>
                          </form>
                      </article>
                  </section>
              </main>

              <footer className="rodape-principal">
                  <p><strong>FraudShield</strong> · projeto de extensão de Murilo Lobato</p>

                  <nav aria-label="Links do rodapé">
                      <a href="/sobre">Sobre</a>
                      <a href="/contato">Contato</a>
                  </nav>
              </footer>
      <LegacyScripts scripts={["/js/contato.js"]} />
    </>
  );
}
