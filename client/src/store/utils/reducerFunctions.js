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
  //since a user can only have 1 convo with another, find that one convo to update online status
  //slightly faster than full .map?
  const onlineConvo = state.find(convo => convo.otherUser.id === id)
  onlineConvo.otherUser.online = true
  return [...state, onlineConvo]
};

export const removeOfflineUserFromStore = (state, id) => {
  const onlineConvo = state.find(convo => convo.otherUser.id === id)
  onlineConvo.otherUser.online = false
  return [...state, onlineConvo]
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
