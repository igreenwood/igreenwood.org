import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { gql } from '@apollo/client'

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
  projects(orderBy: order_ASC) {
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
    squareImageUrl {
      url
      width
      height
    }
    order
    shouldHighlight
  }
}
`

export async function getProjects(){
    return graphcmsClient.query({
        query: GET_PROJECTS
    })
}

const GET_PROFILE = gql`
    query GetProfile {
        profile(where: { id: "ckjnn6eb4pyba0b96r049itia" } ) {
            awardData {
                timelines {
                    date
                    description
                    index
                    title
                }
            }
            careerData {
                timelines {
                    date
                    description
                    title
                    index
                }
            }
            contactData {
                githubUrl
                email
                linkedInUrl
                twitterUrl
            }
            description
            educationData {
                timelines {
                    date
                    description
                    title
                    index
                }
            }
            job
            name
            skillData {
                mainSkill {
                    skills {
                        name
                        category
                    }
                }
                subSkill {
                    skills {
                        name
                        category
                    }
                }
            }
        }
    }
`

export async function getProfile(){
    return graphcmsClient.query({
        query: GET_PROFILE
    })
}

const GET_POSTS = gql`
    query GetPosts {
        posts(orderBy: date_DESC) {
            date
            fileName
            markdownText
            title
            tags {
                name
            }
        }
    }
`

export async function getPosts(){
    return graphcmsClient.query({
        query: GET_POSTS
    })
}