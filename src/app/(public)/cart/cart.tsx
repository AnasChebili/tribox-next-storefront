"use client";
import { useEffect, useState } from "react";
import { Database } from "../../../../database.types";
import CartCards from "@/components/cart-cards";
import { RouterOutput } from "@/server";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import {
  addAlltoCart,
  addItemToCart,
  setTotalAmount,
} from "../../../store/cartSlice";
import { useRouter } from "next/navigation";
import { RootState } from "@/store/store";
import { trpc } from "@/app/_trpc/client";
import { Spinner } from "@/components/ui/spinner";

type productType = Database["public"]["Tables"]["products"]["Row"];

const Cart = ({ toPaymentBool }: { toPaymentBool: boolean }) => {
  const { data: authUser } = trpc.getAuthUser.useQuery();
  const [cartItems, setCartItems] = useState<RouterOutput["getTodos"]>(() => {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  });
  const selector = useSelector((state: RootState) => state.cart.totalAmount);
  const [total, setTotal] = useState(
    cartItems.reduce(
      (sum: number, product: productType) => sum + product.price,
      0
    )
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const totalAmount = cartItems.reduce(
      (sum: number, product: productType) => sum + product.price,
      0
    );
    setTotal(totalAmount);
    if (toPaymentBool) checkOut();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems, toPaymentBool]);

  const removeCard = (id: string) => {
    const cart = cartItems.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success("removed from cart");
    setCartItems(cart);
  };

  const clearAll = () => {
    localStorage.setItem("cart", JSON.stringify([]));
    setCartItems([]);
  };
  const dispatch = useDispatch();
  const router = useRouter();

  const placeOrderMutation = trpc.placeOrder.useMutation();
  const checkOut = () => {
    if (authUser) {
      dispatch(setTotalAmount(total));
      dispatch(addAlltoCart(cartItems));
      setIsLoading(true);
      placeOrderMutation.mutate(
        {
          items: cartItems.map((cartItem) => cartItem.id),
          amount: total,
        },
        {
          onSuccess: (data) => {
            router.push(
              `/payment?clientSecret=${data.clientSecret}&order=${data.order}`
            );
          },
          onError: (error) => {
            setIsLoading(false);
            toast.error(`Error adding order:${error}`);
          },
        }
      );
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="py-10 min-h-screen flex flex-col justify-center">
      <div className="mx-[5%]">
        <h1 className=" text-4xl font-bold">Your Cart</h1>
        <p className="mt-2 font-light">
          Here are the products added to your Cart
        </p>
      </div>
      <div className="mt-8">
        {cartItems.length === 0 ? (
          <div className="mx-[5%] bg-gray-700 bg-opacity-50 p-5 rounded-lg">
            <p className=" text-2xl font-bold">Your cart is empty.</p>
            <p className="mt-2 font-light">
              Add a product to your Cart to see it here!
            </p>
          </div>
        ) : (
          <>
            <div>
              <CartCards categs={cartItems} removeCard={removeCard}></CartCards>
            </div>
            <div className="mx-[5%] mt-8">
              <button
                className="bg-transparent rounded-lg border-2 text-xl font-bold w-40 py-3"
                onClick={clearAll}
              >
                Clear All
              </button>
              <div className="mt-8 flex gap-6 items-center">
                <button
                  disabled={isLoading}
                  className="bg-green-900 rounded-lg text-xl font-bold w-40 py-3 flex items-center gap-2 justify-center disabled:opacity-50"
                  onClick={checkOut}
                >
                  <p>Check Out</p>

                  <Spinner
                    className={!isLoading ? "hidden" : "w-6 h-6 text-white"}
                  ></Spinner>
                </button>
                <h2 className="text-2xl font-bold ">
                  Total: ${total.toFixed(2)}
                </h2>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
