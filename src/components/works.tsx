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
  return <li className={cn({ "text-red-600 flex": isSelected })}>{title}</li>;
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
      <div className="my-12">
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
            <div
              key={index}
              onClick={() => {
                setFilter(element.key);
              }}
            >
              <FilterSelect
                title={element.title}
                isSelected={element.key === filter}
              ></FilterSelect>
            </div>
          ))}
        </ul>
      </div>
      <div className="min-h-[400px] flex items-center">
        {works ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-28">
            {works.map((work, index) => (
              <WorkCard key={index} product={work}></WorkCard>
            ))}
          </div>
        ) : (
          <Spinner className="text-white h-10 w-10"></Spinner>
        )}
      </div>
    </div>
  );
}
