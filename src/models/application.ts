export type Application = {
  id: string;
  user_id: string;
  title?: string;
  description?: string;
  supporting_docs?: string;
  status: string;
  created_at: Date;
};
