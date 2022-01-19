const all_videos_searched = document.getElementById('all-videos-searched')

var currentQuery = ''
var nextPageToken = ""

const videos = []
var loading = false

function videoHandle(videoId){
    window.aplication.openPage('watch.html', currentTheme, videoId)
}

function hasVideo(videoId){
    let has = false
    videos.forEach(video => {
        if(video.id == videoId)
            has = true
    })
    return has
}

function search(q){
    videos.splice(0, videos.length)
    nextPageToken = ""
    currentQuery = q
    searchMore()
}

//SCROLL
function scroller(){
    const videos = document.getElementsByClassName('video-searched')
    let lastVideo = 0
    for(let i = 0; i < videos.length; i++){
        if(videos[i].getBoundingClientRect().top > lastVideo)
            lastVideo = videos[i].getBoundingClientRect().top
    }
    const isInLast = lastVideo - (window.innerHeight * 0.6) < 0
    if(isInLast && !loading)
        searchMore()
}

window.addEventListener('scroll', scroller)

//VIDEOS
function _updateVideos(){
    let videosContentHTML = ''
    videos.forEach(video => {
        videosContentHTML += `<div class="video-searched">
            <div class="video-image">
                <img onclick="videoHandle('${video.id}')" src="${video.thumbnail}">
            </div>
            <div class="video-content">
                <h3>${video.title}</h3>
                <p>${video.description}</p>
                <span>Publicado dia ${video.publishedAt}</span>
            </div>
        </div>`
    })
    all_videos_searched.innerHTML = videosContentHTML
}

function _buildMoreVideos(result){
    result['items'].forEach(video => {
        if(video['id']['kind'] === 'youtube#video')
            if(!hasVideo(video['id']['videoId']))
                videos.push(new Video(video))
    })
    nextPageToken = result['nextPageToken']
    _updateVideos()
    loading = false
}

function searchMore(){
    loading = true
    Api.search(currentQuery, nextPageToken, _buildMoreVideos)
}

setTimeout(() => {
    if(all_videos_searched.innerHTML === "")
        window.aplication.openPage('index.html', currentTheme, 'Falha na busca')
}, 3000)