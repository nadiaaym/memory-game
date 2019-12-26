var state = {
    selectedCards: [],
    matches: 0,
    isWorking: false
}

function restart() {
    shuffle(cards);
    state.matches = 0;
    render();
}
function render() {

    var grid = document.querySelector(".grid");
    grid.innerHTML = '';
    for (var index = 0; index < cards.length; index++) {
        var card = cards[index];

        var container = document.createElement('div');
        container.className = 'image-container';
        container.onclick = onCardClick.bind(event, card);

        var img = document.createElement("img");
        img.src = card.src;

        container.appendChild(img);

        grid.appendChild(container);
    }
}
render();
function onCardClick(selectedCard, nadiasClickEvent) {
    var alreadyInState = findMe(
        function (alreadySelectedCard) {
            return alreadySelectedCard.id === selectedCard.id;
        },
        state.selectedCards
    );

    if (alreadyInState || state.isWorking) {
        return;
    }

    if (state.selectedCards.length < 2) {
        state.selectedCards.push({ ...selectedCard, element: nadiasClickEvent.target });
        nadiasClickEvent.target.classList.add('selected');
    }

    if (state.selectedCards.length === 2) {
        if (isMatch()) {
            console.log('MATCH!');
            state.matches++;
            if (isWin()) {
                onWin();
            }
        } else {
            console.log('WRONG!!!');
            for (let index = 0; index < state.selectedCards.length; index++) {
                const stateSelectedCard = state.selectedCards[index];
                setTimeout(() => {
                    stateSelectedCard.element.classList.remove('selected');
                    state.isWorking = false;
                }, 2500);
                state.isWorking = true;
            }
        }
        state.selectedCards = [];
    }
}

function onWin() {
    Swal.fire({
        title: 'Good JOB ! Play Again',
        text: 'Do you want to continue',
        icon: 'success',
        confirmButtonText: 'Cool'
    })
    .then(() => restart());
}

function isWin() {
    return cards.length / 2 === state.matches;
}

function isMatch() {
    return state.selectedCards[0].pair === state.selectedCards[1].pair;
}

function findMe(myAmazingCallBack, myAmazingArray) {
    for (let index = 0; index < myAmazingArray.length; index++) {
        var eachItem = myAmazingArray[index];
        var exists = myAmazingCallBack(eachItem);
        if (exists === true) {
            return eachItem;
        }
    }
}
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}
