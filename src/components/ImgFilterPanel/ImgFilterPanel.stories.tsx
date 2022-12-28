import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import ImgFilterPanel from './ImgFilterPanel';
import styles from './ImgFilterPanel.module.scss';

export default {
  title: 'ImgFilterPanel',
  component: ImgFilterPanel,
} as ComponentMeta<typeof ImgFilterPanel>;

// eslint-disable-next-line react/function-component-definition,react/prop-types
const Template: ComponentStory<typeof ImgFilterPanel> = (props) => {
  return (
    <div className={styles['sb-filter-panel-wrapper']}>
      <ImgFilterPanel {...props} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  selectedPhoto: {
    imgUrl:
      'https://images.unsplash.com/photo-1669234447681-1f9cdeaf7071?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzODMyODh8MHwxfGFsbHwzfHx8fHx8Mnx8MTY2OTM3MzI3NA&ixlib=rb-4.0.3&q=80&w=1080',
    altText: 'Lost in the orange.',
    profileUrl:
      'https://images.unsplash.com/profile-1604758536753-68fd6f23aaf7image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=128&h=128',
    username: 'marekpiwnicki',
    bio: 'If you want to use my pics you need to: a) Respect the nature! b) Become vege! c) Be aware!  d) Stop polluting!\r\n(Just kidding. Thanks for using them in any form 👍) 🐷💰 > PayPal > ❤️🌍🌄🖥️🙌',
    location: 'Gdynia | Poland',
    color: '#d95926',
  },
};
