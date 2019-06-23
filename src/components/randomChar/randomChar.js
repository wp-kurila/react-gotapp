import React, {Component} from 'react';
import './randomChar.css';
import styled from 'styled-components';
import GotService from '../../services/GotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

const RandomBlock = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;    
    min-height: 296px;
    h4 {
        margin-bottom: 20px;
        text-align: center;
    }
    img {
        width: 100%;
    }
    span {
        text-align: center;
        display: block;
    }
    button {
        display: block;
        margin: 0 auto 40px auto;
        padding: 0 30px;
    }
`

const Term = styled.span`
    font-weight: bold;
`
export default class RandomChar extends Component {

    constructor() {
        super();
        this.updateChar();
    }

    gotService = new GotService();

    state = {
        char: {},
        loading: true,
        error: false
    }

    onCharLoaded = (char) => {             
        this.setState({
            char,
            loading: false
        })
    }

    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        })
    }

    updateChar() {
        const id = Math.round(Math.random() * 140 + 1);        
        this.gotService.getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }
    
    render() {
        const {char, loading, error } = this.state;       

        const errorMessage = error ? <ErrorMessage /> : null; 
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error ) ? <View char={char} /> : null;        
 
        return (            
            <RandomBlock>      
                {errorMessage}   
                {spinner} 
                {content}
            </RandomBlock>                
        );
    }
}

const View = ({char}) => { 

    for ( let elem in char) {
        if(char[elem].length === 0) {
            char[elem] += "Данных нет"
        }
    }
    const {name, gender, born, died, culture} = char;    

    return (
        <>
            <h4>Random Character: {name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <Term>Gender </Term>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <Term>Born </Term>
                    <span>{born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <Term>Died </Term>
                    <span>{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <Term>Culture </Term>
                    <span>{culture}</span>
                </li>
            </ul>            
        </>
    )
}
