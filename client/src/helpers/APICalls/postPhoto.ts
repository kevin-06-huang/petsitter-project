import { AuthApiData } from '../../interface/AuthApiData';
import { FetchOptions } from '../../interface/FetchOptions';

const test = async ({ image }: any) => {
  const formData = new FormData();
  formData.append('image', image);
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    body: JSON.stringify(image),
    credentials: 'include',
  };
  return await fetch(`/image/upload`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

const postPhoto = async ({ image }: any): Promise<AuthApiData> => {
  const formData = new FormData();
  formData.append('image', image);
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    body: JSON.stringify(formData),
    credentials: 'include',
  };
  return await fetch(`/profile/edit`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default postPhoto;
