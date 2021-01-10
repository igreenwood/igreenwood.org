import Layout from '../../components/Layout'
import { PostData } from '../../interfaces'
import Posts from '../../components/Posts'
import { getPosts } from '../../utils/graphcms'
import { siteUrl } from '../../utils/constants'
import { OgData } from '../../interfaces'

type Props = {
    postsData: PostData[]
}

export default function PostsPage({ postsData }: Props){
    const ogData: OgData = {
        title: "Issei Aoki | Posts",
        type: "article",
        url: `${siteUrl}/posts`,
        image: "/images/cover7.jpg"
    }
    return <Layout ogData={ogData}>
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