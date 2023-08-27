export default interface Message {
  _id: string;
  content: string;
  ownerId: string;
  convoId: string;

  createdAt: number;
  updatedAt: number;
}
