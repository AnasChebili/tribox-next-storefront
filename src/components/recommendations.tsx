import RecCard from "./ui/reccard";
import WorkCard from "./ui/workcard";

type categtype = {
  id:string;
  created_at: Date;
  image: string;
  rating: string;
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
      <div className="flex overflow-auto ml-[5%] space-x-6 pb-3 ">
        {categs.map((categ, index) => (
          <div key={categ.id} className="min-w-64 max-w-[250px]">
            <RecCard 
              image={categ.image}
              rating={categ.rating}
              title={categ.title}
              date={categ.date}
              author={categ.author}
              tags={categ.tags}
              description={categ.description}
              id={index}
            ></RecCard>
          </div>
        ))}
      </div>
    </div>
  );
}
