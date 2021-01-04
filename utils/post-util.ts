import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { PostData } from '../interfaces'

const postsDirectory = path.join(process.cwd(), 'posts')

export default async function getSortedPostsData() {
    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames.map(fileName => {
        const id = fileName.replace(/\.md$/, '')
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const matterResult = matter(fileContents)
        const postData: PostData = { 
            id: id,
            title: matterResult.data.title,
            date: matterResult.data.date,
            tags: matterResult.data.tags,
            markdownText: matterResult.content
        }
        return postData
    })

    return allPostsData.sort((a, b) => {
        if(a.date < b.date) {
            return 1
        } else {
            return -1
        }
    })
}

export async function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory)
    return fileNames.map(fileName => {
        return { 
            params: { 
                id: fileName.replace(/\.md$/, '') 
            }
        } 
    })
}

export async function getPostData(id: string) {
    const fullPath = path.join(postsDirectory, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)
    return {
        id: id,
        title: matterResult.data.title,
        date: matterResult.data.date,
        tags: matterResult.data.tags,
        markdownText: matterResult.content
    }
}