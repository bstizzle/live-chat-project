import React, { Component } from "react";
import { Box, Chip } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { withStyles } from "@material-ui/core/styles";
import { setActiveChat } from "../../store/activeConversation";
import { connect } from "react-redux";

import { updateConversation } from "../../store/utils/thunkCreators";

const styles = {
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "grab",
    },
  },
};

class Chat extends Component {
  handleClick = async (conversation) => {
    if(conversation.id){
      await this.props.updateConversation(conversation.id)
    }
    await this.props.setActiveChat(conversation.otherUser.username);
  };

  render() {
    const { classes } = this.props;
    const otherUser = this.props.conversation.otherUser;
    const unreadCount = this.props.conversation.unreadMsgs

    return (
      <Box
        onClick={() => this.handleClick(this.props.conversation)}
        className={classes.root}
      >
        <BadgeAvatar
          photoUrl={otherUser.photoUrl}
          username={otherUser.username}
          online={otherUser.online}
          sidebar={true}
        />
        <ChatContent conversation={this.props.conversation} />
        {unreadCount === 0 || unreadCount === undefined ? 
          null : <Chip color="primary" size="small" label={unreadCount} />
        }
      </Box>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChat: (id) => {
      dispatch(setActiveChat(id));
    },
    updateConversation: (id) => {
      dispatch(updateConversation(id))
    }
  };
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(Chat));
