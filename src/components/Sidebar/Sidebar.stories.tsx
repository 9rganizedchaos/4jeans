import React from 'react';
import { ComponentMeta } from '@storybook/react';
import Sidebar from './Sidebar';
import MOCK_PHOTOS from '../../mocks/images';

export default {
  title: 'Sidebar',
  component: Sidebar,
} as ComponentMeta<typeof Sidebar>;

export function Default() {
  const handleMoreBtnClick = () => {
    console.log('More button clicked');
  };

  return <Sidebar photos={MOCK_PHOTOS} handleMoreBtnClick={handleMoreBtnClick} />;
}

export function NoCard() {
  const handleMoreBtnClick = () => {
    console.log('More button clicked');
  };

  return <Sidebar photos={[]} handleMoreBtnClick={handleMoreBtnClick} />;
}
