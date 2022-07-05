import { FC, useState } from 'react';

import { useParams, Navigate, useNavigate, useMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineLoyalty, MdOutlineCheckBox, MdDeleteOutline } from 'react-icons/md';
import slugify from 'slugify';
import { Helmet } from 'react-helmet';

import {
  Modal,
  ModalHeader,
  ModalClose,
  ModalBody,
  ModalSidebar,
  ModalSidebarHeading,
  ModalContent,
} from 'components/modal';
import { EditableDescription } from 'components/board';
import { Button } from 'components/common';

import { useEscape } from 'hooks';

import { RootState } from 'store';
import { updateCardAction, deleteCardAction } from 'store/slices';

import { CardTitle } from './styles';

export const CardModal: FC = () => {
  const { cardId } = useParams<{ cardId: string }>();
  const navigate = useNavigate();
  const match = useMatch('/c/:cardId');

  const dispatch = useDispatch();

  const card = useSelector((state: RootState) => (cardId ? state.board.cards[cardId] : null));

  const [title, setTitle] = useState(card?.title || '');
  const [description, setDescription] = useState(card?.description || '');

  useEscape(close);

  if (!card) return <Navigate to="/" />;

  const fullPath = `/c/${card.id}/${slugify(title) || `${card.id}-untitled`}`;

  if (match) return <Navigate to={fullPath} replace />;

  const renameCard = () => {
    if (!card) return;
    dispatch(updateCardAction({ id: card.id, title }));
    navigate(fullPath, { replace: true });
  };
  const deleteCard = () => {
    if (!card) return;
    dispatch(deleteCardAction(card.id));
    navigate('/');
  };
  const resetTitle = () => card && setTitle(card.title);
  const updateDescription = () => card && dispatch(updateCardAction({ id: card.id, description }));
  const resetDescription = () => card && setDescription(card.description || '');

  return (
    <Modal>
      <Helmet>
        <title>{card.title} | Minitrello</title>
      </Helmet>
      <ModalHeader>
        <CardTitle
          value={title}
          onChange={setTitle}
          onSubmit={renameCard}
          onCancel={resetTitle}
          clickAwayAction="submit"
        />
        <ModalClose />
      </ModalHeader>
      <ModalBody>
        <ModalContent>
          <EditableDescription
            value={description}
            onChange={setDescription}
            onSubmit={updateDescription}
            onCancel={resetDescription}
          />
        </ModalContent>
        <ModalSidebar>
          <ModalSidebarHeading>Add to card</ModalSidebarHeading>
          <Button variant="secondary" icon={MdOutlineLoyalty}>
            Labels
          </Button>
          <Button variant="secondary" icon={MdOutlineCheckBox}>
            Checklist
          </Button>
          <ModalSidebarHeading>Actions</ModalSidebarHeading>
          <Button variant="secondary" icon={MdDeleteOutline} onClick={deleteCard}>
            Delete
          </Button>
        </ModalSidebar>
      </ModalBody>
    </Modal>
  );
};
