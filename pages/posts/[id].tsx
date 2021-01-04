import Layout from '../../components/Layout'
import { PostData } from '../../interfaces'
import { getAllPostIds, getPostData } from '../../utils/post-util'
import PostDetail from '../../components/PostDetail'

type Props = {
    postData?: PostData
    errors?: string
}

export default function PostDetailPage({ postData, errors}: Props){
    if(errors){
        return(
            <Layout>
                <p>{ errors }</p>
            </Layout>
        )
    }

    return <Layout>
        { postData && <PostDetail postData={ postData }/> }
    </Layout>
}

export async function getStaticPaths() {
    const paths = await getAllPostIds()
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }: any) {
    const postData = await getPostData(params.id)
    return {
        props: {
            postData
        }
    }
}