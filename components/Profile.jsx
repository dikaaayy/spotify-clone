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
      <div className="profile-container" onClick={navHandler}>
        <div className="flex items-center justify-center gap-x-2 pr-2 pl-1">
          <img src={session?.user?.image} alt="user-image" className="w-10 h-10 rounded-full" />
          <p className="text-white text-sm font-semibold">{session?.user?.name}</p>
          <button>{isOpen ? <ChevronUpIcon className="text-white w-5" /> : <ChevronDownIcon className="text-white w-5" />}</button>
        </div>
      </div>
      <div className={`profile-modal ${isOpen ? "block" : "hidden"}`}>
        <p className="mt-1 profile-modal-button">Account</p>
        <p className="profile-modal-button">Profile</p>
        <p className="profile-modal-button" onClick={signOut}>
          Log out
        </p>
      </div>
    </>
  );
}
