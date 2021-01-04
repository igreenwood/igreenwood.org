import Layout from '../../components/Layout'
import { PostData } from '../../interfaces'
import getSortedPostsData from '../../utils/post-util'
import Posts from '../../components/Posts'

type Props = {
    postsData: PostData[]
}

export default function PostsPage({ postsData }: Props){
    return <Layout>
        <Posts postsData={ postsData }/>
    </Layout>
}

export async function getStaticProps() {
    const allPostsData: PostData[] = await getSortedPostsData()
    return {
        props: {
            postsData: allPostsData
        }
    }
}