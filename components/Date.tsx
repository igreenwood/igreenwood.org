import { format } from '../utils/date-util'

type Props = {
    dateString: string
}

export default function Date({ dateString }: Props) {
    return <time dateTime={dateString}>{format({dateString})}</time>
}