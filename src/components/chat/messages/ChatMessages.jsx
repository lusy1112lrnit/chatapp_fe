import { useSelector } from "react-redux"
import Message from "./Message";
import React, { useEffect, useRef } from "react";
import Typing from "./Typing";
import FileMessage from "./files/FileMessage";

export default function ChatMessages({typing}) {
    const {messages, activeConversation} = useSelector((state) => state.chat);
    const {user} = useSelector((state)=>state.user);
    const endRef = useRef();
    useEffect(() => {
        scrollToBottom();
    }, ([messages]))
    const scrollToBottom = () => {
        endRef.current.scrollIntoView({behavior: "smooth"});
    }
    return (
        <div className="mb-[60px] bg-[url('https://res.cloudinary.com/dvcotxpyr/raw/upload/v1699643334/kgghiwgfeoqls6a9fmyn.jpg')] bg-cover bg-no-repeat" >
            {/**Container*/}
            <div className=" scrollbar overflow-scrollbar overflow-auto py-2 px-[5%] mb-[60px]">
                {/**Messages */}
                {messages && messages.map((message) => (
                    <>
                    {/* Message files */}
                    {message.files.length > 0 
                        ? message.files.map((file) => (
                            <FileMessage
                                FileMessage={file}
                                message={message}
                                key={message._id}
                                me={user._id === message.sender._id}
                            />
                        )) : null}
                    {/* Message text */}
                        {message.message.length > 0 ? (
                            <Message 
                                message={message} 
                                key={message._id} 
                                me={user._id === message.sender._id}/>
                        ) : null}
                    </>
                ))}
                {typing === activeConversation._id ? <Typing /> : null}
                <div className="mt-2" ref={endRef}></div>
            </div>
        </div>
    )
}
