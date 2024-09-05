import { Skeleton } from "@/components/ui/skeleton";

function Skelet() {
  return (
    <div className="flex flex-col space-y-3 ">
      <Skeleton className="h-[225px] w-[250px] rounded-[0px] bg-gray-500" />
      <div className="space-y-2">
        <Skeleton className="h-5 w-[40px] bg-gray-500" />
        <Skeleton className="h-7 w-[150px] bg-gray-500" />
        <Skeleton className="h-7 w-[100px] bg-gray-500" />
        <Skeleton className="h-4 w-[150px] bg-gray-500" />
        <Skeleton className="h-4 w-[100px] bg-gray-500" />
        <div className="flex gap-2">
          <Skeleton className="h-3 w-[75px] bg-gray-500" />
          <Skeleton className="h-3 w-[75px] bg-gray-500" />
        </div>
        <div className="py-2 space-y-2">
          <Skeleton className="h-[6px] w-[250px]  bg-gray-500" />
          <Skeleton className="h-[6px] w-[250px] bg-gray-500" />
          <Skeleton className="h-[6px] w-[250px] bg-gray-500" />
        </div>
        <Skeleton className="h-6 w-[150px] bg-gray-500" />
      </div>
    </div>
  );
}

export default function Recskeleton() {
  return (
    <div className="flex ml-[5%] space-x-6 overflow-auto pb-5">
      <Skelet></Skelet>
      <Skelet></Skelet>
      <Skelet></Skelet>
      <Skelet></Skelet>
      <Skelet></Skelet>
      <Skelet></Skelet>
    </div>
  );
}
