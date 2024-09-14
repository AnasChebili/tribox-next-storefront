"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const SidebarMenuItem = ({
  children,
  href,
}: {
  children: string;
  href: string;
}) => {
  const pathname = usePathname();
  const isSelected = pathname === href;
  return (
    <Link
      href={href}
      className={cn(
        "block font-bold text-xl p-4 rounded-lg hover:bg-red-500 cursor-pointer",
        { "bg-red-500": isSelected }
      )}
    >
      {children}
    </Link>
  );
};
