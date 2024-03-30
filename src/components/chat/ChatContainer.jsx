import { useDispatch, useSelector } from "react-redux";
import ChatHeader from "./header/ChatHeader";
import ChatMessages from "./messages/ChatMessages";
import { useEffect, useState } from "react";
import { getConversationMessages } from "../../features/chatSlice";
import { ChatActions } from "./actions";
import { checkOnlineStatus } from "../../utils/chat";
import FilesPreview from "./preview/files/FilesPreview";
import ChangePic from "./header/ChangePic";
import Member from "./header/Member";
import FileHistoris from "./preview/files/FileHistoris";

export default function ChatContainer({ onlineUsers, typing, callUser }) {
    const dispatch = useDispatch();
    const {activeConversation, files} = useSelector((state) => state.chat);
    const {user} = useSelector((state) => state.user);
    const {token} = user;
    const [showChangePic, setShowChangePic] = useState(false);
    const [showhistory, setShowhistory] = useState(false);
    const [showMember, setShowMember] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const values = {
        token,
        convo_id: activeConversation?._id,
    }
    useEffect(()=> {
        if(activeConversation?._id){
            dispatch(getConversationMessages(values));
            setShowChangePic(false);
            setShowhistory(false);
            setShowMember(false);
            setShowMenu(false);
        }
    }, [activeConversation]);
    return (
    <div className="relative w-full h-full border-l dark:border-l-dark_border_2 select-none overflow-hidden ">
        {/**Container */}
        <div>
            {/**Chat Header*/}
            <ChatHeader 
                online = {
                    activeConversation.isGroup 
                    ? false 
                    : checkOnlineStatus(onlineUsers, user, activeConversation.users)
                } 
                callUser = { callUser }
                setShowMember={setShowMember}
                setShowhistory={setShowhistory}
                setShowChangePic={setShowChangePic}
                showMenu={showMenu}
                setShowMenu={setShowMenu}
            />
            {
            showChangePic ? (
            <ChangePic setShowChangePic={ setShowChangePic } />
            ) : showhistory ? (
            <FileHistoris setShowhistory={ setShowhistory }/>
            ) : showMember ? (
            <Member setShowMember={setShowMember}/>
            ) : (
            <>
                {files.length > 0 ? (
                <FilesPreview />
                ) : (
                <>
                    {/* Chat messages */}
                    <ChatMessages typing={typing} />
                    {/* Chat Actions */}
                    <ChatActions />
                </>
                )}
            </>
            )
        }
        </div>
    </div>
  )
}

