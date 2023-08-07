export default interface RefreshToken {
  _id: string; // will be used as an refresh token
  userId: string;
  createdAt: number;
  updatedAt: number;
}
