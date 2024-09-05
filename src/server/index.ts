import { createClient } from "../../utils/supabase/server";
import { publicProcedure, router } from "./trpc";
import { z } from "zod";

const todoSchema = z.object({
  
  created_at: z.coerce.date(),
  image: z.array(z.string()),
  rating: z.number(),
  title: z.string(),
  date: z.string(),
  author: z.string(),
  tags: z.array(z.string()),
  description: z.string(),
});

export const appRouter = router({
  getTodos: publicProcedure.query(async () => {
    const supabase = createClient();
    const { data: products } = await supabase.from("products").select();
    console.log("data");

    console.log(products);

    return products;
  }),
  addTodo: publicProcedure.input(todoSchema).mutation(async ({ input }) => {
    const supabase = createClient();
    const { error } = await supabase.from("products").insert([
      {
        
        created_at: input.created_at,
        image: input.image,
        rating: input.rating,
        title: input.title,
        date: input.date,
        author: input.author,
        tags: input.tags,
        description: input.description,
      },
    ]);

    if (error) {
      console.error("Error inserting row:", error.message);
      throw new Error("Failed to add todo");
    }

    return { success: true };
  }),
  getProduct: publicProcedure
  .input(z.string().uuid())
  .query(async ({input}) => {
    console.log(input);
    
    const supabase = createClient();
    const { data: product } = await supabase.from("products").select().eq('id', input);
    console.log("data");

    console.log(product);

    return product
})
});

export type AppRouter = typeof appRouter;
