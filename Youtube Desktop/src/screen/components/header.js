document.getElementById('component-header').innerHTML = `<header>
    <div class="header-img-logo">
        <img id="logo-img" class="img-logo" src=""/>
    </div>
    <div class="header-search-camp">
        <div>
            <input id="search-camp" name="q" placeholder="Pesquisar" maxlength="30"/>
        </div>
        <div id="button-search" class="search-button">
            <img id="search-button-img" src="">
        </div>
    </div>
    <div class="header-profile">
        <img id="profile-img" src="">
    </div>
</header>`

//FUNCTIONS
document.getElementById('logo-img').onclick = () => {
    window.aplication.openPage('index.html', currentTheme)
}

document.getElementById('button-search').onclick = () => {
    _search()
}

document.getElementsByClassName('header-profile')[0].onclick = () => {
    alert('Não foi implementado um sistema de perfil')
}

window.addEventListener('keydown', (event) => {
    if(event.key === 'Enter')
        _search()
})

function _search(){
    const q = document.getElementById('search-camp').value
    window.aplication.openPage('search.html', currentTheme, q)
}