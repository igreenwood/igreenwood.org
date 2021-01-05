import { PostData } from '../interfaces'
import PostItem from './PostItem'
import styles from './Posts.module.css'
import commonStyles from '../styles/utils.module.css'
import Container from './Container'

type Props = {
    postsData: PostData[]
}

export default function Posts({ postsData }: Props) {
    
    return <article>
            <figure>
                <img src="/images/cover7.jpg" className={ styles.coverImage }/>
            </figure>
            <Container>
                <h1 className={`${commonStyles.headingL} ${styles.title}`}>Posts</h1>
                    <ul className={styles.list}>
                        { postsData.map((postData) => <PostItem postData={postData}/>) }
                    </ul>
            </Container>
    </article>

}