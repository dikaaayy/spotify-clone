import { useSession } from "next-auth/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { shuffle } from "lodash";

export default function Main() {
  const { data: session } = useSession();
  const [bgColor, setBgColor] = useState(null);

  const colors = ["from-indigo-500", "from-blue-500", "from-green-500", "from-red-500", "from-yellow-500", "from-pink-500", "from-purple-500"];

  useEffect(() => {
    setBgColor(shuffle(colors).pop());
  }, []);

  return (
    <div className="flex-grow">
      <header className="bg-black bg-opacity-70 hover:opacity-95 h-[3rem] rounded-full flex absolute right-10 lg:right-14 top-4 transition-all">
        <div className="flex items-center justify-center gap-x-2 pr-2 pl-1">
          <img src={session?.user?.image} alt="user-image" className="w-10 rounded-full" />
          <p className="text-white text-sm font-semibold">{session?.user?.name}</p>
          <button>
            <ChevronDownIcon className="text-white w-5" />
          </button>
        </div>
      </header>
      <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${bgColor} h-80`}>
        <h1 className="text-white">test</h1>
      </section>
    </div>
  );
}
