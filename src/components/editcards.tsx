import { UUID } from "crypto";
import RecCard from "./ui/reccard";
import WorkCard from "./ui/workcard";
import Recskeleton from "./recskeleton";
import EditCard from "./ui/editcard";
import { RouterOutput } from "@/server";

export type categtype = RouterOutput["getProduct"];

export type categstype = {
  categs: categtype[];
};

export default function EditCards({ categs }: categstype) {
  return (
    <div>
      {!categs ? (
        <Recskeleton></Recskeleton>
      ) : (
        <div className="flex overflow-auto ml-[5%] space-x-6 pb-3 ">
          {categs.map((categ, index) => (
            <div key={categ.id} className="min-w-64 max-w-[250px]">
              <EditCard product={categ}></EditCard>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
