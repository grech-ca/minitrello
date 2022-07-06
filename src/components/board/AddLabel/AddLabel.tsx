import { FC, useState, Fragment } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { values } from 'lodash';
import { MdCheck, MdChevronLeft, MdOutlineMode } from 'react-icons/md';

import { Popup, PopupProps, PopupHeader, PopupBody, PopupActions, Button, Fill } from 'components/common';

import { RootState } from 'store';
import {
  Card,
  Label as ILabel,
  addLabelAction,
  removeLabelAction,
  createLabelAction,
  deleteLabelAction,
  updateLabelAction,
  COLORS,
} from 'store/slices/board';

import {
  Label,
  LabelContainer,
  LabelList,
  LabelEditButton,
  Palette,
  PaletteItem,
  NoColorMessage,
  LabelNameInput,
  LabelEditor,
} from './styles';

export interface AddLabelProps extends Omit<PopupProps, 'children'> {
  card: Card;
}

export const AddLabel: FC<AddLabelProps> = ({ card, ...props }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [color, setColor] = useState<string | null>('');
  const [labelToEdit, setLabelToEdit] = useState<ILabel | null>(null);

  const isNew = labelToEdit?.id === 'NEW';

  const labels = useSelector((state: RootState) => state.board.labels);
  const labelsList = values(labels);

  const startEditing = (labelId: string) => {
    const isNew = labelId === 'NEW';

    if (!isNew) {
      const targetLabel = labels[labelId];
      setLabelToEdit(targetLabel);

      setName(targetLabel.name);
      setColor(targetLabel.color);
    } else {
      setLabelToEdit({ id: 'NEW', name: '', color: COLORS[0] });
      setName('');
      setColor(COLORS[0]);
    }
  };
  const stopEditing = () => {
    setLabelToEdit(null);
    setName('');
  };
  const toggleLabel = (labelId: string) => {
    if (!card.labelIds.includes(labelId)) {
      return dispatch(addLabelAction({ cardId: card.id, id: labelId }));
    }
    return dispatch(removeLabelAction({ cardId: card.id, id: labelId }));
  };
  const deleteLabel = () => {
    if (!labelToEdit) return;
    return dispatch(deleteLabelAction(labelToEdit.id));
  };
  const createLabel = () => {
    dispatch(createLabelAction({ name, color: color || null }));
    stopEditing();
  };
  const updateLabel = () => {
    if (!labelToEdit) return;
    dispatch(updateLabelAction({ name, color: color || null, id: labelToEdit.id }));
    stopEditing();
  };

  return (
    <Popup {...props}>
      <PopupHeader>
        {labelToEdit ? (
          <Fragment>
            <Button icon={MdChevronLeft} onClick={stopEditing} />
            Update label
          </Fragment>
        ) : (
          'Labels'
        )}
      </PopupHeader>
      <PopupBody>
        {labelToEdit ? (
          <LabelEditor>
            <label htmlFor="label-name">Name</label>
            <div>
              <LabelNameInput value={name} onChange={setName} id="label-name" minRows={1} maxRows={1} autoFocus />
            </div>
            <label>Select a color</label>
            <Palette>
              {COLORS.map((constColor: string, index: number) => (
                <PaletteItem
                  key={constColor}
                  $color={constColor}
                  onClick={() => setColor(COLORS.length - 1 === index ? null : constColor)}
                >
                  {(color ?? COLORS[COLORS.length - 1]) === constColor && <MdCheck />}
                </PaletteItem>
              ))}
              <NoColorMessage>
                <p>No color.</p>
                <p>This won&apos;t show up on the front of cards.</p>
              </NoColorMessage>
            </Palette>
          </LabelEditor>
        ) : (
          <LabelList>
            {labelsList.map(label => (
              <LabelContainer key={label.id}>
                <Label $color={label.color} onClick={() => toggleLabel(label.id)}>
                  {label.name}
                  <Fill />
                  {card.labelIds.includes(label.id) && <MdCheck />}
                </Label>
                <LabelEditButton icon={MdOutlineMode} onClick={() => startEditing(label.id)} />
              </LabelContainer>
            ))}
          </LabelList>
        )}
      </PopupBody>
      <PopupActions>
        {labelToEdit ? (
          <Fragment>
            <Button variant="primary" onClick={isNew ? createLabel : updateLabel}>
              {isNew ? 'Create' : 'Save'}
            </Button>
            <Fill />
            <Button variant="secondary" onClick={deleteLabel}>
              Delete
            </Button>
          </Fragment>
        ) : (
          <Button fullWidth variant="secondary" onClick={() => startEditing('NEW')}>
            Create a new label
          </Button>
        )}
      </PopupActions>
    </Popup>
  );
};
