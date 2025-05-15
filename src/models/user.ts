export type User = {
  id: string;
  nik?: string;
  prodi?: string;
  name: string;
  email: string;
  role: string;
  photo_url?: string;
  total_donation: number;
  created_at: Date;
};
