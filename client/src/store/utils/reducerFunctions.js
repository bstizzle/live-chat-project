export const updateConvoInStore = (state, conversation) => {
  return state.map(convo => {
    if(convo.id === conversation.id){
      const updatedConvo = {
        ...convo,
        unreadMsgs: 0
      }
      return updatedConvo
    }
    return convo
  })
}

export const addMessageToStore = (state, payload) => {
  const { message, sender } = payload;

  // if sender isn't null, that means the message needs to be put in a brand new convo
  if (sender !== null) {
    const newConvo = {
      id: message.conversationId,
      otherUser: sender,
      messages: [message],
    };
    newConvo.latestMessageText = message.text;
    newConvo.latestMessageId = message.id;
    return [newConvo, ...state];
  }
  
  return state.map((convo) => {
    if (convo.id === message.conversationId) {
      const convoCopy = { ...convo };
      convoCopy.messages.push(message);
      convoCopy.latestMessageText = message.text;
      convoCopy.latestMessageId = message.id;
      return convoCopy;
    } else {
      return convo;
    }
  }).sort((a, b) => {
      if(a.latestMessageId < b.latestMessageId) {
        return 1;
      } else if(a.latestMessageId > b.latestMessageId) {
        return -1;  
      }
    });
};

export const addOnlineUserToStore = (state, id) => {
  //since a user can only have one convo with another, find that one convo to update online status
  //slightly faster than full .map?
  let index;
  const onlineConvo = state.find((convo, i) => {
    if(convo.otherUser.id === id){
      //set index when convo is found so don't have to loop again to find it
      index = i;
      return convo;
    }
    return  null
  })
  onlineConvo.otherUser.online = true
  const newState = state
  newState.splice(index, 1, onlineConvo)
  return newState
};

export const removeOfflineUserFromStore = (state, id) => {
  let index;
  const offlineConvo = state.find((convo, i) => {
    if(convo.otherUser.id === id){
      index = i;
      return convo;
    }
    return null;
  })
  offlineConvo.otherUser.online = false
  const newState = state
  newState.splice(index, 1, offlineConvo)
  return newState
};

export const addSearchedUsersToStore = (state, users) => {
  const currentUsers = {};

  // make table of current users so we can lookup faster
  state.forEach((convo) => {
    currentUsers[convo.otherUser.id] = true;
  });

  const newState = [...state];
  users.forEach((user) => {
    // only create a fake convo if we don't already have a convo with this user
    if (!currentUsers[user.id]) {
      let fakeConvo = { otherUser: user, messages: [] };
      newState.push(fakeConvo);
    }
  });

  return newState;
};

export const addNewConvoToStore = (state, recipientId, message) => {
  return state.map((convo) => {
    if (convo.otherUser.id === recipientId) {
      const newConvo = { ...convo };
      newConvo.id = message.conversationId;
      newConvo.messages.push(message);
      newConvo.latestMessageText = message.text;
      newConvo.latestMessageId = message.id;
      return newConvo;
    } else {
      return convo;
    }
  }).sort((a, b) => {
    if(a.latestMessageId < b.latestMessageId) {
      return 1;
    } else if(a.latestMessageId > b.latestMessageId) {
      return -1;  
    }
  });
};
