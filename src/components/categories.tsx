import Link from "next/link";
import tagsTable from "@/data/tags-table.json";

export default function Categories() {
  const categs: Array<{
    image: string;
    title: string;
    description: string;
  }> = [
    {
      image: "/categ1.png",
      title: "3D Models",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industr",
    },
    {
      image: "/categ2.png",
      title: "Mockups",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industr",
    },
    {
      image: "/categ3.png",
      title: "Photos",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industr",
    },
    {
      image: "/categ1.png",
      title: "Audio Samples",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industr",
    },
    {
      image: "/categ2.png",
      title: "3D Models",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industr",
    },
    {
      image: "/categ1.png",
      title: "Mockups",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industr",
    },
    {
      image: "/categ3.png",
      title: "Photos",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industr",
    },
    {
      image: "/categ1.png",
      title: "Audio Samples",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industr",
    },
  ];
  return (
    <div className="flex overflow-auto ml-[5%] space-x-6 no-scrollbar pb-3">
      {categs.map((categ, index) => (
        <Link
          href={{
            pathname: "/",
            query: {
              category: tagsTable.find((tag) => tag.title === categ.title)?.key,
            },
          }}
          key={index}
          className=" relative min-w-64 min-h-56 bg-no-repeat bg-cover bg-center rounded-2xl cursor-pointer"
          style={{ backgroundImage: `url(${categ.image})` }}
        >
          <div className="absolute bottom-0 left-0 ml-3 mb-7">
            <h1 className="text-2xl font-bold">{categ.title}</h1>
            <p className="text-sm w-3/4">{categ.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
