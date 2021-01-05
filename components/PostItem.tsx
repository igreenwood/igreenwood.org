import { PostData } from '../interfaces'
import Date from './Date'
import Link from 'next/link'
import styles from './PostItem.module.css'
import commonStyles from '../styles/utils.module.css'

type Props = {
    postData: PostData
}

export default function PostItem({ postData }: Props){
    return <li>
            <article>
                <section>
                    <div className={styles.date}>
                        <Date dateString={postData.date}/>
                    </div>
                    <h2 className={commonStyles.headingM}>
                        <Link href="/posts/[id]" as={ `/posts/${postData.id}` }>
                            <a>{ postData.title }</a>
                        </Link>
                    </h2>
                </section>
            </article>
        </li>
}