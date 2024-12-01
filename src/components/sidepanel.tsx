import { SidebarMenuItem } from "./sidebar-menu-item";

export default function SidePanel() {
  return (
    <section className=" hidden xl:block xl:w-[300px] p-6 h-[calc(100%-146px)] bg-gray-800   text-gray-50 rounded-xl lg:fixed">
      <section>
        <SidebarMenuItem href="/dashboard">Dashboard</SidebarMenuItem>
        <SidebarMenuItem href="/dashboard/profile">Profile</SidebarMenuItem>
        <SidebarMenuItem href="/dashboard/settings">Settings</SidebarMenuItem>
      </section>
    </section>
  );
}
