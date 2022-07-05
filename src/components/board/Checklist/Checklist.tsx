import { FC, useState } from 'react';

import { useDispatch } from 'react-redux';
import { filter, pick, values, compact } from 'lodash';

import { Button, Editable } from 'components/common';
import { CreateChecklistItem, ChecklistItem } from 'components/board';

import {
  Checklist,
  deleteChecklistAction,
  UpdateChecklistItem,
  updateChecklistItemAction,
  deleteChecklistItemAction,
  ChecklistItem as IChecklistItem,
} from 'store/slices/board';

import {
  ChecklistHeader,
  ChecklistWrapper,
  ChecklistBody,
  ChecklistItems,
  Progress,
  ProgressValue,
  ProgressBar,
} from './styles';

export interface CheckListProps {
  checklist: Checklist;
}

export const ChecklistComponent: FC<CheckListProps> = ({ checklist }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState(checklist.title);

  const resetTitle = () => setTitle(checklist.title);
  const deleteChecklist = () => dispatch(deleteChecklistAction(checklist.id));

  const updateChecklistItem = (item: UpdateChecklistItem) => dispatch(updateChecklistItemAction(item));
  const deleteChecklistItem = (item: IChecklistItem) => dispatch(deleteChecklistItemAction(item));

  const maxProgress = checklist.itemIds.length;
  const progress = filter(values(checklist.items), 'completed').length;
  const progressPercentage = Math.round((progress / (maxProgress || 1)) * 100);

  const items = compact(values(pick(checklist.items, checklist.itemIds)));

  return (
    <ChecklistWrapper>
      <ChecklistHeader>
        <Editable value={title} onChange={setTitle} clickAwayAction="cancel" onCancel={resetTitle} />
        <Button variant="secondary" onClick={deleteChecklist}>
          Delete
        </Button>
      </ChecklistHeader>
      <Progress>
        <ProgressValue>{progressPercentage}%</ProgressValue>
        <ProgressBar $value={progress} $max={maxProgress} />
      </Progress>
      <ChecklistBody>
        <ChecklistItems>
          {items.map(item => (
            <ChecklistItem key={item.id} item={item} onChange={updateChecklistItem} onDelete={deleteChecklistItem} />
          ))}
        </ChecklistItems>
        <CreateChecklistItem checklistId={checklist.id} />
      </ChecklistBody>
    </ChecklistWrapper>
  );
};

export { ChecklistComponent as Checklist };
