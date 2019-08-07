import * as React from "react";
import { Fragment } from "react";
import PlayingCard from './PlayingCard.js';

export default (props) => {
    return (
        <Fragment>
            {
                props.cards.map((curCard, key) => (
                        <PlayingCard cardStyle={{'position': 'absolute','transform': `rotate(${key%2===0?key*10:-key*10}deg) translate(-${key*0.1}%, -${key*0.1}%)`}} key={key} type={curCard.type} number={curCard.number}></PlayingCard>
                ))
            }
        </Fragment>
    )
}