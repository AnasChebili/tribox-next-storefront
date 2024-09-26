import { UUID } from "crypto";
import RecCard from "./ui/reccard";
import Recskeleton from "./recskeleton";
import { RouterOutput } from "@/server";

export type categtype = {
  id: UUID;
  created_at: Date;
  image: string[];
  rating: number;
  title: string;
  date: string;
  author: string;
  tags: Array<string>;
  description: string;
};

export type categstype = {
  categs: categtype[];
};

export default function Recommendations({
  categs,
}: {
  categs: RouterOutput["getTodos"] | undefined;
}) {
  return (
    <div>
      {!categs ? (
        <Recskeleton></Recskeleton>
      ) : (
        <div className="flex overflow-auto ml-[5%] space-x-6 pb-3 ">
          {categs.map((categ, index) => (
            <div key={categ.id} className="min-w-64 max-w-[250px]">
              <RecCard product={categ}></RecCard>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
