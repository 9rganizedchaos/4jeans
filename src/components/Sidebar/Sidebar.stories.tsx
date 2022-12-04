import React from 'react';
import { ComponentMeta } from '@storybook/react';
import Sidebar from './Sidebar';
import MOCK_PHOTOS from '../../mocks/images';

export default {
  title: 'Sidebar',
  component: Sidebar,
} as ComponentMeta<typeof Sidebar>;

export function Default() {
  return <Sidebar photos={MOCK_PHOTOS} />;
}
