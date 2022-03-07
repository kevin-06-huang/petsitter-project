import { ProfileApiData } from '../../interface/ProfileApiData';
import { FetchOptions } from '../../interface/FetchOptions';

const searchProfiles = async (searchString: string): Promise<ProfileApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/profile/search/${searchString}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default searchProfiles;
