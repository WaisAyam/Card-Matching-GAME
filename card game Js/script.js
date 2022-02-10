const cards = document.querySelectorAll('.card'); //1
//console.log(cards); //1
let cardOne, cardTwo;//4
let disableDeck = false; //8
let matchedCard = 0; //9


function flipCard(e){ //2
    //console.log(e.target); //2

    let clickedCard = e.target; //3 getting user clicked card
    // clickedCard.classList.add('flip'); //3

    // if(!cardOne){ //5
    //     return cardOne = clickedCard;//5 return the cardOne value to clickedCard
    // }

    // cardOne = clickedCard;//4
    // cardTwo = clickedCard;//4
    // console.log(cardOne, cardTwo);//4

    if(clickedCard !== cardOne && !disableDeck){ //6 (disableDeck is on 8)
        clickedCard.classList.add('flip');//6

        if(!cardOne){
            return cardOne = clickedCard; //6 return the cardOne value to clickedCard
        }

        // cardOne = clickedCard;//6
        cardTwo = clickedCard;//6
        //console.log(cardOne, cardTwo);//6

        disableDeck = true;//8

        let cardOneImg = cardOne.querySelector('img').src, //7
        cardTwoImg = cardTwo.querySelector('img').src; //7
        matchCards(cardOneImg, cardTwoImg);//7
    }
}

function matchCards(img1, img2){ //7
    //console.log(img1, img2); //7

    if(img1 === img2){ //7.1 if two cards img matched
        //return console.log('Card Matched'); //7.1

        matchedCard++; //9 increment matched value by one
        if(matchedCard == 8){ //9 if matched value is 8 that means user has matched all the cards (8 * 2 = 16 cards)
            //return shuffleCard(); //9

            setTimeout(() => { //10
                return shuffleCard(); //10
            }, 1200); //calling shuffleCard function after 1s
        }

        cardOne.removeEventListener('click', flipCard); //7.4
        cardTwo.removeEventListener('click', flipCard); //7.4
        cardOne = cardTwo = '';//7.4
        return disableDeck = false;//7.4 (disableDeck = false on 8)
    }
    else{
        //console.log('Card Not Matched'); //7.1

        setTimeout(() => { //7.2 if two card not matched
            cardOne.classList.add('shake');//7.2 adding shake class to both card after 400ms
            cardTwo.classList.add('shake');//7.2 
        }, 400);

        setTimeout(() => { //7.3 removing both shake and flip classes from the both card after 1.2s
            cardOne.classList.remove('shake', 'flip');//7.3
            cardTwo.classList.remove('shake', 'flip');//7.3
            cardOne = cardTwo = '';//7.3 setting both card value to blank

            disableDeck = false;//8

        }, 1200);
    }
}

function shuffleCard(){//9
    matchedCard = 0;//9
    cardOne = cardTwo = "";//9

    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8]; //11 creating array of 16 items and each item is repeated twice
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);//11 sorting array item randomly

    cards.forEach((card, index) => { //9 (index on 11 removing flip class from all cards and passing random image to each card)
        card.classList.remove('flip');//9
        card.addEventListener('click', flipCard);//9

        let imgTag = card.querySelector('img'); //11
        imgTag.src = `images/img-${arr[index]}.png`;//11
    });
}
shuffleCard();//11

cards.forEach(card => { //1 adding click event to all cards
    //console.log(card); //1

    card.addEventListener('click', flipCard); //2

    //card.classList.add('flip');//11
});