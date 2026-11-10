// Murilo Lobato - RA: 10752958

import Placar from "../../components/Placar";
import Card from "../../components/Card";

export const metadata = {
  title: "Jogar | FraudShield",
  description: "Dois jogos curtos para treinar a identificar golpes digitais.",
};

export default function Page() {
  return (
    <>
      <main>
        <header className="introducao">
          <h1>Escolha um jogo</h1>
          <p>
            Sem cronômetro e sem cadastro. Errar aqui é de graça — é justamente
            pra isso que serve.
          </p>
        </header>

        <ol className="cartoes secao">
          <Card>
            <p className="etiqueta">Fase 1</p>
            <h2>Golpe ou seguro?</h2>
            <p>Leia cada situação e decida: é golpe ou é uma atitude segura?</p>
            <a className="botao" href="/quiz1">
              ▶ Jogar
            </a>
          </Card>

          <Card>
            <p className="etiqueta">Fase 2</p>
            <h2>Encontre os sinais</h2>
            <p>Toque nas palavras da mensagem que deveriam acender o alerta.</p>
            <a className="botao" href="/quiz2">
              ▶ Jogar
            </a>
          </Card>
        </ol>

        <Placar />
      </main>
    </>
  );
}
