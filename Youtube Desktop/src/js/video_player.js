window.aplication.on('open-page', (event, args) => {
    changeTheme(args[0])
    document.getElementById('watch-player').src = `https://www.youtube.com/embed/${args[1]}?autoplay=1`
    document.getElementById('loading').classList.add('no-display')
})

setTimeout(() => {
    if(document.getElementById('watch-player').src === "")
        window.aplication.openPage('index.html', currentTheme, 'Falha ao carregar vídeo!')
}, 3000)