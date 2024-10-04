import { RouterOutput } from "@/server";

export default function Morning({ user }: { user: RouterOutput["getUser"] }) {
  return (
    <div className="mt-8">
      <div className="h-[500px] bg-[url('/mountain.png')] bg-bottom">
        <div className="h-1/3 bg-red-700 opacity-80"></div>
        <div className="h-1/3 bg-gradient-to-t from-yellow-600 to-red-700 opacity-80">
          <h1 className="w-1/2 text-5xl sm:text-7xl pl-10 font-bold">
            Good Morning{user?.name && `, ${user?.name}.`}
          </h1>
        </div>
        <div className="h-1/3 bg-yellow-600 opacity-80">
          <p className=" hidden xl:block w-1/2 font-light pl-10 tracking-widest text-lg">
            Welcome to Tri-Box. What will you like to do today? You beautiful
            human being.
          </p>
        </div>
      </div>
    </div>
  );
}
