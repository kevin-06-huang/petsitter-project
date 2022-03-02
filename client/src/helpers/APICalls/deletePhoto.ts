import { FetchOptions } from '../../interface/FetchOptions';
import { ImageApiData } from '../../interface/ImageApiData';

const getPhoto = async (fileKey: string): Promise<ImageApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'DELETE',
    credentials: 'include',
  };
  return await fetch(`/image/:${fileKey}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default getPhoto;
