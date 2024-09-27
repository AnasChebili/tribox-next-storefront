"use client";
import { trpc } from "@/app/_trpc/client";
import { RouterOutput } from "@/server";
import { getQueryKey } from "@trpc/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Rating(props: {
  product: RouterOutput["getProduct"];
  user: RouterOutput["getUser"];
}) {
  const router = useRouter();
  const utils = trpc.useUtils();
  const [rating, setRating] = useState(0);
  const addRatingMutation = trpc.addRating.useMutation({
    onSuccess: (data) => {},
    onError: (error) => {
      console.log("error adding rating");
    },
  });
  useEffect(() => {
    if (props.user && props.product && props.product.rating_info) {
      const userRating = props.product.rating_info.find(
        (element) => element.user_id === props.user?.id
      );
      if (userRating) setRating(userRating.rating || 0);
    }
  }, [props.user, props.product]);

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    if (props.user) {
      addRatingMutation.mutate({
        rating: newRating,
        product: props.product.id,
        userId: props.user.id,
      });
      utils.invalidate(undefined, { queryKey: getQueryKey(trpc.getProduct) });
    } else router.push("/login");
  };

  return (
    <div className="flex items-center gap-5 cursor-pointer">
      {[1, 2, 3, 4, 5].map((star) => (
        <StarIcon
          key={star}
          className={`w-14
             h-14 ${
               star <= rating
                 ? "fill-yellow-600"
                 : "fill-transparent stroke-muted-foreground"
             }`}
          onClick={() => handleRatingChange(star)}
        />
      ))}
    </div>
  );
}

function StarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
