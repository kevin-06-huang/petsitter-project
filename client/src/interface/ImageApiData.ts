export interface ImageApiData {
  error?: { message: string };
  success?: { image: string | File };
}
