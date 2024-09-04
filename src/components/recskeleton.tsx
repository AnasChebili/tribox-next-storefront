import { Skeleton } from "@/components/ui/skeleton";

function Skelet() {
  return (
    <div className="flex flex-col space-y-3 ">
      <Skeleton className="h-[225px] w-[250px] rounded-xl bg-gray-500" />
      <div className="space-y-2">
        <Skeleton className="h-5 w-[40px] bg-gray-500" />
        <Skeleton className="h-6 w-[250px] bg-gray-500" />
        <Skeleton className="h-2 w-[150px] bg-gray-500" />
        <Skeleton className="h-2 w-[250px] bg-gray-500" />
        <Skeleton className="h-2 w-[250px] bg-gray-500" />
      </div>
    </div>
  );
}

export default function Recskeleton() {
  return (
    <div className="flex ml-[5%] space-x-6">
      <Skelet></Skelet>
      <Skelet></Skelet>
      <Skelet></Skelet>
    </div>
  );
}
