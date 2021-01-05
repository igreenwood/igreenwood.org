import { PostData } from '../interfaces'
import Date from './Date'
import ReactMarkdown from 'react-markdown'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { github } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import styles from './PostDetail.module.css'
import Container from './Container'
// import markdownStyles from '../styles/markdown.module.scss'

type RendererProps = {
    language: string
    value: string
}

function Renderer({ language, value }: RendererProps ){
    return <SyntaxHighlighter language={language} style={github}>
        {value}
    </SyntaxHighlighter>
}

type Props = {
    postData: PostData
}

export default function PostDetail({ postData }: Props){
    return <article>
            <figure>
                <div className={ styles.fixedRatioWrapper }>
                    <div className={ styles.imageContainer }>
                        <img className={ styles.coverImage }src="/images/cover7.jpg"/>
                    </div>
                </div>
            </figure>
            <Container>
                <Date dateString={ postData.date }/>
                <h1>{ postData.title }</h1>
                <span>{ postData.tags }</span>
                {/* <div className={markdownStyles.container}>
                    <ReactMarkdown source={postData.markdownText} renderers={{code: Renderer}}/>
                </div> */}
                <ReactMarkdown source={postData.markdownText} renderers={{code: Renderer}}/>
            </Container>
    </article>
}