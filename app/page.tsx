export default function Home() {
  return (
    <>
      <div className="flex w-60 flex-col bg-zinc-800">
        <div className="flex h-12 items-center px-3 font-title shadow-md">
          Tailwind CSS
        </div>
        <div className="hide-scrollbar flex-1 space-y-2 overflow-y-scroll p-3 text-gray-400">
          <p className="text-white">channels (unread)</p>
          <p className="text-white">channels (unread)</p>
          {[...Array(40)].map((_, i) => (
            <p key={i}>channels {i}</p>
          ))}
        </div>
      </div>
      <div className="flex flex-1 flex-col bg-zinc-700">
        <div className="flex h-12 items-center px-3 font-title shadow-md">
          general
        </div>
        <div className="hide-scrollbar flex-1 space-y-2 overflow-y-scroll p-3">
          {[...Array(40)].map((_, i) => (
            <p key={i}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Corrupti, est enim! Consequatur quaerat fuga labore provident
              veritatis at eligendi voluptatum pariatur, obcaecati excepturi
              sequi blanditiis asperiores enim consectetur repellendus animi!
            </p>
          ))}
        </div>
      </div>
    </>
  );
}
