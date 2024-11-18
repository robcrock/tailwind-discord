import Image from "next/image";

const Messages = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-700 text-white">
      <div className="max-w-lg">
        <div className="flex px-4 py-1 hover:bg-gray-800 hover:bg-opacity-30">
          <Image
            width="40"
            height="40"
            className="mr-4 h-10 w-10 rounded-full"
            src="https://pbs.twimg.com/profile_images/1677042510839857154/Kq4tpySA_400x400.jpg"
            alt="Adam Watham"
          />
          <div>
            <p className="flex items-baseline">
              <span className="mr-2 text-sm font-medium text-green-500">
                adamwathan
              </span>
              <span className="text-xs text-gray-500">01/15/2021</span>
            </p>
            <p className="text-gray-300">
              Did my gh action to run my update my db schema in prod after
              merging my PR to main actually work 😅
            </p>
          </div>
        </div>
        <div className="mt-1 px-4 py-1 hover:bg-gray-800 hover:bg-opacity-30">
          <p className="pl-14 text-gray-300">
            Hi, when is the next devmemphis meeting? I'd like to go and see how
            it is.
          </p>
        </div>
        <div className="mt-1 px-4 py-1 hover:bg-gray-800 hover:bg-opacity-30">
          <p className="pl-14 text-gray-300">
            Scheduled for Dec 4, DevMemphis meets on the first Wednesday of each
            month at the https://www.umrfresearchpark.org/ located at 460 S
            Highland
          </p>
        </div>
      </div>
    </div>
  );
};

export default Messages;
