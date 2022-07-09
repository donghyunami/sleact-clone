import React, { FC, MouseEvent, useCallback } from 'react';
import { CloseModalButton } from '@components/Menu/styles';
import { CreateModal } from '@components/Modal/styles';

interface Props {
  show: boolean;
  onCloseModal: () => void;
}
const Modal: FC<Props> = ({ show, children, onCloseModal }) => {
  const stopPropagation = useCallback((e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  }, []);

  if (!show) {
    return null;
  }

  return (
    <CreateModal onClick={onCloseModal}>
      <div onClick={stopPropagation}>
        <CloseModalButton onClick={onCloseModal}>&times;</CloseModalButton>
        {children}
      </div>
    </CreateModal>
  );
};

export default Modal;
