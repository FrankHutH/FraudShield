// Murilo Lobato - RA: 10752958

import "../../styles/pages/sobre.css";
import Card from "../../components/Card";

export const metadata = {
  title: "Sobre | FraudShield",
  description: "Por que o FraudShield existe e para quem ele foi feito."
};

export default function Page() {
  return (
    <>
<main>
                  <header className="introducao">
                      <h1>Por que isso existe</h1>
                      <p>Golpe com voz clonada e mensagem bem escrita engana qualquer um. E engana mais quem tem menos intimidade com o celular.</p>
                  </header>

                  <section className="sobre secao" aria-label="Sobre o projeto">
                      <article>
                          <p>O FraudShield é um projeto de extensão universitária feito para pessoas idosas e para quem cuida delas no dia a dia: filhos, netos, vizinhos, voluntários de oficina.</p>
                          <p>A ideia é simples: explicar sem palavra difícil e deixar praticar num lugar onde errar não custa nada. Por isso tem jogo, e não só texto.</p>
                          <p>Funciona sem cadastro e sem internet depois de aberto. Dá para usar numa biblioteca, num telecentro ou na mesa da cozinha.</p>
                      </article>

                      <blockquote className="painel painel-azul">
                          <p className="lema">Desconfie.<br />Confirme.<br /><em>Só depois decida.</em></p>
                      </blockquote>
                  </section>

                  <section className="secao" aria-labelledby="titulo-conteudo">
                      <h2 id="titulo-conteudo">O que tem aqui</h2>

                      <ul className="cartoes">
                          <Card>
                              <h3><a href="/golpes">Golpes</a></h3>
                              <p>Os quatro truques mais usados, com exemplo de como eles falam.</p>
                          </Card>

                          <Card>
                              <h3><a href="/dicas">Dicas</a></h3>
                              <p>Seis hábitos curtos para levar para a vida.</p>
                          </Card>

                          <Card>
                              <h3><a href="/quiz">Jogos</a></h3>
                              <p>Separe golpe de atitude segura e ache os sinais numa mensagem.</p>
                          </Card>
                      </ul>
                  </section>
              </main>

</>
  );
}
