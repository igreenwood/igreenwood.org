import { PostData } from '../interfaces'
import Date from './Date'
import ReactMarkdown from 'react-markdown'

type Props = {
    postData: PostData
}

export default function PostDetail({ postData }: Props){
    return <article>
        <Date dateString={ postData.date } dateFormat={ "yyMMdd" }/>
        <h1>{ postData.title }</h1>
        <span>{ postData.tags }</span>
        <ReactMarkdown source={ postData.markdownText } />
    </article>
}