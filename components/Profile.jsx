import { signOut, useSession } from "next-auth/react";
import { ChevronDownIcon } from "@heroicons/react/outline";

export default function Profile() {
  const { data: session } = useSession();
  return (
    <header className="bg-black bg-opacity-70 hover:opacity-95 h-[3rem] rounded-full flex absolute right-10 lg:right-14 top-4 transition-all" onClick={signOut}>
      <div className="flex items-center justify-center gap-x-2 pr-2 pl-1">
        <img src={session?.user?.image} alt="user-image" className="w-10 h-10 rounded-full" />
        <p className="text-white text-sm font-semibold">{session?.user?.name}</p>
        <button>
          <ChevronDownIcon className="text-white w-5" />
        </button>
      </div>
    </header>
  );
}
