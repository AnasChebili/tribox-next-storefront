import { TRPCError } from "@trpc/server";
import { createClient } from "../../../utils/supabase/server";

export class ProductController {
  public static getImage(imageId: string) {
    const supabase = createClient();

    const { data } = supabase.storage.from("documents").getPublicUrl(imageId);

    return data.publicUrl;
  }
  public static async getProduct(productId: string) {
    const supabase = createClient();
    const { data: products, error } = await supabase
      .from("products")
      .select()
      .eq("id", productId);

    if (!products || error) throw error;

    if (products.length <= 0)
      throw new TRPCError({
        code: "NOT_FOUND",
      });

    const product = products[0];

    const promises = (product.image as string[]).map((supabaseImageUrl) =>
      ProductController.getImage(supabaseImageUrl)
    );
    product.image = await Promise.all(promises);
    product.file = ProductController.getImage(product.file);

    return product;
  }
}
