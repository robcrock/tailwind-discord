import Image from "next/image";
import { IMessage } from "../../data";

export function MessageWithUser({ message }: { message: IMessage }) {
  return (
    <div className="mt-[17px] flex py-0.5 pl-4 pr-16 leading-[22px] hover:bg-gray-950/[.07]">
      <Image
        width="16"
        height="16"
        className="mr-4 mt-0.5 h-10 w-10 rounded-full"
        src={message.avatarUrl}
        alt=""
      />
      <div>
        <p className="flex items-baseline">
          <span className="mr-2 font-medium text-green-400">
            {message.user}
          </span>
          <span className="text-xs font-medium text-gray-400">
            {message.date}
          </span>
        </p>
        <p className="text-gray-100">{message.text}</p>
      </div>
    </div>
  );
}
