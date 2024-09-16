"use client";
import { useEffect, useState } from "react";
import { Database } from "../../../../database.types";
import CartCards from "@/components/cart-cards";
import { RouterOutput } from "@/server";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setTotalAmount } from "../../../store/cartSlice";
import { useRouter } from "next/navigation";

type productType = Database["public"]["Tables"]["products"]["Row"];

const Cart = () => {
  const [cartItems, setCartItems] = useState(() => {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  });
  const selector = useSelector((state) => state.cart.totalAmount);
  const [total, setTotal] = useState(selector);

  useEffect(() => {
    const totalAmount = cartItems.reduce(
      (sum: number, product: productType) => sum + product.price,
      0
    );
    setTotal(totalAmount);
  }, [cartItems]);

  const removeCard = (id: string) => {
    console.log(cartItems);

    const cart = cartItems.filter(
      (item: RouterOutput["getProduct"]) => item.id !== id
    );

    console.log(cart);

    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success("removed from cart");
    setCartItems(cart);
  };

  const clearAll = () => {
    localStorage.setItem("cart", JSON.stringify([]));
    setCartItems([]);
  };
  const dispatch = useDispatch();
  console.log(selector);
  const router = useRouter();

  const checkOut = () => {
    dispatch(setTotalAmount(total));
    router.push("/payment");
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
                  className="bg-green-900 rounded-lg text-xl font-bold w-40 py-3"
                  onClick={checkOut}
                >
                  Check Out
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
