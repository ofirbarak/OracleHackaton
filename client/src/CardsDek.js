import * as React from "react";
import { Fragment } from "react";
import CardBack from './images/back.png';
import Card from 'react-bootstrap/Card';

export default class CardsDek extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            isToggled:false
        }
    }
    handleClick = ()=>{
        this.setState({isToggled:true})
        setTimeout(()=>{
            this.setState({isToggled:false})
            this.props.onClick()
        },1000) 
    }
    render = () =>{
    return (
        <Fragment>
            {
                [...Array(this.props.numOfCardsInDeck)].map((spam, key) => {
                    if(key===(this.props.numOfCardsInDeck-1)){
                        return (
                            <Card onClick={this.handleClick}className={this.state.isToggled?'draw-card':''} key={key} style={{'position': 'absolute','transform': `translate(-${key*0.2}%, -${key*0.2}%)`,'height':'190px', 'width':'130px'}}>
                                <Card.Img src={CardBack}/>
                            </Card>)
                    }
                    else{
                        return (
                            <Card key={key} style={{'position': 'absolute','transform': `translate(-${key*0.2}%, -${key*0.2}%)`,'height':'190px', 'width':'130px'}}>
                                <Card.Img src={CardBack}/>
                            </Card>)
                    }
                    
            })
            }
        </Fragment>
    )
}
}