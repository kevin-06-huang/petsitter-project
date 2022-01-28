import { FetchOptions } from '../../interface/FetchOptions';
import { ImageApiData } from '../../interface/ImageApiData';

const postPhoto = async (file: File): Promise<ImageApiData> => {
  const formData = new FormData();
  formData.append('image', file);
  const fetchOptions: FetchOptions = {
    method: 'POST',
    body: formData,
    credentials: 'include',
  };
  return await fetch(`/image/upload`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default postPhoto;
