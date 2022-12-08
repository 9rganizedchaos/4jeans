import { Photo } from '../types/photo';

/* eslint-disable-next-line import/prefer-default-export */
export const simplifyData = (rawData: any[]): Photo[] => {
  return rawData.map((data) => {
    return {
      imgUrl: data.urls.small,
      altText: data.alt_description || '4jeans photo',
      profileUrl: data.user.profile_image.medium,
      username: data.user.name,
      bio: data.user.bio,
      location: data.user.location,
      color: data.color,
    };
  });
};
