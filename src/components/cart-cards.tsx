import RecCard from "./ui/reccard";
import { Database } from "../../database.types";
import CartCard from "./ui/cart-card";

type categtype = Database["public"]["Tables"]["products"]["Row"];

export type categstype = {
  categs: categtype[];
};

export default function CartCards({
  categs,
  removeCard,
}: {
  categs: categstype;
  removeCard: (id: string) => void;
}) {
  return (
    <div className="flex overflow-auto ml-[5%] space-x-6 pb-3 ">
      {categs.map((categ: categtype) => (
        <div key={categ.id} className="min-w-64 max-w-[250px]">
          <CartCard
            image={categ.image[0]}
            rating={categ.rating}
            title={categ.title}
            date={categ.date}
            author={categ.author}
            tags={categ.tags}
            description={categ.description}
            id={categ.id}
            removeCard={removeCard}
          ></CartCard>
        </div>
      ))}
    </div>
  );
}
