function render () {
    var grid = document.querySelector(".grid");
    for (var index = 0; index < cards.length; index++) {
        var card = cards[index];
        var img = document.createElement("img")
        img.src = card.src
        grid.appendChild(img);        
    }
}
render();