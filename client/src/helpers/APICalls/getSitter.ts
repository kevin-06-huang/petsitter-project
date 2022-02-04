import { FetchOptions } from '../../interface/FetchOptions';
import { ProfileApiData } from '../../interface/ProfileApiData';

interface Props {
  location: string;
}

export async function listProfiles({ location }: Props): Promise<ProfileApiData> {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/profile/sitter?location=${location}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}
