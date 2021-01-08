import Layout from '../../components/Layout'
import { PostData } from '../../interfaces'
import Posts from '../../components/Posts'
import { getPosts } from '../../utils/graphcms'

type Props = {
    postsData: PostData[]
}

export default function PostsPage({ postsData }: Props){
    return <Layout>
        <Posts postsData={ postsData }/>
    </Layout>
}

export async function getStaticProps() {
    const { data } = await getPosts()
    const allPostsData = data.posts as PostData[]
    return {
        props: {
            postsData: allPostsData
        }
    }
}