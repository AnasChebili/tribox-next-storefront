import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import NavSign from "./ui/navsign";
import {
  BookOpen,
  EditIcon,
  HouseIcon,
  SettingsIcon,
  ShoppingCartIcon,
  StoreIcon,
  UserIcon,
} from "lucide-react";

const links = [
  { name: "Home", link: "/", Icon: <HouseIcon /> },
  { name: "Store", link: "/store", Icon: <StoreIcon /> },
  { name: "About", link: "/about", Icon: <BookOpen /> },
  { name: "Cart", link: "/cart", Icon: <ShoppingCartIcon /> },
  { name: "Dashboard", link: "/dashboard", Icon: <EditIcon /> },
  { name: "Profile", link: "/dashboard/profile", Icon: <UserIcon /> },
  { name: "Settings", link: "/dashboard/settings", Icon: <SettingsIcon /> },
];

type AnyError =
  | {
      type: "error";
      error: Error;
    }
  | {
      type: "custom";
      message: string;
    };

const anyError: AnyError = { type: "custom", message: "" };

type NavbarProps =
  | { props: string; includeProps: never | true }
  | { includeProps: false };

export default function Navbar() {
  return (
    <header>
      <nav className=" hidden  navbar lg:flex justify-between mx-20 mt-8 ">
        <section>
          <Link href="/">
            <Image src="/logo.svg" alt="" width={70} height={45}></Image>
          </Link>
        </section>

        <section>
          <ul className="navllinks flex gap-12 items-center">
            <li>
              <Link href="/">Home</Link>{" "}
            </li>
            <li>
              <Link href="/store">Store</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/cart">
                <figure className="Cart flex">
                  <figcaption className="h-[50px] w-[70px] bg-black rounded-3xl leading-[48px] align-middle text-center cursor-pointer">
                    Cart
                  </figcaption>
                  <Image
                    src="/cart.svg"
                    alt=""
                    width={50}
                    height={50}
                    className="cursor-pointer"
                  ></Image>
                </figure>
              </Link>
            </li>
            <li>
              <NavSign></NavSign>
            </li>
          </ul>
        </section>
      </nav>

      <nav className="block lg:hidden w-full bg-black fixed top-0 z-10">
        <Sheet>
          <SheetTrigger aria-label="open navigation menu">
            <Image src="/menu.png" alt="" width={65} height={65}></Image>
          </SheetTrigger>
          <SheetContent side="left" className="w-full bg-black" icon="h-8 w-8">
            <ul className=" flex flex-col items-start h-full gap-8 text-2xl  p-5">
              {links.map((element, index) => (
                <li key={index}>
                  <SheetClose asChild>
                    <Link
                      href={element.link}
                      className="flex gap-2 items-center"
                    >
                      {element.Icon}
                      {element.name}
                    </Link>
                  </SheetClose>
                </li>
              ))}
            </ul>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
