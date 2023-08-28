export default interface Message {
  _id: string;
  content: string;
  ownerId: string;
  convoId: string;
  metadata: Record<string, unknown>;

  createdAt: number;
  updatedAt: number;
}
