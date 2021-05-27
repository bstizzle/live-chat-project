import React from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";

const Messages = (props) => {
  const { messages, otherUser, userId } = props;

  
  // const orderedMessages = []
  // //thought about using just .reverse(), but that alters the array in place
  // //so it actually reverses the array every time you go back to the same conversation
  // for(let i = messages.length-1; i >= 0; i--){
  //   const message = messages[i]
  //   const time = moment(message.createdAt).format("h:mm");
    
  //   if(message.senderId === userId){
  //     orderedMessages.push(
  //       <SenderBubble key={message.id} text={message.text} time={time} />
  //     )
  //   } else {
  //     orderedMessages.push(
  //       <OtherUserBubble key={message.id} text={message.text} time={time} otherUser={otherUser} />
  //     )
  //   }
  // }
  
  
  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");

        return message.senderId === userId ? (
          <SenderBubble key={message.id} text={message.text} time={time} />
        ) : (
          <OtherUserBubble key={message.id} text={message.text} time={time} otherUser={otherUser} />
        );
      })}
    </Box>
  );
};

export default Messages;
