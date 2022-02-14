import { UserAccount } from '../models/UserAccount';

export const mockUserAccount: UserAccount = {
  balance: 0,
  account_id: String(process.env.USER_ACCOUNT_ID),
  public_key: String(process.env.PUBLIC_KEY),
  private_key: String(process.env.PRIVATE_KEY),
};
