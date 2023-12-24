import { Link, Location } from 'react-router-dom'

export type LinkOverlayProps = {
  cardId: string
  backgroundLocation: Location
}

export const LinkOverlay = ({ cardId, backgroundLocation }: LinkOverlayProps) => {
  return <Link className="absolute inset-0" to={`/c/${cardId}`} state={{ backgroundLocation }} />
}
