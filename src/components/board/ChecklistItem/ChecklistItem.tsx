import { FC, useState } from 'react';

import { MdCheckBoxOutlineBlank as UncheckedIcon, MdCheckBox as CheckedIcon, MdDelete } from 'react-icons/md';

import { Editable, Button } from 'components/common';

import { ChecklistItem } from 'store/slices';

import { ChecklistItemWrapper, Checkbox, CheckboxWrapper, ItemTitle } from './styles';

import { O } from 'ts-toolbelt';

export interface ChecklistItemProps {
  item: ChecklistItem;
  onChange: (value: O.Required<Partial<ChecklistItem>, 'id' | 'checklistId'>) => void;
  onDelete: (itemToDelete: ChecklistItem) => void;
}

export const ChecklistItemComponent: FC<ChecklistItemProps> = ({ item, onChange, onDelete }) => {
  const [title, setTitle] = useState(item.title);

  const resetTitle = () => setTitle('');

  const renameItem = () => onChange({ checklistId: item.checklistId, id: item.id, title });
  const toggleItem = () => onChange({ checklistId: item.checklistId, id: item.id, completed: !item.completed });
  const deleteItem = () => onDelete(item);

  const submit = () => {
    if (!title) return;
    renameItem();
  };

  return (
    <ChecklistItemWrapper>
      <CheckboxWrapper>
        <Checkbox onClick={toggleItem} as={item.completed ? CheckedIcon : UncheckedIcon} />
      </CheckboxWrapper>
      <ItemTitle
        $completed={item.completed}
        value={title}
        onChange={setTitle}
        onSubmit={submit}
        onCancel={resetTitle}
        clickAwayAction="submit"
        submitOnEnter
      />
      <Button icon={MdDelete} onClick={deleteItem} />
    </ChecklistItemWrapper>
  );
};

export { ChecklistItemComponent as ChecklistItem };
