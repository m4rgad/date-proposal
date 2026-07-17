import type { Timestamp } from "firebase/firestore";

export interface PhotoItem {
  id: string;
  imageUrl: string;
  caption: string;
  uploadedBy: string;
  createdAt: Timestamp;
}
