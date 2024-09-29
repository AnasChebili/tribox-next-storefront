import { createClient } from "../../utils/supabase/server";
import {
  adminProcedure,
  createCallerFactory,
  publicProcedure,
  router,
} from "./trpc";
import { z } from "zod";
import { inferRouterInputs, inferRouterOutputs, TRPCError } from "@trpc/server";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { Database } from "../../database.types";
import { error } from "console";
import { ProductController } from "./controllers/product-controller";
import { PaymentController } from "./controllers/payment-controller";

const todoSchema = z.object({
  image: z.array(z.string()),
  rating: z.number(),
  title: z.string(),
  author: z.string(),
  tags: z.array(z.string()),
  formats: z.array(z.string()),
  software: z.array(z.string()),
  shapes: z.array(z.string()),
  assets: z.array(z.string()),
  description: z.string(),
  price: z.number(),
  author_id: z.string().uuid(),
  file: z.string(),
});

const UpdateSchema = z.object({
  id: z.string().uuid(),
  data: z.object({
    image: z.array(z.string()),
    rating: z.number(),
    title: z.string(),
    author: z.string(),
    tags: z.array(z.string()),
    formats: z.array(z.string()),
    software: z.array(z.string()),
    shapes: z.array(z.string()),
    assets: z.array(z.string()),
    description: z.string(),
    price: z.number(),
    file: z.string(),
  }),
});

const UserUpdateSchema = z.object({
  id: z.string().uuid(),
  data: z.object({
    username: z.string(),
    image: z.string().optional(),
    email: z.string(),
    name: z.string().optional(),
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
  name: z.string().optional(),
  image: z.string().optional(),
  bio: z.string().optional(),
});

export const appRouter = router({
  getTodos: adminProcedure.query(async ({ ctx }) => {
    const supabase = createClient();
    const { data: products, error } = await supabase.from("products").select();

    if (!products || error) {
      throw error;
    }

    const promises = products.map(async (product, index) => {
      const promises = (product.image as string[]).map((supabaseImageUrl) =>
        ProductController.getImage(supabaseImageUrl)
      );
      product.image = await Promise.all(promises);
      product.file = await ProductController.getImage(product.file);
      return product;
    });
    const transformedProducts = await Promise.all(promises);

    return transformedProducts;
  }),
  addTodo: publicProcedure.input(todoSchema).mutation(async ({ input }) => {
    const supabase = createClient();
    const { error } = await supabase.from("products").insert([input]);

    if (error) throw error;

    return { success: true };
  }),
  getProductsOfUser: publicProcedure
    .input(z.string().uuid())
    .query(async ({ input }) => {
      const supabase = createClient();
      const { data: products, error } = await supabase
        .from("products")
        .select()
        .eq("author_id", input);

      if (!products || error) {
        throw error;
      }

      const promises = products.map(async (product, index) => {
        const promises = (product.image as string[]).map((supabaseImageUrl) =>
          ProductController.getImage(supabaseImageUrl)
        );
        product.image = await Promise.all(promises);
        product.file = await ProductController.getImage(product.file);
        return product;
      });
      const transformedProducts = await Promise.all(promises);

      return transformedProducts;
    }),
  getProduct: publicProcedure
    .input(z.string().uuid())
    .query(async ({ input }) => {
      return ProductController.getProduct(input);
    }),
  deleteProduct: publicProcedure
    .input(z.string().uuid())
    .mutation(async ({ input }) => {
      const supabase = createClient();
      const response = await supabase.from("products").delete().eq("id", input);
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
    if (user[0].image != "")
      user[0].image = await ProductController.getImage(user[0].image);

    return user[0];
  }),
  getAuthUser: adminProcedure.query(async ({ ctx }) => {
    // Access the validated user from ctx
    const user = ctx.user;

    // Perform some admin task
    return { success: true, user };
  }),
  getImage: publicProcedure.input(z.string()).query(async ({ input }) => {
    return ProductController.getImage(input);
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

    if (!users) throw error;
    const promises = users.map(async (user, index) => {
      if (user.image !== "")
        user.image = await ProductController.getImage(user.image);
      return user;
    });
    const transformedUsers = await Promise.all(promises);
    return transformedUsers;
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
  filterByTagAndUser: publicProcedure
    .input(z.object({ filter: z.string(), user: z.string() }))
    .query(async ({ input }) => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .contains("tags", [input.filter])
        .eq("author_id", input.user);
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
  placeOrder: publicProcedure
    .input(addOrderSchema)
    .mutation(async ({ input }): Promise<any> => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("orders")
        .insert([{ items: input.items }])
        .select();
      if (error) console.log(error);

      const res = await PaymentController.createPaymentIntent(input.amount);

      return {
        order: data ? data[0].id : undefined,

        clientSecret: res.clientSecret ? res.clientSecret : res.error,
      };
    }),
  getOrder: publicProcedure
    .input(z.object({ orderId: z.string().uuid() }))
    .query(async ({ input }) => {
      const supabase = createClient();
      const { data: order } = await supabase
        .from("orders")
        .select()
        .eq("id", input.orderId);

      if (!order || order.length <= 0) return undefined;

      const { data: items, error } = await supabase
        .from("products")
        .select("*")
        //@ts-expect-error
        .in("id", order[0].items);
      type Order = Omit<Database["public"]["Tables"]["orders"]["Row"], "items">;

      type OrderWithPopulatedProducts = Order & {
        items: Database["public"]["Tables"]["products"]["Row"][] | null;
      };

      const transformedOrder: OrderWithPopulatedProducts = {
        ...order[0],
        items,
      };
      if (!transformedOrder.items) return transformedOrder;
      const promises = transformedOrder.items.map(async (item, index) => {
        const promises = (item.image as string[]).map((supabaseImageUrl) =>
          ProductController.getImage(supabaseImageUrl)
        );
        item.image = await Promise.all(promises);
        item.file = await ProductController.getImage(item.file);
        return item;
      });
      const transformedProducts = await Promise.all(promises);

      return transformedOrder;
    }),
  createPaymentIntent: publicProcedure
    .input(z.number())
    .query(async ({ input }) => {
      return PaymentController.createPaymentIntent(input);
    }),
  addRating: publicProcedure
    .input(
      z.object({
        rating: z.number(),
        product: z.string().uuid(),
        userId: z.string().uuid(),
      })
    )
    .mutation(async ({ input }) => {
      const supabase = createClient();
      const product = await ProductController.getProduct(input.product);
      const ratingInfo = product.rating_info;

      if (ratingInfo === null) {
        const { data } = await supabase
          .from("products")
          .update({
            rating_info: [{ rating: input.rating, user_id: input.userId }],
            rating: input.rating,
          })
          .eq("id", input.product);
        return;
      }
      if (ratingInfo.some((element) => element.user_id === input.userId)) {
        const index = ratingInfo.findIndex(
          (element) => element.user_id === input.userId
        );
        ratingInfo[index].rating = input.rating;
        const { data } = await supabase
          .from("products")
          .update({
            rating_info: ratingInfo,
            rating: ratingInfo.reduce(
              (sum: number, element) =>
                (sum = sum + (element.rating || 0) / ratingInfo.length),
              0
            ),
          })
          .eq("id", input.product);
        return;
      }
      ratingInfo.push({ rating: input.rating, user_id: input.userId });
      const { data } = await supabase
        .from("products")
        .update({
          rating_info: ratingInfo,
          rating:
            (product.rating * (ratingInfo.length - 1) + input.rating) /
            ratingInfo.length,
        })
        .eq("id", input.product);
    }),
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);

export type RouterOutput = inferRouterOutputs<AppRouter>;
export type RouterInput = inferRouterInputs<AppRouter>;
