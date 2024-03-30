import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import FileHistory from "./FileHistory";
import { ReturnIcon } from "../../../../svg";

export default function FileHistoris({ setShowhistory }) {
  const { messages, activeConversation } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);
  const endRef = useRef();
  return (
    
    <div
      className="mb-[60px] bg-[url('https://res.cloudinary.com/dmhcnhtng/image/upload/v1677358270/Untitled-1_copy_rpx8yb.jpg')]
    bg-cover bg-no-repeat
    "
    >
       <span
                className="w-8 flex items-center justify-center rotateAnimation cursor-pointer"
                onClick={() => setShowhistory(false)}
              >
                <ReturnIcon className="fill-white w-5" />
              </span>
      {/*Container*/}
      <div className="scrollbar overflow_scrollbar px-[5%] grid grid-cols-4 gap-4 ">
        {/*Messages*/}
        {messages &&
          messages.map((message) => (
            <>
              {/*Message files */}
              {message.files.length > 0
                ? message.files.map((file) => {
                    if (file.type !== 'IMAGE' && file.type !== 'VIDEO') {
                      return null;  
                    }
                    return (
                      <div className="">
                        <FileHistory
                        FileMessage={file}
                        message={message}
                        key={message._id}
                        me={user._id === message.sender._id}
                      />
                      </div>                      
                    );
                  })
                : null}
            </>
          ))}
        <div className="mt-2" ref={endRef}></div>
      </div>
    </div>
  );
}
