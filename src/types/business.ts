export interface BusinessLocation {
  name: string;
  id: string;
  address: string;
}

export interface Review {
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