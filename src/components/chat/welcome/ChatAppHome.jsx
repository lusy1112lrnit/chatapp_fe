import { BeatLoader } from "react-spinners";
import { ChatIcon, Logo, PollIcon } from "../../../svg";
import LogoChat from "../../../svg/LogoChat";


export default function ChatAppHome() {
  return (
    <div className="h-full w-full dark:bg-dark_bg_4 select-none border-l dark:border-l-dark_border_2 border-b-[6px] border-b-green_2" >
      {/**Container */}
      <div className="-mt-1.5 w-full h-full flex flex-col gap-y-8 items-center justify-center">
        <span>
          <LogoChat/>
        </span>
        {/**Infos */}
        <div className="mt-1 text-center space-y-[12px]">
          <h1 className="text-[32px] dark:text-dark_text_4 font-extralight">
            ChatApp Web
          </h1>
          <p className="text-sm dark:text-dark_text_3">
            Send and receive messages without keeping your phone online.<br/>
            Use ChatApp on up to 4 linked devices and 1 phone at the same time.
          </p>
        </div>
      </div>
    </div>
  )
}
