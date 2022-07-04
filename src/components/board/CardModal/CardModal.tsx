import { FC, useState } from 'react';

import { useParams, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Modal, ModalHeader, ModalClose, ModalBody } from 'components/modal';
import { EditableDescription } from 'components/board';

import { useEscape } from 'hooks';

import { RootState } from 'store';
import { updateCardAction } from 'store/slices';

import { CardTitle } from './styles';

export const CardModal: FC = () => {
  const { cardId } = useParams<{ cardId: string }>();

  const dispatch = useDispatch();

  const card = useSelector((state: RootState) => state.board.cards.find(({ id }) => id === cardId));

  const [title, setTitle] = useState(card?.title || '');
  const [description, setDescription] = useState(card?.description || '');

  const renameCard = () => card && dispatch(updateCardAction({ id: card.id, title }));
  const resetTitle = () => card && setTitle(card.title);
  const updateDescription = () => card && dispatch(updateCardAction({ id: card.id, description }));
  const resetDescription = () => card && setDescription(card.description || '');

  useEscape(close);

  if (!card) return <Navigate to="/" />;

  return (
    <Modal>
      <ModalHeader>
        <CardTitle value={title} onChange={setTitle} onSubmit={renameCard} onCancel={resetTitle} />
        <ModalClose />
      </ModalHeader>
      <ModalBody>
        <EditableDescription
          value={description}
          onChange={setDescription}
          onSubmit={updateDescription}
          onCancel={resetDescription}
        />
      </ModalBody>
    </Modal>
  );
};
