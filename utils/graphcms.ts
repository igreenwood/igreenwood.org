import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { gql, useLazyQuery } from '@apollo/client'

const httpLink = createHttpLink({
    uri: 'https://api-ap-northeast-1.graphcms.com/v2/ckjjyxr27duxq01z962dk4f57/master'
})

const authLink = setContext((_, { headers }) => {
    const token = process.env.GRAPHCMS_BEARER_TOKEN
    return {
        headers: {
            ...headers,
            authorization: `Bearer ${token}`
        }
    }
})

const graphcmsClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
})

const GET_PROJECTS =  gql`
    query GetProjects {
        projects {
            id
            name
            date
            title
            description
            genre
            part
            coverImageUrl {
                url
                width
                height
            }
            note
            tools
            links
            imageUrls {
                url
                width
                height
            }
            videoUrls {
                url
                width
                height
            }
        }
    }
`

export async function getProjects(){
    return graphcmsClient.query({
        query: GET_PROJECTS
    })
}