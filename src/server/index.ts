import { createClient } from "../../utils/supabase/server";
import {
  adminProcedure,
  privateProcedure,
  publicProcedure,
  router,
  trpcServer,
} from "./trpc";
import { z } from "zod";
import { inferRouterInputs, inferRouterOutputs, TRPCError } from "@trpc/server";
import { cookies } from "next/headers";

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

const UpdateSchema = z.object({
  id: z.string().uuid(),
  data: z.object({
    image: z.array(z.string()).optional(),
    title: z.string().optional(),
    tags: z.array(z.string()).optional(),
    description: z.string().optional(),
  }),
});

const UserUpdateSchema = z.object({
  id: z.string().uuid(),
  data: z.object({
    username: z.string(),
    image: z.string().optional(),
    email: z.string(),
    name: z.string(),
    bio: z.string().optional(),
  }),
});

const addOrderSchema = z.object({
  items: z.array(z.string().uuid()),
  amount: z.number(),
});

const UserAddSchema = z.object({
  id: z.string().uuid(),
  username: z.string(),
  email: z.string(),
  name: z.string(),
  image: z.string().optional(),
  bio: z.string().optional(),
});

export const appRouter = router({
  getTodos: privateProcedure.query(async ({ ctx }) => {
    const supabase = createClient();
    const { data: products, error } = await supabase.from("products").select();

    if (!products || error) {
      throw error;
    }

    const promises = products.map(async (product, index) => {
      const promises = (product.image as string[]).map((supabaseImageUrl) =>
        trpcServer.getImage.query(supabaseImageUrl)
      );
      product.image = await Promise.all(promises);
      return product;
    });
    const transformedProducts = await Promise.all(promises);

    return products;
  }),
  addTodo: publicProcedure.input(todoSchema).mutation(async ({ input }) => {
    const supabase = createClient();
    const { error } = await supabase.from("products").insert([
      {
        created_at: input.created_at.toString(),
        price: 0,
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
    .query(async ({ input }) => {
      console.log(input);

      const supabase = createClient();
      const { data: products, error } = await supabase
        .from("products")
        .select()
        .eq("id", input);

      if (!products || error) throw error;

      if (products.length <= 0)
        throw new TRPCError({
          code: "NOT_FOUND",
        });

      const product = products[0];
      console.log("product", product);

      const promises = (product.image as string[]).map((supabaseImageUrl) =>
        trpcServer.getImage.query(supabaseImageUrl)
      );
      product.image = await Promise.all(promises);

      return product;
    }),
  deleteProduct: publicProcedure
    .input(z.string().uuid())
    .mutation(async ({ input }) => {
      const supabase = createClient();
      const response = await supabase.from("products").delete().eq("id", input);
      console.log(response);
    }),
  updateProduct: publicProcedure
    .input(UpdateSchema)
    .mutation(async ({ input }) => {
      const supabase = createClient();
      const { error } = await supabase
        .from("products")
        .update(input.data)
        .eq("id", input.id);
    }),
  getUser: publicProcedure.input(z.string().uuid()).query(async ({ input }) => {
    const supabase = createClient();
    const { data: user } = await supabase
      .from("users")
      .select()
      .eq("id", input);

    if (!user || user.length <= 0) return undefined;

    user[0].image = await trpcServer.getImage.query(user[0].image);

    return user[0];
  }),
  // getAuthUser: privateProcedure.query(async ({ ctx }) => ctx),
  getAuthUser: adminProcedure.query(async ({ ctx }) => {
    // Access the validated user from ctx
    const user = ctx.user;

    // Perform some admin task
    return { success: true, user };
  }),
  getImage: publicProcedure.input(z.string()).query(async ({ input }) => {
    const supabase = createClient();

    const { data } = supabase.storage.from("documents").getPublicUrl(input);

    return data.publicUrl;
  }),
  updateUser: publicProcedure
    .input(UserUpdateSchema)
    .mutation(async ({ input }) => {
      const supabase = createClient();
      const { error } = await supabase
        .from("users")
        .update(input.data)
        .eq("id", input.id);
    }),
  logout: publicProcedure.mutation(async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error.message);
      throw new Error("error logging out");
    }
    return { success: true };
  }),
  getUsers: publicProcedure.query(async () => {
    const supabase = createClient();
    const { data: users } = await supabase.from("users").select();
    console.log("data");

    console.log(users);

    return users;
  }),
  filterByTag: publicProcedure.input(z.string()).query(async ({ input }) => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .contains("tags", [input]);
    if (error) {
      console.log(error);
    }
    return data;
  }),
  addUser: publicProcedure.input(UserAddSchema).mutation(async ({ input }) => {
    const supabase = createClient();
    const { error } = await supabase.from("users").insert([input]);
    if (error) console.log("error adding userrr", error);
  }),
  addOrder: publicProcedure
    .input(addOrderSchema)
    .mutation(async ({ input }) => {
      const supabase = createClient();
      const { error } = await supabase.from("orders").insert([input]);
      if (error) console.log("error adding order", error);
    }),
});

export type AppRouter = typeof appRouter;

export type RouterOutput = inferRouterOutputs<AppRouter>;
export type RouterInput = inferRouterInputs<AppRouter>;
