import { parseISO, format as _format } from 'date-fns'

type Props = {
    dateString: string
}

export function format({ dateString }: Props){
    const date: Date = parseISO(dateString)
    return _format(date, "LLL d, yyyy")
}