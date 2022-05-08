import { getProviders, signIn } from "next-auth/react";

const logo = "https://www.freepnglogos.com/uploads/spotify-logo-png/spotify-icon-green-logo-8.png";

export default function login({ providers }) {
  // console.log(providers);
  return (
    <div className="flex flex-col items-center justify-center bg-black min-h-screen w-full gap-y-6">
      <img className="w-52" src={logo} alt="spotify-logo" />
      {Object.values(providers).map((provider) => {
        return (
          <div key={provider.name}>
            <button
              className="bg-[#1ed760] transition hover:opacity-90 py-3 px-10 rounded-full font-semibold text-[#f0f0f0] active:outline active:outline-[3px] active:outline-white active:outline-offset-[3px]"
              onClick={() => {
                signIn(provider.id, { callbackUrl: "/" });
              }}
            >
              Login with {provider.name}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}
