export type Withdrawal = {
  id: string;
  campaign_id: number;
  amount: number;
  withdrawal_date: Date;
  created_by: string;
  status: string;
  created_at: Date;
};
