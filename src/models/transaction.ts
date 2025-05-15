export type Transaction = {
  id: string;
  order_id: string;
  donor_id: string;
  campaign_id: number;
  amount: number;
  payment_type: string;
  transaction_status: string;
  transaction_time: Date;
  settlement_time: Date;
  va_numbers?: string;
  fraud_status?: string;
};
