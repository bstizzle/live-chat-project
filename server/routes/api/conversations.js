const router = require("express").Router();
const { User, Conversation, Message } = require("../../db/models");
const { Op } = require("sequelize");
const onlineUsers = require("../../onlineUsers");
const { route } = require("../auth");

// get all conversations for a user, include latest message text for preview, and all messages
// include other user model so we have info on username/profile pic (don't include current user info)
// TODO: for scalability, implement lazy loading
router.get("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const userId = req.user.id;
    const conversations = await Conversation.findAll({
      where: {
        [Op.or]: {
          user1Id: userId,
          user2Id: userId,
        },
      },
      attributes: ["id"],
      order: [[Message, "createdAt", "ASC"]],
      include: [
        { model: Message, order: ["createdAt", "ASC"] },
        {
          model: User,
          as: "user1",
          where: {
            id: {
              [Op.not]: userId,
            },
          },
          attributes: ["id", "username", "photoUrl"],
          required: false,
        },
        {
          model: User,
          as: "user2",
          where: {
            id: {
              [Op.not]: userId,
            },
          },
          attributes: ["id", "username", "photoUrl"],
          required: false,
        },
      ],
    });

    for (let i = 0; i < conversations.length; i++) {
      const convo = conversations[i];
      const convoJSON = convo.toJSON();

      // set a property "otherUser" so that frontend will have easier access
      if (convoJSON.user1) {
        convoJSON.otherUser = convoJSON.user1;
        delete convoJSON.user1;
      } else if (convoJSON.user2) {
        convoJSON.otherUser = convoJSON.user2;
        delete convoJSON.user2;
      }

      // set property for online status of the other user
      if (onlineUsers.includes(convoJSON.otherUser.id)) {
        convoJSON.otherUser.online = true;
      } else {
        convoJSON.otherUser.online = false;
      }

      // set properties for notification count and latest message preview
      const latestTxtIndex = convoJSON.messages.length-1
      convoJSON.latestMessageText = convoJSON.messages[latestTxtIndex].text;
      convoJSON.latestMessageId = convoJSON.messages[latestTxtIndex].id

      const unreads = await Message.findAll({
        where: {
          seen: false,
          conversationId: conversations[i].id,
          [Op.not]: {
            senderId: userId
          }
        }
      })
      convoJSON.unreadMsgs = unreads.length;

      conversations[i] = convoJSON;
    }

    conversations.sort((a, b) => {
      if(a.latestMessageId < b.latestMessageId) {
        return 1;
      } else if(a.latestMessageId > b.latestMessageId) {
        return -1;
      }
    })
    res.json(conversations);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }

    const conversationId = req.body.id
    const userId = req.user.id

    const convo = await Conversation.findOne({
      where: {
        id: conversationId
      },
      include: [
        { model: Message, order: ["createdAt", "ASC"] }
      ]
    })

    convo.messages = await convo.messages.map(msg => {
      //for each received message, update seen to true in db and for the response
      if(msg.senderId !== userId){
        Message.update(
          {seen: true},
          {where: {id: msg.id}}
        )
        msg.seen = true;
        return msg
      }
      return msg
    })

    res.json(convo)
  } catch (error) {
    next(error);
  }
})

module.exports = router;
