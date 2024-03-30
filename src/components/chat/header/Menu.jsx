import { useSelector } from "react-redux";

export default function Menu({setShowhistory, setShowMember, setShowChangePic}) {
  const { activeConversation } = useSelector((state) => state.chat);

  return (
    <>
      <div className="absolute right-1 z-50 dark:bg-dark_bg_2 dark:text-dark_text_1 shadow-md w-52">
        <ul>
          <li className="py-3 pl-5 cursor-pointer hover:bg-dark_bg_3" onClick={() => {
                  setShowhistory((prev) => !prev);
                  setShowMember(false)
                  setShowChangePic(false)             
              }}>
            <span>History Image Video</span>
          </li>
          {
            activeConversation.isGroup ? (
            <li
              className="py-3 pl-5 cursor-pointer hover:bg-dark_bg_3" onClick={() => {
                setShowMember((prev) => !prev);
                setShowhistory(false);
                setShowChangePic(false)

            }}
            >
              <span>User Member</span>
            </li>
            ) : null
          }
          
        </ul>
      </div>
    </>
  )
}
