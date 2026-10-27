// Murilo Lobato - RA: 10752958

import "../../styles/pages/dicas.css";
import Card from "../../components/Card";

export const metadata = {
  title: "Dicas | FraudShield",
  description: "Seis hábitos simples para se proteger de golpes digitais."
};

export default function Page() {
  return (
    <>
<main>
                  <header className="introducao">
                      <h1>Seis hábitos que atrapalham qualquer golpista</h1>
                      <p>Não precisa entender de tecnologia. Precisa só de um pouco de desconfiança e destes seis costumes.</p>
                  </header>

                  <ol className="cartoes secao numerada">
                      <Card>
                          <h3>Desconfie do “agora”.</h3>
                          <p>Prazo curto é pra você não pensar. Nada sério se resolve em cinco minutos por mensagem.</p>
                      </Card>

                      <Card>
                          <h3>Número novo? Ligue no antigo.</h3>
                          <p>Se alguém “trocou de número”, confirme pelo contato que você já tinha.</p>
                      </Card>

                      <Card>
                          <h3>Código de SMS não se passa.</h3>
                          <p>Nem para o banco, nem para o WhatsApp, nem para parente. Quem pede, quer entrar na sua conta.</p>
                      </Card>

                      <Card>
                          <h3>Link recebido, link ignorado.</h3>
                          <p>Para ver sua conta, abra o aplicativo do banco você mesmo.</p>
                      </Card>

                      <Card>
                          <h3>Leia o nome antes do Pix.</h3>
                          <p>O nome que aparece na confirmação é de quem vai receber. Não bate? Cancele.</p>
                      </Card>

                      <Card>
                          <h3>Mostre pra alguém.</h3>
                          <p>Ficou em dúvida, mande um print para um filho, neto ou amigo antes de responder.</p>
                      </Card>
                  </ol>

                  <aside className="chamada" aria-labelledby="titulo-chamada">
                      <header>
                          <h2 id="titulo-chamada">Pare. Confirme. Depois decida.</h2>
                          <p>Agora tente achar os sinais numa mensagem de verdade.</p>
                      </header>

                      <a className="botao" href="/quiz2">▶ Encontrar os sinais</a>
                  </aside>
              </main>

</>
  );
}
