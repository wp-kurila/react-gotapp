import React, {Component} from 'react';
import './charDetails.css';
import styled from 'styled-components';
import GotService from '../../services/GotService';
import ErrorMessage from '../errorMessage/';
import Spinner from '../spinner/';
import img from './test.jpg';


const CharDetailsDiv = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
    h4 {
        margin-bottom: 20px;
        text-align: center;
    }
`

const SpanError = styled.span`
    color: #fff;
    text-align: center;
    font-size: 26px;
`
export default class CharDetails extends Component {

    gotService = new GotService();    

    state = {
        char: null,
        loading: true,
        error: false
    }

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    updateChar() {
        const {charId} = this.props;
        if (!charId) {
            return;
        }

        this.gotService.getCharacter(charId)
            .then( (char) => {
                this.setState({
                    char,
                    loading: false                    
                })
            })        
    }   

    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        })
    }   
    
    render() {

        const {char, error, loading} = this.state;

        if (!this.state.char) {
            return <SpanError>Please select a character</SpanError>
        }

        const errorMessage = error ? <ErrorMessage /> : null; 
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? <View char={char} /> : null

        return (
            <CharDetailsDiv>
                {errorMessage}   
                {spinner}
                {content}
            </CharDetailsDiv>           
        )        
    }
}

const View = ({char}) => {

    const {name, gender, born, died, culture} = char;
        
    return (  
            <>
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Gender</span>
                        <span>{gender}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Born</span>
                        <span>{born}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Died</span>
                        <span>{died}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Culture</span>
                        <span>{culture}</span>
                    </li>
                </ul>        
            </>
    );
}