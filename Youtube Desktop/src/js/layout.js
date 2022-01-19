var currentTheme = 0

_setupImages()

// THEME
function changeTheme(theme){
    currentTheme = theme
    const body = document.querySelector('body')
    //REMOVE
    body.classList.remove('light')
    body.classList.remove('dark')
    //ADD
    switch(theme){
        case 0:
            body.classList.add('light')
            break;
        case 1:
            body.classList.add('dark')
            break;
    }
    //IMAGES
    _setupImages()
}

function _setupImages(){
    let theme_prefix = ''
    if(currentTheme == 0)
        theme_prefix = 'light'
    else
        theme_prefix = 'dark'

    const img_logo = document.getElementsByClassName('img-logo')
    for(let index in img_logo)
        img_logo[index].src = `../img/${theme_prefix}-logo.png`

    document.getElementById('search-button-img').src = `../img/${theme_prefix}-lupa.png`
    document.getElementById('profile-img').src = `../img/${theme_prefix}-profile-icon.png`
}

window.aplication.on('theme-change', (_event, ...args) => {
    changeTheme(args[0])
})