import { FetchOptions } from '../../interface/FetchOptions';
import { Profile } from '../../interface/Profile';

export async function loadProfile(userId: string): Promise<ProfileApiData> {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/profile/load/${userId}`, fetchOptions)
    .then((res) => {
      return res.json();
    })
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}

export interface ProfileApiData {
  success: {
    profile: Profile;
  };
}
