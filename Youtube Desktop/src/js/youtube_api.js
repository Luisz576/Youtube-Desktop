const { youtube_api_key } = require('../server/configs.json')

class Video{
    constructor(video){
        this.id = video['id']['videoId']
        this.title = video['snippet']['title']
        this.description = video['snippet']['description']
        this.thumbnail = video['snippet']['thumbnails']['high']['url']
        this.channelTitle = video['snippet']['channelTitle']
        this.publishedAt = video['snippet']['publishedAt']
    }
}

class YoutubeApi{
    URL_BASE = 'https://www.googleapis.com/youtube/v3/'

    async search(query, pageToken="", callback = (_result)=>{}){
        const searchQuery = `${this.URL_BASE}search?part=snippet&q=${query}${pageToken !== "" ? `&maxResults=10&pageToken=${pageToken}` : ''}&key=${youtube_api_key}`
        const response = await fetch(searchQuery)
        const resultJson = await response.json()
        callback(resultJson)
    }
}

const Api = new YoutubeApi()