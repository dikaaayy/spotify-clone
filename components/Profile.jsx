import { signOut, useSession } from "next-auth/react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline";
import { useState } from "react";

export default function Profile() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const navHandler = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };
  return (
    <>
      <header className="bg-black bg-opacity-70 hover:opacity-95 h-[3rem] rounded-full flex absolute right-10 lg:right-14 top-4 transition-all cursor-pointer" onClick={navHandler}>
        <div className="flex items-center justify-center gap-x-2 pr-2 pl-1">
          <img src={session?.user?.image} alt="user-image" className="w-10 h-10 rounded-full" />
          <p className="text-white text-sm font-semibold">{session?.user?.name}</p>
          <button>{isOpen ? <ChevronUpIcon className="text-white w-5" /> : <ChevronDownIcon className="text-white w-5" />}</button>
        </div>
      </header>
      <div className={`profile-modal ${isOpen ? "block" : "hidden"}`}>
        <p className="pl-2 mt-1 mx-1 pr-1 py-2 hover:bg-white hover:bg-opacity-10 rounded-sm cursor-pointer text-sm">Account</p>
        <p className="pl-2 mx-1 pr-1 py-2 hover:bg-white hover:bg-opacity-10 rounded-sm cursor-pointer text-sm">Profile</p>
        <p className="pl-2 mx-1 pr-1 py-2 hover:bg-white hover:bg-opacity-10 rounded-sm cursor-pointer text-sm" onClick={signOut}>
          Log out
        </p>
      </div>
    </>
  );
}
