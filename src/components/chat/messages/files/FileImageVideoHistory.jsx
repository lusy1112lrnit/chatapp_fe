export default function FileImageVideoHistory({ url, type }) {
    const fileContentStyle = {
      width: "150%",
      height: "150%",
      objectFit: "contain", // Để hình ảnh hoặc video điều chỉnh kích thước để vừa khớp với div
    };
    return (
      <div className="z-20">
        {type === "IMAGE" ? (
          <img src={url} alt="" className="cursor-pointer " style={fileContentStyle}/>
        ) : (
          <video src={url} controls className="cursor-pointer"></video>
        )}
      </div>
    );
  }