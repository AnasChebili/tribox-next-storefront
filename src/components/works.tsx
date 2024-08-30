import WorkCard from "./ui/workcard";

export default function Works() {
  const works: Array<{
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
  ];
  return (
    <div className="flex flex-col items-center mx-[5%] my-24">
      <h1 className="text-5xl font-extralight">FEATURED WORKS</h1>
      <div className="my-12">
      <ul className=" hidden md:flex space-x-6  cursor-pointer">
        <li className="text-red-600 flex">
          {" "}
          <span className="mt-1 block">3</span>D Models
        </li>
        <li>Mockups</li>
        <li>Templates</li>
        <li>Audio Samples</li>
        <li>Photos</li>
        <li>Presentation Template</li>
        <li>Fonts</li>
      </ul>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-28">
        {works.map((work, index) => (
          <WorkCard
            image={work.image}
            rating={work.rating}
            title={work.title}
            date={work.date}
            author={work.author}
            tags={work.tags}
            description={work.description}
            id={index}
            key={index}
          ></WorkCard>
        ))}
      </div>
    </div>
  );
}
