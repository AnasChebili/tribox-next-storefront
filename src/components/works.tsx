"use client";
import { trpc } from "@/app/_trpc/client";
import WorkCard from "./ui/workcard";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Categories from "./categories";

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
}: {
  initialFilter: string;
}) {
  /* const works: Array<{
    image: string;
    rating: string;
    title: string;
    date: string;
    author: string;
    tags: Array<string>;
    description: string;
  }> = [
    {
      image: "/work1.png",
      rating: "4.3",
      title: "Makeup 3D Model",
      date: "6/14/2024",
      author: "Abbas Raza",
      tags: ["Mockup", "Template"],
      description:
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      image: "/work2.png",
      rating: "4.3",
      title: "Q-Box 3D Model Al...",
      date: "6/14/2024",
      author: "Abbas Raza",
      tags: ["Mockup", "Template"],
      description:
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      image: "/work3.png",
      rating: "4.3",
      title: "Beads in a Box",
      date: "6/14/2024",
      author: "Abbas Raza",
      tags: ["Mockup", "Template"],
      description:
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      image: "/work4.png",
      rating: "4.3",
      title: "Beads in a Box",
      date: "6/14/2024",
      author: "Abbas Raza",
      tags: ["Mockup", "Template"],
      description:
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      image: "/work5.png",
      rating: "4.3",
      title: "Beads in a Box",
      date: "6/14/2024",
      author: "Abbas Raza",
      tags: ["Mockup", "Template"],
      description:
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      image: "/work6.png",
      rating: "4.3",
      title: "Beads in a Box",
      date: "6/14/2024",
      author: "Abbas Raza",
      tags: ["Mockup", "Template"],
      description:
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      image: "/work1.png",
      rating: "4.3",
      title: "Beads in a Box",
      date: "6/14/2024",
      author: "Abbas Raza",
      tags: ["Mockup", "Template"],
      description:
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      image: "/work2.png",
      rating: "4.3",
      title: "Beads in a Box",
      date: "6/14/2024",
      author: "Abbas Raza",
      tags: ["Mockup", "Template"],
      description:
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      image: "/work3.png",
      rating: "4.3",
      title: "Beads in a Box",
      date: "6/14/2024",
      author: "Abbas Raza",
      tags: ["Mockup", "Template"],
      description:
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
  ]; */

  /*  const worksObj = trpc.getTodos.useQuery();
  const works = worksObj.data; */

  const [filter, setFilter] = useState(initialFilter);
  console.log("filter", filter);

  const { data: works } = trpc.filterByTag.useQuery(filter);

  const filterSelects = [
    { title: "3D Models", key: "3d-models" },
    { title: "Mockups", key: "mockups" },
    { title: "Templates", key: "templates" },
    { title: "Audio Samples", key: "audio-samples" },
    { title: "Photos", key: "photos" },
    { title: "Presentation Template", key: "presentation-template" },
    { title: "Fonts", key: "fonts" },
  ];

  return (
    <div className="flex flex-col items-center ">
      <div className="my-12">
        <ul className=" hidden md:flex space-x-6  cursor-pointer">
          <li
            className={cn({ "text-red-600 flex": filter === "" })}
            onClick={() => {
              setFilter("");
            }}
          >
            All
          </li>
          {filterSelects.map((element, index) => (
            <div
              key={index}
              onClick={() => {
                setFilter(element.title);
              }}
            >
              <FilterSelect
                title={element.title}
                isSelected={element.title === filter}
              ></FilterSelect>
            </div>
          ))}
        </ul>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-28">
        {works &&
          works.map((work, index) => (
            <WorkCard
              image={work.image}
              rating={work.rating}
              title={work.title}
              date={work.date}
              author={work.author}
              tags={work.tags}
              description={work.description}
              id={work.id}
              key={work.id}
            ></WorkCard>
          ))}
      </div>
    </div>
  );
}
