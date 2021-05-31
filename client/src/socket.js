import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
} from "./store/conversations";

const socket = io('http://localhost:3001', {
  secure: true,
  withCredentials: true
});
console.log(window.location.origin)

const msgSocket = io(`http://localhost:3001/messages`, {
  secure: true
});

socket.on("connect", () => {
  console.log("connected to server");

  socket.on("add-online-user", (id) => {
    store.dispatch(addOnlineUser(id));
  });

  socket.on("remove-offline-user", (id) => {
    store.dispatch(removeOfflineUser(id));
  });
});

msgSocket.on("new-message", (data) => {
  store.dispatch(setNewMessage(data.message, data.sender));
});

export default socket;
