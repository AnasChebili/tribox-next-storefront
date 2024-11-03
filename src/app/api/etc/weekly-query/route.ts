import { createClient } from "../../../../../utils/supabase/server";

export async function GET() {
  const supabase = createClient();
  const { data: products, error } = await supabase.from("products").select();
  if (error) {
    return Response.json({
      status: 500,
      body: { message: "Internal Server Error" },
    });
  }
  return Response.json({ status: 200, body: products });
}
