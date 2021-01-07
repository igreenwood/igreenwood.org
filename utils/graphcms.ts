import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

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

export const graphcmsClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
})