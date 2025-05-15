import type { User } from "./user";

export type Campaign = {
  id: string;
  title?: string;
  description?: string;
  type_id?: number;
  image_url?: string;
  target_amount: number;
  current_amount: number;
  status: string;
  is_urgent: boolean;
  created_by: User;
  created_at: Date;
};
