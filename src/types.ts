export type FileResult = {
  success: boolean;
  insertResult: InsertResult;
};

export type InsertResult = {
  id: string;
  r2_object_key: string;
  original_filename: string;
  content_type: string;
  size_bytes: number;
  uploaded_at: number;
  expires_at: number;
};

export type ShareResult = {
  success: boolean;
  insertResult: InsertResult[];
};
