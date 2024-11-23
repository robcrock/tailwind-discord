import { IMessage } from "../../data";

export function Message({ message }: { message: IMessage }) {
  return (
    <div className="py-0.5 pl-4 pr-16 leading-[22px] hover:bg-gray-950/[.07]">
      <p className="pl-14 text-gray-100">{message.text}</p>
    </div>
  );
}
