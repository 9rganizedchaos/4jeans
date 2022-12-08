import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Sidebar from './Sidebar';
import MOCK_PHOTOS from '../../mocks/images';
import { simplifyData } from '../../utils/photo';

export default {
  title: 'Sidebar',
  component: Sidebar,
} as ComponentMeta<typeof Sidebar>;

// eslint-disable-next-line react/function-component-definition,react/prop-types
const Template: ComponentStory<typeof Sidebar> = ({ photos }) => {
  const handleMoreBtnClick = () => {
    console.log('More button clicked');
  };
  const handleLikeBtnClick = () => {
    console.log('Like button clicked');
  };

  return <Sidebar photos={photos} handleMoreBtnClick={handleMoreBtnClick} handleLikeBtnClick={handleLikeBtnClick} />;
};

export const Default = Template.bind({});
Default.args = {
  photos: simplifyData(MOCK_PHOTOS),
};

export const Empty = Template.bind({});
Empty.args = {
  photos: [],
};
