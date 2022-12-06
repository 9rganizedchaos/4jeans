export interface Photo {
  imgUrl: string;
  altText?: string;
  profileUrl?: string;
  username?: string | null;
  bio?: string | null;
  location?: string | null;
  color: string;
}
