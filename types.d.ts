export interface MetadataProps {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
}

export interface UserProfile {
  uid: string;
  fullName: string;
  username: string;
  email: string;
  createdAt: Timestamp;
}
