import CarregadorJogo from "../../components/CarregadorJogo";
import "../../styles/pages/quiz1.css";

export const metadata = {
  title: "Golpe ou seguro? | FraudShield",
  description: "Jogo: decida se cada situação é golpe ou atitude segura."
};

export default function Page() {
  return (
    <main>
      <a className="voltar" href="/quiz">← Voltar aos jogos</a>
      <header className="introducao">
        <p className="etiqueta">Fase 1</p>
        <h1>Golpe ou seguro?</h1>
        <p>Toque numa situação e escolha a caixa certa. Também dá para arrastar o cartão até a caixa.</p>
      </header>
      <CarregadorJogo tipo="situacoes" />
    </main>
  );
}
