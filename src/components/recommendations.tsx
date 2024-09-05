import { UUID } from "crypto";
import RecCard from "./ui/reccard";
import WorkCard from "./ui/workcard";
import Recskeleton from "./recskeleton";

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

export default function Recommendations({ categs }: categstype) {
  return (
    <div>
      {!categs ? (
        <Recskeleton></Recskeleton>
      ) : (
        <div className="flex overflow-auto ml-[5%] space-x-6 pb-3 ">
          {categs.map((categ, index) => (
            <div key={categ.id} className="min-w-64 max-w-[250px]">
              <RecCard
                image={categ.image[0]}
                rating={categ.rating}
                title={categ.title}
                date={categ.date}
                author={categ.author}
                tags={categ.tags}
                description={categ.description}
                id={categ.id}
              ></RecCard>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
