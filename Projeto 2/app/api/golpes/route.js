import golpes from "../../../data/golpes.json";

export async function GET() {
  return Response.json(golpes);
}
