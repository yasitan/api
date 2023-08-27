import { ChatOpenAI } from 'langchain/chat_models';
import { AIMessage, HumanMessage, SystemMessage } from 'langchain/schema';
import Message from '../models/message';

export const CHAT_MODEL = 'gpt-3.5-turbo';

export const chat = (instruction: string, messages: Partial<Message>[], options?: { temperature?: number }) => {
  const chatModel = new ChatOpenAI({
    modelName: CHAT_MODEL,
    temperature: options?.temperature
  });

  return chatModel.call([
    new SystemMessage(instruction),
    ...messages.map(msg => msg.ownerId ? new HumanMessage(msg.content!) : new AIMessage(msg.content!))
  ]).then(res => res.content);
};
