'use server';

import { env } from './env/server';
import { cookies } from 'next/headers';
import { GetAllNewslettersSchema, GetAllNewslettersType } from './types';

export const getAllNewsletters = async (): Promise<GetAllNewslettersType> => {
  try {
    const cookieStore = await cookies();

    const response = await fetch(`${env.API_URL}/api/newsletters`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    if (!response.ok) {
      console.error(`Get all newsletter DAL error`, {
        status: response.status,
        statusText: response.statusText,
        body: await response.text(),
      });

      return [];
    }

    const data = await response.json();

    return GetAllNewslettersSchema.parse(data);
  } catch (error) {
    console.error('DAL newsletter error', error);
    return [];
  }
};
