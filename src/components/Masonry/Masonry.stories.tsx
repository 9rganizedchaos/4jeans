import { ComponentMeta } from '@storybook/react';
import {MOCK_PHOTOS} from "../../mocks/images";
import Masonry from "./Masonry";

export default {
  title: 'Masonry',
  component: Masonry,
} as ComponentMeta<typeof Masonry>;

export const Default = () => {
  return (
    <Masonry>{
      MOCK_PHOTOS.map(photo => <img src={photo.urls.regular} alt={photo.alt_description || "test image"}/>)
    }</Masonry>
  )
}
