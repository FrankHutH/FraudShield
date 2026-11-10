import { notFound } from "next/navigation";
import golpes from "../../../data/golpes.json";
import "../../../styles/pages/golpes.css";

export function generateStaticParams() {
  return golpes.map((golpe) => ({ id: String(golpe.id) }));
}

export default async function Page({ params }) {
  const { id } = await params;
  const golpe = golpes.find((item) => String(item.id) === id);

  if (!golpe) notFound();

  return (
    <main>
      <header className="introducao">
        <h1>{golpe.titulo}</h1>
        <p>{golpe.tipo}</p>
      </header>
      <section className="painel">
        <h2>Como funciona</h2>
        <p>{golpe.exemplo}</p>
        <h2>Como se proteger</h2>
        <p>{golpe.orientacao}</p>
      </section>
      <a href="/golpes">Voltar para golpes</a>
    </main>
  );
}
