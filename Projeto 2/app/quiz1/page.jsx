import CarregadorJogo from "../../components/CarregadorJogo";
export const metadata = { title: "Golpe ou seguro? | FraudShield" };
export default function Page() {
  return (
    <main>
      <a className="voltar" href="/quiz">
        ← Voltar aos jogos
      </a>
      <header className="introducao">
        <p className="etiqueta">Fase 1</p>
        <h1>Golpe ou seguro?</h1>
        <p>
          Toque numa situação e escolha a caixa certa. Também dá para arrastar o
          cartão até a caixa.
        </p>
      </header>
      <CarregadorJogo url="/api/situacoes" tipo="situacoes" />
    </main>
  );
}
