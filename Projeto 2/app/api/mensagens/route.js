import mensagens from "../../../data/mensagens.json";

export async function GET() {
  return Response.json(mensagens);
}
