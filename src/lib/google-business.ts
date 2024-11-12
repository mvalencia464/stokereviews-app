import { auth } from './firebase';

interface BusinessLocation {
  name: string;
  id: string;
  address: string;
}

interface Review {
  name: string;
  reviewId: string;
  reviewer: {
    displayName: string;
    profilePhotoUrl: string;
  };
  starRating: number;
  comment: string;
  createTime: string;
  updateTime: string;
}

const BASE_URL = 'https://mybusinessbusinessinformation.googleapis.com/v1';

// Add logging for debugging
export async function fetchBusinessLocations(): Promise<BusinessLocation[]> {
  const user = auth.currentUser;
  if (!user) throw new Error('User not authenticated');

  try {
    const token = await user.getIdToken(true);
    console.log('Fetching business locations...');
    
    const accountsResponse = await fetch(
      `${BASE_URL}/accounts`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!accountsResponse.ok) {
      const error = await accountsResponse.json();
      console.error('Accounts API Error:', error);
      throw new Error(error.error?.message || 'Failed to fetch business accounts');
    }

    const accountsData = await accountsResponse.json();
    console.log('Accounts data:', accountsData);
    
    const account = accountsData.accounts?.[0];
    if (!account) {
      throw new Error('No business account found');
    }

    const locationsResponse = await fetch(
      `${BASE_URL}/accounts/${account.name}/locations`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!locationsResponse.ok) {
      const error = await locationsResponse.json();
      console.error('Locations API Error:', error);
      throw new Error(error.error?.message || 'Failed to fetch business locations');
    }

    const data = await locationsResponse.json();
    console.log('Locations data:', data);
    return data.locations || [];
  } catch (error: any) {
    console.error('Error fetching business locations:', error);
    throw new Error(error.message || 'Failed to fetch business locations');
  }
}

export async function fetchReviews(locationId: string): Promise<Review[]> {
  const user = auth.currentUser;
  if (!user) throw new Error('User not authenticated');

  try {
    const token = await user.getIdToken(true);
    console.log('Fetching reviews for location:', locationId);
    
    const response = await fetch(
      `${BASE_URL}/locations/${locationId}/reviews`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error('Reviews API Error:', error);
      throw new Error(error.error?.message || 'Failed to fetch reviews');
    }

    const data = await response.json();
    console.log('Reviews data:', data);
    return data.reviews || [];
  } catch (error: any) {
    console.error('Error fetching reviews:', error);
    throw new Error(error.message || 'Failed to fetch reviews');
  }
}