import { useRef } from "react";
import { CloseIcon } from "../../../../svg";
import { getFileType } from "../../../../utils/file";
import { addFiles } from "../../../../features/chatSlice";
import { useDispatch } from "react-redux";

export default function Add() {
    const dispatch = useDispatch();
    const inputRef = useRef(null);
    const filestHandler = (e) => {
        let files = Array.from(e.target.files);
        files.forEach((file)=> {
            console.log(file.type);
            if(
                file.type !== "application/pdf" &&
                file.type !== "text/plain" &&
                file.type !== "application/msword" &&
                file.type !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document" &&
                file.type !== "application/vnd.ms-powerpoint" &&
                file.type !== "application/vnd.openxmlformats-officedocument.presentationml.presentation" &&
                file.type !== "application/vnd.ms-excel" &&
                file.type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" &&
                file.type !== "application/zip" &&
                file.type !== "application/x-zip-compressed" &&
                file.type !== "application/vnd.rar" &&
                file.type !== "application/x-rar-compressed" &&
                file.type !== "audio/mpeg" &&
                file.type !== "audio/wav" &&
                file.type !== "video/mp4" &&
                file.type !== "video/mpeg" &&
                file.type !== "video/webm" &&
                file.type !== "video/mp2t" &&
                file.type !== "image/png" &&
                file.type !== "image/jpeg" &&
                file.type !== "image/gif" &&
                file.type !== "image/webp" 
            ) {
                files=files.filter((item) => item.name !== file.name);
                console.log(file.type);
                return;
            } else if (file.size > 1024 * 1024 * 5){
                files = files.filter((item) => item.name !== file.name);
                return;
            } else {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = (e) => {
                    dispatch(
                        addFiles({file: file, fileData: getFileType(file.type) === "IMAGE" ? e.target.result : "", type: getFileType(file.type)})
                    );
                };
            }
        });
    };
  return (
    <>
        <div onClick={ () => inputRef.current.click()} className="w-16 h-16 mt-2 border dark:border-white rounded-md flex items-center justify-center cursor-pointer">
            <span className="rotate-45">
                <CloseIcon className="dark:fill-dark_svg_1"/>
            </span>
        </div>
        <input type="file" hidden multiple ref={inputRef} accept="application/*,text/plain,audio/mpeg,audio/wav,video/mp4,video/mpeg,video/webm,video/mp2t,image/png,image/jpeg,image/gif,image/webp" onChange={filestHandler} />
    </>
  );
}
