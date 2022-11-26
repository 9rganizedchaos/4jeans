import { ComponentMeta } from '@storybook/react';
import PhotoCardList from "./PhotoCardList";
import {MOCK_PHOTOS} from "../../mocks/images";
import PhotoCard from "../PhotoCard/PhotoCard";

export default {
  title: 'PhotoCardList',
  component: PhotoCardList,
} as ComponentMeta<typeof PhotoCardList>;

export const Default = () => {
  return (
    <PhotoCardList>
      {MOCK_PHOTOS.map(photo => <PhotoCard imgUrl={photo.urls.regular} altText={photo.alt_description || "test image"} bio={photo.user.bio} username={photo.user.username} location={photo.user.location} profileUrl={photo.user.profile_image.large} color={photo.color}/>)}
    </PhotoCardList>
  )
}
