import type { User } from "./user";

export type Donation = {
  id: string;
  campaign_id: Int16Array;
  donor: User;
  amount: number;
  is_anonymous: boolean;
  message?: string;
  status: string;
  payment_id: string;
  created_at: Date;
};
