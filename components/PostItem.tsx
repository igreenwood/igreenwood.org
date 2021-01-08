import { PostData } from '../interfaces'
import Date from './Date'
import Link from 'next/link'
import styles from './PostItem.module.css'
import commonStyles from '../styles/utils.module.css'

type Props = {
    postData: PostData
}

export default function PostItem({ postData }: Props){
    const tagString = postData.tags.map((tag) => tag.name).reduce((name1, name2) => `${name1}, ${name2}`)
    return <article>
    <section>
        <h2>
            <Link href="/posts/[id]" as={ `/posts/${postData.fileName}` }>
                <a className={commonStyles.headingM}>{ postData.title }</a>
            </Link>
        </h2>
        <div className={styles.attributes}>
            <span><Date dateString={ postData.date }/></span><span className={styles.tags}>CATEGORY: { tagString }</span>
        </div>
    </section>
</article>
}