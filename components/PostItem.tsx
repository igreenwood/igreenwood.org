import { PostData } from '../interfaces'
import Date from './Date'
import Link from 'next/link'

type Props = {
    postData: PostData
}

export default function PostItem({ postData }: Props){
    return <li>
            <article>
                <section>
                    <div>
                        <Date dateString={postData.date} dateFormat={"yyyyMMdd"}/>
                    </div>
                    <Link href="/posts/[id]" as={ `/posts/${postData.id}` }>
                        <a>
                            <h2>{ postData.title }</h2>  
                        </a>
                    </Link>
                </section>
            </article>
        </li>
}