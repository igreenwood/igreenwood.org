import { PostData } from '../interfaces'
import PostItem from './PostItem'
import styles from './Posts.module.css'

type Props = {
    postsData: PostData[]
}

export default function Posts({ postsData }: Props) {
    
    return <article>
            <figure>
                <img src="/images/cover7.jpg" className={ styles.coverImage }/>
            </figure>

            <h1 className={styles.title}>Posts</h1>

            <ul className={styles.list}>
                { postsData.map((postData) => <PostItem postData={postData}/>) }
            </ul>
    </article>

}