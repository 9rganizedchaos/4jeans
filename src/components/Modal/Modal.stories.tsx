import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Modal from './Modal';
import styles from './Modal.module.scss';

export default {
  title: 'Modal',
  component: Modal,
} as ComponentMeta<typeof Modal>;

// eslint-disable-next-line react/function-component-definition,react/prop-types
const Template: ComponentStory<typeof Modal> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = React.useMemo(() => {
    return () => setIsOpen(false);
  }, [isOpen]);

  return (
    <>
      <button className={styles['sb-modal-opener']} type="button" onClick={() => setIsOpen(true)}>
        모달 열기
      </button>
      <Modal isOpen={isOpen} onClose={onClose}>
        {children}
      </Modal>
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  children: <div className={styles['sb-modal-content']} />,
};
