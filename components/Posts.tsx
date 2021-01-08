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
                <div className={ styles.fixedRatioWrapper }>
                    <div className={ styles.imageContainer }>
                        <img className={ styles.coverImage }src="/images/cover7.jpg"/>
                    </div>
                </div>
            </figure>
            <Container>
                <h1 className={`${commonStyles.headingL} ${styles.title}`}>Posts</h1>
                    <ul className={styles.list}>
                        { postsData.map((postData) => <li key={postData.fileName}><PostItem postData={postData}/></li>) }
                    </ul>
            </Container>
    </article>

}