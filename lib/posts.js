import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts')

export async function getSortedMediumPostsData() {
  let mediumPosts = await fetchMediumPosts();
  const mediumPostsWithId = mediumPosts.map(post => {
    return {
      id: post.title, 
      ...post
    }
  })
  if (mediumPostsWithId.length === 0) {
    return []
  }
  // Sort posts by date
  return mediumPostsWithId.sort((a, b) => {
    if (a.pubDate < b.pubDate) {
      return 1
    } else {
      return -1
    }
  })
}

export async function getSortedFilesPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  let allPostsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      ...matterResult.data
    }
  })
  if (allPostsData.length === 0) {
    return []
  }
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.pubDate < b.pubDate) {
      return 1
    } else {
      return -1
    }
  })
}

export async function getAllMeduimPostsIds() {
  const mediumPosts = await fetchMediumPosts();
  return mediumPosts.map(post => {
    return {
      params: {
        id: post.title
      }
    }
  })
}

export async function getAllPostFilesIds() {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.map(fileName => {
    return {
      params:{
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
  
}

export async function getPostFileDataById(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`)

  if (!fs.existsSync(fullPath)) {
    return {}
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data
  }
}

export async function fetchMediumPosts(id) {
  const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@yuri-lima');
  const data = await response.json();
  return data.items;
}