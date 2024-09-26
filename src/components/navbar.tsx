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
export default function Navbar() {
  return (
    <div className="">
      <div className=" hidden  navbar lg:flex justify-between mx-20 mt-8 ">
        <Link href="/">
          <Image src="/logo.svg" alt="" width={70} height={45}></Image>
        </Link>

        <div className="navllinks flex gap-12 items-center">
          <Link href="/">Home</Link>
          <Link href="/store">Store</Link>
          {/* <Link href="/product-listing">Categories</Link> */}
          <Link href="/about">About</Link>

          <Link href="/cart">
            <div className="Cart flex">
              <div className="h-[50px] w-[70px] bg-black rounded-3xl leading-[48px] align-middle text-center cursor-pointer">
                Cart
              </div>
              <div>
                <Image
                  src="/cart.svg"
                  alt=""
                  width={50}
                  height={50}
                  className="cursor-pointer"
                ></Image>
              </div>
            </div>
          </Link>
          <NavSign></NavSign>
        </div>
      </div>

      <div className="block lg:hidden">
        <Sheet>
          <SheetTrigger>
            <div className="w-full bg-black fixed -mt-[24px] z-10">
              <Image
                src="/menu.png"
                alt=""
                width={65}
                height={65}
                className="cursor-pointer"
              ></Image>
            </div>
          </SheetTrigger>
          <SheetContent side="left" className="w-full bg-black" icon="h-8 w-8">
            <div className=" space-y-10 text-white p-5">
              <div className=" flex flex-col items-start h-full gap-8 text-2xl  ">
                {links.map((element, index) => (
                  <SheetClose asChild>
                    <Link
                      href={element.link}
                      className="flex gap-2 items-center"
                    >
                      {element.Icon}
                      {element.name}
                    </Link>
                  </SheetClose>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
