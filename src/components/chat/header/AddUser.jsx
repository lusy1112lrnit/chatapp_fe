import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import MultipleSelect from "./MultipleSelect";
import { ReturnIcon, ValidIcon } from "../../../svg";
import { addUserConvo } from "../../../features/chatSlice";
export default function AddUser({setShowSearch}) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { status, activeConversation } = useSelector((state) => state.chat);    
  const [name, setName] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  
  let tempUsers = [];
  if (activeConversation && Array.isArray(activeConversation.users)) {
    tempUsers = activeConversation.users.map(user => user._id);
  }
  
  const handleSearch = async (e) => {
    if (e.target.value && e.key === "Enter") {
      setSearchResults([]);
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_ENDPOINT}/user?search=${e.target.value}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const filteredUsers = data.filter(user => !tempUsers.includes(user._id));
        if (filteredUsers.length > 0) {
          let tempArray = [];
          filteredUsers.forEach((user) => {
            let temp = {
              value: user._id,
              label: user.name,
              picture: user.picture,
            };
            tempArray.push(temp);
          });
          setSearchResults(tempArray);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.log(error.response.data.error.message);
      }
    } else {
      setSearchResults([]);
    }
  };
  const createGroupHandler = async () => {
    let users = [];
    if (status !== "loading") {
      selectedUsers.forEach((user) => {
        users.push(user.value);
      });
      let values = {
        users,
        token: user.token,
        convoId: activeConversation._id
      };
      console.log(values)
      let newConvo = await dispatch(addUserConvo(values));
      setShowSearch(false);
    }
  };
  return (
    <div className="createGroupAnimation flex0030 relative h-full z-40">
      {/*Container*/}
      <div className="mt-5">
        {/*Return/Close button*/}   
        {/*Multiple select */}
        <MultipleSelect
          selectedUsers={selectedUsers}
          searchResults={searchResults}
          setSelectedUsers={setSelectedUsers}
          handleSearch={handleSearch}
        />
        {/*Create group button*/}
        <div className="absolute top-32 left-1/2 -translate-x-1/2 max-h-fit">
            <button
                className="btn bg-green_1 scale-150 hover:bg-green-500"
                onClick={() => createGroupHandler()}
            >
                {status === "loading" ? (
                <ClipLoader color="#E9EDEF" size={25} />
                ) : (
                <ValidIcon className="fill-white mt-2 h-full" />
                )}
            </button>
        </div>
      </div>
    </div>
  );
}
