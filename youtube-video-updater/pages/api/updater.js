
const fs = require('fs')
import { google } from 'googleapis'

const apiKey = process.env.YOUTUBE_API_KEY
const filePath = process.env.FILE_PATH
const authorizationKey = process.env.AUTHORIZATION_KEY

const authApiKey = google.auth.fromAPIKey(apiKey)
const service = google.youtube({ version: "v3" })

export default async function handler(req, res) {
    if (!validateAccess(req)) {
        return res.status(401).json({ success: false })
    }

    const { channel } = req.query

    const videos = await getVideoList(channel)

    const videoWithViews = await addViewsToVideos(videos)

    writeList(videoWithViews)

    return res.status(200).json({ success: true })
}

const validateAccess = (req) => {
    const providedKey = req.headers.authorization?.split(' ')[1]

    return providedKey === authorizationKey
}

const getVideoList = async (channelId) => {
    const { data: { items } } = await service.search.list({
        auth: authApiKey,
        part: ['id', 'snippet'],
        order: 'date',
        channelId,
        maxResults: 50
    })

    const videos = items.filter(item => item.id.kind == 'youtube#video')

    return videos.map(mapVideo)
}

const mapVideo = ({ id, snippet }) => {
    return {
        id: id.videoId,
        title: snippet.title,
        publishedAt: snippet.publishedAt,
        description: snippet.description,
        thumbnails: snippet.thumbnails
    }
}

const getNumberOfVisits = async (videoId) => {
    const response = await service.videos.list({
        auth: authApiKey,
        part: ['statistics'],
        id: [videoId],
        maxResults: 1
    })

    const { viewCount = 0 } = response?.data?.items[0]?.statistics

    return viewCount
}

const addViewsToVideos = async (videos) => {
    const list = await Promise.all(
        videos.map(async (video) => {
            const viewCount = await getNumberOfVisits(video.id)
    
            return {
                ...video,
                viewCount
            }
        })
    )
    
    return list
}

const writeList = (videos) => {
    const content = {
        lastUpdated: (new Date()).toISOString(),
        videos
    }

    fs.writeFileSync(filePath, JSON.stringify(content))
}