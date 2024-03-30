import { useDispatch, useSelector } from "react-redux";
import { CloseIcon, ReturnIcon } from "../../../svg";
import { useState } from "react";
import AddUser from "./AddUser";
import { removeUserConvo } from "../../../features/chatSlice";

export default function Member({setShowMember}) {
  const { activeConversation } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);
  const [showSearch, setShowSearch] = useState(false);
  const dispatch = useDispatch();

  const listuser = activeConversation.users;

  return (
    <div className="convos scrollbar">
      <span
        className=" mt-3 ml-3 w-8 flex items-center justify-center rotateAnimation cursor-pointer"
        onClick={() => {setShowMember(false); setShowSearch(false)}}
      >
        <ReturnIcon className="fill-white w-5" />
      </span>
      <ul className="mt-5">
        {listuser &&
          listuser.map((u) => (
            <li className="list-none h-[72px] w-full dark:bg-dark_bg_1 hover:dark:bg-dark_bg_2" key={u._id}>
              {/* Container */}
              <div className="relative w-full flex items-center justify-between py-[10px]">
                {/* Left */}
                <div className="flex items-center gap-x-3">
                  {/* Conversation user picture */}
                  <div className="relative min-w-[50px] max-w-[50px] h-[50px] rounded-full overflow-hidden">
                    <img
                      src={u.picture}
                      alt="User Picture"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* User name */}
                  <div className="flex flex-col">
                    <h1 className="font-bold text-white">{u.name}</h1>
                  </div>
                </div>
                <div className="cursor-pointer hover:bg-green-500"
                  onClick={() => dispatch(removeUserConvo({userId: u._id, convoId: activeConversation._id, token: user.token}
                    ))
                  }
                  >
                  <CloseIcon className="dark:fill-dark_svg_2" 
                  />
                </div>
              </div>
              {/* Border */}
              <div className="ml-16 border-b dark:border-b-dark_border_1"></div>
            </li>
          ))}
      </ul>
      <button 
        className="w-full 
        "
        onClick={() => {
          setShowSearch(true);
      }}
      >
        {showSearch ? (
          <AddUser setShowSearch={setShowSearch} />
        ) : (
          <button
            className="w-full btn bg-green_1 text-white hover:bg-green-500"
            onClick={() => setShowSearch(true)}
          >
            Add User
          </button>
        )}

      </button>
    </div>
  );
}
