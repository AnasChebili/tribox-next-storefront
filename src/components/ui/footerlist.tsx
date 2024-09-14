import Link from "next/link";

export default function FooterList({ children }: { children: Array<string> }) {
  return (
    <div>
      <h3 className="text-grayf text-sm sm:text-[18px] mb-8">{children[0]}</h3>
      <ul>
        {children.slice(1).map((child, index) => (
          <li
            key={index}
            className=" text-xs sm:text-[17px] mb-1 font-light cursor-pointer"
          >
            <Link href="/coming-soon">{child}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
