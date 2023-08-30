import { Server as HttpServer } from 'http';
import { Server } from 'socket.io';
import Message from '../models/message';
import { verifyToken } from '../helpers/jwt';
import Conversation from '../models/conversation';

const exportEvents = (io: Server) => {
  io.on('connection', (socket) => {
    const { user } = socket.handshake.auth;

    socket.join(user._id);
    console.log('connected ', user);


    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
};

export default (server: HttpServer) => {
  const io = new Server(server, { cors: { }});
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    verifyToken(token.split(' ')[1]).then(user => {
      socket.handshake.auth.user = user;
      next();
    })
      .catch(err => next(err));
  });

  exportEvents(io);
  return io;
};

export const sendMessage = (io: Server, userId: string, message: Message) => {
  io.to(userId).emit('new_message', { message });
};

export const sendConversation = (io: Server, conversation: Conversation) => {
  io.to(conversation.userId).emit('new_conversation', { conversation });
};
