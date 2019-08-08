import spade1 from './images/ace_of_spades.png'
import spade2 from './images/2_of_spades.png'
import spade3 from './images/3_of_spades.png'
import spade4 from './images/4_of_spades.png'
import spade5 from './images/5_of_spades.png'
import spade6 from './images/6_of_spades.png'
import spade7 from './images/7_of_spades.png'
import spade8 from './images/8_of_spades.png'
import spade9 from './images/9_of_spades.png'
import spade10 from './images/10_of_spades.png'
import spade11 from './images/jack_of_spades.png'
import spade12 from './images/queen_of_spades.png'
import spade13 from './images/king_of_spades.png'

import diamond1 from './images/ace_of_diamonds.png'
import diamond2 from './images/2_of_diamonds.png'
import diamond3 from './images/3_of_diamonds.png'
import diamond4 from './images/4_of_diamonds.png'
import diamond5 from './images/5_of_diamonds.png'
import diamond6 from './images/6_of_diamonds.png'
import diamond7 from './images/7_of_diamonds.png'
import diamond8 from './images/8_of_diamonds.png'
import diamond9 from './images/9_of_diamonds.png'
import diamond10 from './images/10_of_diamonds.png'
import diamond11 from './images/jack_of_diamonds.png'
import diamond12 from './images/queen_of_diamonds.png'
import diamond13 from './images/king_of_diamonds.png'

import heart1 from './images/ace_of_hearts.png'
import heart2 from './images/2_of_hearts.png'
import heart3 from './images/3_of_hearts.png'
import heart4 from './images/4_of_hearts.png'
import heart5 from './images/5_of_hearts.png'
import heart6 from './images/6_of_hearts.png'
import heart7 from './images/7_of_hearts.png'
import heart8 from './images/8_of_hearts.png'
import heart9 from './images/9_of_hearts.png'
import heart10 from './images/10_of_hearts.png'
import heart11 from './images/jack_of_hearts.png'
import heart12 from './images/queen_of_hearts.png'
import heart13 from './images/king_of_hearts.png'

import club1 from './images/ace_of_clubs.png'
import club2 from './images/2_of_clubs.png'
import club3 from './images/3_of_clubs.png'
import club4 from './images/4_of_clubs.png'
import club5 from './images/5_of_clubs.png'
import club6 from './images/6_of_clubs.png'
import club7 from './images/7_of_clubs.png'
import club8 from './images/8_of_clubs.png'
import club9 from './images/9_of_clubs.png'
import club10 from './images/10_of_clubs.png'
import club11 from './images/jack_of_clubs.png'
import club12 from './images/queen_of_clubs.png'
import club13 from './images/king_of_clubs.png'

import joker from './images/black_joker.png'

import React from 'react';
import Card from 'react-bootstrap/Card';

const cards = { spade: [], heart: [], diamond: [], club: [] };
cards.spade.push(joker);
cards.spade.push(spade1);
cards.spade.push(spade2);
cards.spade.push(spade3);
cards.spade.push(spade4);
cards.spade.push(spade5);
cards.spade.push(spade6);
cards.spade.push(spade7);
cards.spade.push(spade8);
cards.spade.push(spade9);
cards.spade.push(spade10);
cards.spade.push(spade11);
cards.spade.push(spade12);
cards.spade.push(spade13);

cards.diamond.push(joker);
cards.diamond.push(diamond1);
cards.diamond.push(diamond2);
cards.diamond.push(diamond3);
cards.diamond.push(diamond4);
cards.diamond.push(diamond5);
cards.diamond.push(diamond6);
cards.diamond.push(diamond7);
cards.diamond.push(diamond8);
cards.diamond.push(diamond9);
cards.diamond.push(diamond10);
cards.diamond.push(diamond11);
cards.diamond.push(diamond12);
cards.diamond.push(diamond13);

cards.heart.push(joker);
cards.heart.push(heart1);
cards.heart.push(heart2);
cards.heart.push(heart3);
cards.heart.push(heart4);
cards.heart.push(heart5);
cards.heart.push(heart6);
cards.heart.push(heart7);
cards.heart.push(heart8);
cards.heart.push(heart9);
cards.heart.push(heart10);
cards.heart.push(heart11);
cards.heart.push(heart12);
cards.heart.push(heart13);

cards.club.push(joker);
cards.club.push(club1);
cards.club.push(club2);
cards.club.push(club3);
cards.club.push(club4);
cards.club.push(club5);
cards.club.push(club6);
cards.club.push(club7);
cards.club.push(club8);
cards.club.push(club9);
cards.club.push(club10);
cards.club.push(club11);
cards.club.push(club12);
cards.club.push(club13);





const cardByTypeAndNum = (type, number) => {
    return cards[type][number]
}

export default  (props) => {
    return (
        <Card className='scale-on-hover' style={Object.assign(props.cardStyle || {},{'height':'190px', 'width':'130px'})} >
            <Card.Img onClick={props.onClick} src={cardByTypeAndNum(props.type, props.number)}/>
        </Card>)
}