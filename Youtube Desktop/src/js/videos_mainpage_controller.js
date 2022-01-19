const videosContent = document.getElementById('content-videos')
const videosMainPage = []
var nextPageToken = ""
var loading = false

function hasVideo(videoId){
    let has = false
    videosMainPage.forEach(video => {
        if(video.id === videoId)
            has = true
    })
    return has
}

function videoClickHandle(videoId){
    window.aplication.openPage('watch.html', currentTheme, videoId)
}

function _updateVideos(){
    function smallTitle(title=''){
        return title.length <= 24 ? title : `${title.substring(0, 24)}...`
    }
    let videosContentHTML = ''
    videosMainPage.forEach(video => {
        videosContentHTML += `<div class="video-main-page" onclick="videoClickHandle('${video.id}')">
            <img src="${video.thumbnail}">
            <div>
                <p>${smallTitle(video.title)}</p>
                <span>Publicado dia ${video.publishedAt}</span>
            </div>
        </div>`
    })
    videosContent.innerHTML = videosContentHTML;
}

function _buildMoreVideos(result){
    result['items'].forEach(video => {
        if(video['id']['kind'] === 'youtube#video')
            if(!hasVideo(video['id']['videoId']))
                videosMainPage.push(new Video(video))
    })
    nextPageToken = result['nextPageToken']
    _updateVideos()
    loading = false
}

//SCROLL
function scroller(){
    const videos = document.getElementsByClassName('video-main-page')
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

function searchMore(){
    loading = true
    Api.search('minecraft', nextPageToken, _buildMoreVideos)
}

searchMore()