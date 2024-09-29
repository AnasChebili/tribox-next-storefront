"use client";
import Carousel from "@/components/carousel";
import ProductDescription from "@/components/product-description";
import ProductFormats from "@/components/product-formats";
import Recommendations from "@/components/recommendations";
import Image from "next/image";
import { FC, useState } from "react";
import { trpc } from "@/app/_trpc/client";
import { RouterOutput } from "@/server";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const shapesTable = [
  {
    image: "/brutalist1.png",
    title: "Polygons",
    key: "polygons",
    desc: "784,570",
  },
  {
    image: "/brutalist2.png",
    title: "Vertices",
    key: "vertices",
    desc: "784,570",
  },
  {
    image: "/brutalist3.png",
    title: "Geometry",
    key: "geometry",
    desc: "Tris/Quads",
  },
];

const assetsTable = [
  { image: "/brutalist4.png", title: "Textures", key: "textures" },
  { image: "/brutalist5.png", title: "UVs", key: "uvs" },
  { image: "/brutalist6.png", title: "Brushes", key: "brushes" },
];

export const ProductListingPage: FC<{
  productId: string;
}> = ({ productId }) => {
  const router = useRouter();
  const { data } = trpc.getProduct.useQuery(productId);
  const product = data!;

  const { data: products } = trpc.getTodos.useQuery();
  const { data: authUser, error: authUserError } = trpc.getAuthUser.useQuery();
  const userId: string | undefined = authUser?.success
    ? authUser.user.id
    : undefined;
  const { data: user } = trpc.getUser.useQuery(userId!, { enabled: !!userId });

  const [cartCount, setCartCount] = useState(
    JSON.parse(localStorage.getItem("cart") || "[]").length
  );

  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (
      cart.some((item: RouterOutput["getProduct"]) => item.id === product.id)
    ) {
      toast.error("Product is already added to your cart");
    } else {
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
      toast.success("added");
      setCartCount(JSON.parse(localStorage.getItem("cart") || "[]").length);
    }
  };
  const addToPayment = (free: boolean) => {
    if (
      (user &&
        user.bought_products.find(
          (boughtProduct) => boughtProduct === product.id
        )) ||
      free
    ) {
      const downloadFile = async (product: RouterOutput["getProduct"]) => {
        const response = await fetch(product.image[0]);
        const blob = await response.blob();
        const link = document.createElement("a");
        const objectUrl = URL.createObjectURL(blob);
        link.href = objectUrl;
        link.download = `${product.title}.png`;
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(objectUrl);
        document.body.removeChild(link);
      };
      downloadFile(product);
    } else {
      localStorage.setItem("cart", JSON.stringify(Array(product)));
      router.push("/cart?toPayment=true");
    }
  };

  const prod: {
    formats: string[];
    ID: string;
    softwares: string[];
    shapes: { image: string; title: string; key: string; desc: string }[];
    assets: { image: string; title: string; key: string }[];
  } = {
    formats: product.formats,
    ID: product.id,
    softwares: product.software,
    shapes: product.shapes.map((element) => {
      return shapesTable.find(($element) => $element.key === element)!;
    }),
    assets: product.assets.map((element) => {
      return assetsTable.find(($element) => $element.key === element)!;
    }),
  };
  return (
    <div className="mb-28">
      <div>
        <div className="mx-[5%] mt-20">
          <div className="flex   space-x-4 items-center">
            <div className=" shadow cursor-pointer shadow-white w-9 h-9 rounded-full bg-white flex items-center">
              <Image
                src="/left.png"
                alt=""
                width={20}
                height={20}
                className="m-auto"
              ></Image>
            </div>
            <h1 className="text-3xl tracking-widest">Back</h1>
          </div>
          <p className="text-2xl mt-5">
            Home/Categories/3D-Model/{product.title}
          </p>
        </div>
        <div className="mx-[5%] mt-10">
          <Carousel images={product.image as string[]}></Carousel>
        </div>
        <div className="flex flex-col xl:flex-row xl:justify-between mx-[5%] justify-center align-center ">
          <ProductDescription
            addToCart={addToCart}
            addToPayment={addToPayment}
            product={product}
            user={user}
            cartCount={cartCount}
          ></ProductDescription>
          <div className="w-full xl:w-[47.5%] h-full">
            <ProductFormats
              formats={prod.formats}
              ID={prod.ID}
              softwares={prod.softwares}
              shapes={prod.shapes}
              assets={prod.assets}
            ></ProductFormats>
            <div className="hidden sm:flex space-x-3 mt-12">
              <Image src="/barcode.png" alt="" width={345} height={154}></Image>
              <Image src="/qrcode.png" alt="" width={154} height={154}></Image>
              <Image src="/recycle.png" alt="" width={179} height={154}></Image>
            </div>
          </div>
        </div>

        <div className="my-11  ml-[5%]">
          <h1 className="text-4xl font-bold ">Stuff You Might Like</h1>
          <p className="mt-2 font-light">Personally Picked from your taste.</p>
        </div>
        <Recommendations categs={products}></Recommendations>
      </div>
    </div>
  );
};
