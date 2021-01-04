import { parseISO, format } from 'date-fns'

type Props = {
    dateString: string
    dateFormat: string
}

export default function Date({ dateString, dateFormat }: Props) {
    const date = parseISO(dateString)
    return <time dateTime={dateString}>{format(date, dateFormat)}</time>
}