import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const CONVERSATION_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/conversation`;
const MESSAGE_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/message`;


const initialState = {
    status: "",
    error: "",
    conversations: [],
    activeConversation: {},
    messages: [],
    notifications: [],
    files: [],
};


export const getConversations = createAsyncThunk(
    "conervsation/all",
    async (token, { rejectWithValue }) => {
      try {
        const { data } = await axios.get(CONVERSATION_ENDPOINT, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return data;
      } catch (error) {
        return rejectWithValue(error.response.data.error.message);
      }
    }
  );

export const open_create_conversation = createAsyncThunk(
    "conervsation/open_create",
    async (values, { rejectWithValue }) => {
      const { token, receiver_id, isGroup } = values;
      try {
        const { data } = await axios.post(
          CONVERSATION_ENDPOINT,
          { receiver_id, isGroup },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return data;
      } catch (error) {
        return rejectWithValue(error.response.data.error.message);
      }
    }
  );

export const getConversationMessages = createAsyncThunk(
    "conervsation/messages",
    async (values, { rejectWithValue }) => {
      const { token, convo_id } = values;
      try {
        const { data } = await axios.get(
          `${MESSAGE_ENDPOINT}/${convo_id}`,
          
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return data;
      } catch (error) {
        return rejectWithValue(error.response.data.error.message);
      }
    }
  );

  export const sendMessage = createAsyncThunk(
    "message/send",
    async (values, { rejectWithValue }) => {
      const { token, message, convo_id, files } = values;
      try {
        const { data } = await axios.post(
        MESSAGE_ENDPOINT,
        {
          message, 
          convo_id,
          files,
        },{
              headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return data;
      } catch (error) {
        return rejectWithValue(error.response.data.error.message);
      }
    }
  );

  export const updateMessage = createAsyncThunk(
    "messga/update",
    async (valuess, { rejectWithValue }) => {
      const { isRead, convoId } = valuess;
      try {
        const { data } = await axios.post(`${MESSAGE_ENDPOINT}/update`, 
        {
          isRead, convoId
        }
        );
        return data;
      } catch (error) {
        return rejectWithValue(error.response.data.error.message);
      }
    }
  );

  export const createGroupConversation = createAsyncThunk(
    "conervsation/create_group",
    async (values, { rejectWithValue }) => {
      const { name, users, token } = values;
      try {
        const { data } = await axios.post(
          `${CONVERSATION_ENDPOINT}/group`,
          { name, users },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return data;
      } catch (error) {
        return rejectWithValue(error.response.data.error.message);
      }
    }
  );
  export const updateConversation = createAsyncThunk(
    "conervsation/update",
    async (values, { rejectWithValue }) => {
      const { token, convoId, name, picture } = values;
      try {
        const { data } = await axios.post(`${CONVERSATION_ENDPOINT}/update`, 
        {
          convoId, name, picture, token
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return data;
      } catch (error) {
        return rejectWithValue(error.response.data.error.message);
      }
    }
  );

  export const addUserConvo = createAsyncThunk(
    "conervsation/adduser",
    async (values, { rejectWithValue }) => {
      const { token, convoId,  users } = values;
      try {
        const { data } = await axios.post(`${CONVERSATION_ENDPOINT}/adduser`, 
        {
          convoId, users
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return data;
      } catch (error) {
        return rejectWithValue(error.response.data.error.message);
      }
    }
  );

  export const removeUserConvo = createAsyncThunk(
    "conervsation/remove",
    async (values, { rejectWithValue }) => {
      const { token, convoId,  userId } = values;
      try {
        const { data } = await axios.post(`${CONVERSATION_ENDPOINT}/remove`, 
        {
          convoId, userId
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return data;
      } catch (error) {
        return rejectWithValue(error.response.data.error.message);
      }
    }
  );

  export const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
      setActiveConversation: (state, action) => {
        state.activeConversation = action.payload;
      },
      updateMessagesAndConversations: (state, action) => {
        //update messages
        let convo = state.activeConversation;
        if (convo._id === action.payload.conversation._id) {
          state.messages = [...state.messages, action.payload];
        }
        //update conversations
        let conversation = {
          ...action.payload.conversation,
          latestMessage: action.payload,
        };
        let newConvos = [...state.conversations].filter(
          (c) => c._id !== conversation._id
        );
        newConvos.unshift(conversation);
        state.conversations = newConvos;
      },
      addFiles: (state, action) => {
        state.files = [...state.files, action.payload];
      },
      clearFiles: (state, action) => {
        state.files = [];
      },
      reomveFileFromFiles: (state, action) => {
        let index = action.payload;
        let files = [...state.files];
        let fileToRemove = [files[index]];
        state.files = files.filter((file) => !fileToRemove.includes(file));
      },
    },
    extraReducers(builder) {
      builder
        .addCase(getConversations.pending, (state, action) => {
          state.status = "loading";
        })
        .addCase(getConversations.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.conversations = action.payload;
        })
        .addCase(getConversations.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        })
        .addCase(open_create_conversation.pending, (state, action) => {
          state.status = "loading";
        })
        .addCase(open_create_conversation.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.activeConversation = action.payload;
        })
        .addCase(open_create_conversation.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        })
        .addCase(getConversationMessages.pending, (state, action) => {
          state.status = "loading";
        })
        .addCase(getConversationMessages.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.messages = action.payload;
        })
        .addCase(getConversationMessages.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        })
        .addCase(sendMessage.pending, (state, action) => {
          state.status = "loading";
        })
        .addCase(sendMessage.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.messages = [...state.messages, action.payload];
          let conversation = {
            ...action.payload.conversation,
            latestMessage: action.payload,
          };
          let newConvos = [...state.conversations].filter(
            (c) => c._id !== conversation._id
          );
          newConvos.unshift(conversation);
          state.conversations = newConvos;
        })
        .addCase(sendMessage.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        })
        .addCase(updateMessage.fulfilled, (state, action) => {
          state.status = "succeeded";
          const updatedConversation = action.payload;
          console.log(updateConversation)
          state.conversations = state.conversations.map((conversation) =>
            conversation._id === updatedConversation._id ? updatedConversation : conversation
          );
        })
        .addCase(addUserConvo.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.activeConversation = action.payload;
          const updatedConversation = action.payload; 
          const index = state.conversations.findIndex(conv => conv._id === updatedConversation._id);      
          if (index !== -1) {
  
            state.conversations[index] = {
              ...state.conversations[index],
              users: action.payload.users,
            };
          }
        })
        .addCase(removeUserConvo.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.activeConversation = action.payload;
          const updatedConversation = action.payload; 
          const index = state.conversations.findIndex(conv => conv._id === updatedConversation._id);      
          if (index !== -1) {
  
            state.conversations[index] = {
              ...state.conversations[index],
              users: action.payload.users,
            };
          }
        })
        .addCase(updateConversation.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.activeConversation = action.payload;
          const updatedConversation = action.payload; 
          const index = state.conversations.findIndex(conv => conv._id === updatedConversation._id);      
          if (index !== -1) {
  
            state.conversations[index] = {
              ...state.conversations[index],
              name: updatedConversation.name,
              picture: updatedConversation.picture,
            };
          }
        });
    },
  });

export const {setActiveConversation, updateMessagesAndConversations, addFiles, clearFiles, reomveFileFromFiles, } = chatSlice.actions;

export default chatSlice.reducer; 