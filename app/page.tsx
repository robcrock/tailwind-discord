export default function Home() {
  return (
    <>
      <div className="flex w-60 flex-col bg-zinc-800">
        <div className="flex h-12 items-center px-3 font-title shadow-md">
          Dashboard
        </div>
        <div className="hide-scrollbar flex-1 space-y-2 overflow-y-scroll p-3 text-gray-400">
          <p className="text-white">Friends</p>
        </div>
      </div>
      <div className="flex flex-1 flex-col bg-zinc-700"></div>
    </>
  );
}
