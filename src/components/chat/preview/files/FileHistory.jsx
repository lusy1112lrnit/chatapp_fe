import React from "react";
import moment from "moment";
import FileImageVideo from "../../messages/files/FileImageVideo";
import FileOthers from "../../messages/files/FileOthers";
import FileImageVideoHistory from "../../messages/files/FileImageVideoHistory";

export default function FileHistory({ FileMessage, message }) {
  const { file, type } = FileMessage;


  const fileContainerStyle = {
  width: "200px",
  height: "110px",
  border: "1px solid #ccc",
  overflow: "hidden",
  position: "relative",
  display: "flex",
};

  return (
    <div style={fileContainerStyle}>
      {/* Message Container */}
      <div className="relative">
        {/* File Container */}
        <div >
          {type === "IMAGE" || type === "VIDEO" ? (
            <FileImageVideoHistory url={file.secure_url} type={type} />
          ) : (
            <FileOthers file={file} type={type} />
          )}
        </div>

        {/* Message Date */}
        <span className="absolute right-1.5 bottom-1.5 text-xs text-dark_text_5 leading-none">
          {moment(message.createdAt).format("HH:mm")}
        </span>

        {/* Triangle */}
      </div>
    </div>
  );
}