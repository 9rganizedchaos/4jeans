import React, { useEffect, useMemo, useState } from 'react';
import styles from './Modal.module.scss';
import Portal from '../Portal/Portal';

const MODAL_CLOSE_TIME = 200;

interface ModalContextType {
  onClose: () => void;
}

const ModalContext = React.createContext<ModalContextType>({
  onClose: () => console.log('modal close'),
});

export const useModalContext = () => {
  return React.useContext(ModalContext);
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function Modal({ isOpen, onClose, children }: ModalProps) {
  const [transitionIsOpen, setTransitionIsOpen] = useState(isOpen);
  const modalContextValue = useMemo(() => {
    return { onClose };
  }, []);

  useEffect(() => {
    if (isOpen) setTransitionIsOpen(true);
    else {
      setTimeout(() => setTransitionIsOpen(false), MODAL_CLOSE_TIME);
    }
  }, [isOpen]);

  return (
    <ModalContext.Provider value={modalContextValue}>
      {transitionIsOpen && (
        <Portal>
          <div
            className={`${styles['modal-container']} ${
              isOpen ? styles['modal-container-open'] : styles['modal-container-close']
            }`}
          >
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button type="button" className={styles['modal-container-overlay']} onClick={onClose} />
            <div className={styles['modal-container-innerContent']}>{children}</div>
          </div>
        </Portal>
      )}
    </ModalContext.Provider>
  );
}

export default Modal;
