"use client";
import { trpc } from "@/app/_trpc/client";
import WorkCard from "./ui/workcard";
import { useState } from "react";
import { cn } from "@/lib/utils";
import tagsTable from "@/data/tags-table.json";
import { Spinner } from "./ui/spinner";

const FilterSelect = ({
  title,
  isSelected,
}: {
  title: string;
  isSelected: boolean;
}) => {
  return (
    <span className={cn({ "text-red-600 flex": isSelected })}>{title}</span>
  );
};

export default function Works({
  initialFilter = "",
  user,
}: {
  initialFilter: string;
  user: string | undefined;
}) {
  const [filter, setFilter] = useState(initialFilter);
  let works;
  if (user) {
    works = trpc.filterByTagAndUser.useQuery(
      {
        filter: filter,
        user: user,
      },
      { enabled: !!user }
    ).data;
  } else {
    works = trpc.filterByTag.useQuery(filter).data;
  }

  return (
    <div className="flex flex-col items-center ">
      <header className="my-12">
        <ul className=" hidden md:flex space-x-6 text-sm  cursor-pointer">
          <li
            className={cn({ "text-red-600 flex": filter === "" })}
            onClick={() => {
              setFilter("");
            }}
          >
            All
          </li>
          {tagsTable.map((element, index) => (
            <li
              key={index}
              onClick={() => {
                setFilter(element.key);
              }}
            >
              <FilterSelect
                title={element.title}
                isSelected={element.key === filter}
              ></FilterSelect>
            </li>
          ))}
        </ul>
      </header>
      {works ? (
        <section className="min-h-[400px] items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-28">
          {works.map((work, index) => (
            <WorkCard key={index} product={work}></WorkCard>
          ))}
        </section>
      ) : (
        <Spinner className="text-white h-10 w-10"></Spinner>
      )}
    </div>
  );
}
