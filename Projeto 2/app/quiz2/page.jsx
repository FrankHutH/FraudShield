import CarregadorJogo from "../../components/CarregadorJogo";
import JogoMensagens from "../../components/JogoMensagens";
import "../../styles/pages/quiz2.css";
export const metadata = { title: "Encontre os sinais | FraudShield" };
export default function Page() { return <main>
  <a className="voltar" href="/quiz">← Voltar aos jogos</a>
  <header className="introducao"><p className="etiqueta">Fase 2</p><h1>Encontre os sinais</h1><p>Toque nas palavras que deveriam acender o alerta. Se a mensagem parecer limpa, verifique sem marcar nada.</p></header>
  <CarregadorJogo url="/api/mensagens" Componente={JogoMensagens}/>
</main>; }
