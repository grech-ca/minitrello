import { pick, values } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from 'store'
import { Card, createChecklistAction } from 'store/slices'
import { deleteCardAction, updateCardAction } from 'store/slices'

export const useCard = (id: string) => {
  const dispatch = useDispatch()

  const removeCard = () => dispatch(deleteCardAction(id))
  const updateCard = (payload: Omit<Partial<Card>, 'id'>) =>
    dispatch(updateCardAction({ id, ...payload }))

  const card = useSelector((state: RootState) => (id ? state.board.cards[id] : null))
  const checklists = useSelector((state: RootState) => {
    if (!card) return []
    return Object.values(pick(state.board.checklists, card.checklistIds))
  })
  const allLabels = useSelector((state: RootState) => state.board.labels)
  const labels = card ? values(pick(allLabels, card?.labelIds)) : []

  const addChecklist = (title: string) => dispatch(createChecklistAction({ cardId: id, title }))

  return {
    removeCard,
    updateCard,
    card,
    checklists,
    labels,
    addChecklist,
  }
}
