import situacoes from "../../../data/situacoes.json";

export async function GET() {
  return Response.json(situacoes);
}
