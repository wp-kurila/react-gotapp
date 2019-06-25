import React, {Component} from 'react';
import './itemList.css';
import styled from 'styled-components';
import GotService from '../../services/GotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';


const ItemListUl = styled.ul`
    .list-group-item {
        cursor: pointer;
    }
`
export default class ItemList extends Component {

    gotService = new GotService();

    state = {
        charList: null,    
        error: false
    }

    componentDidMount() {
        this.gotService.getAllCharacters()
            .then( (charList) => {
                this.setState({
                    charList                   
                })
            })
    }

    onError = (err) => {
        this.setState({
            error: true          
        })
    }

    renderItems(arr) {             
        return arr.map( (item) => {
            return (
                <li 
                    key={item.id}
                    className="list-group-item"
                    onClick={ () => this.props.onCharSelected(item.id) }>
                    {item.name}
                </li>
            )
        })
    }

    render() {

        const {charList, error} = this.state;        

        if (!charList) {
            return <Spinner />
        }

        const errorMessage = error ? <ErrorMessage /> : null;         
        const items = this.renderItems(charList);


        return (
            <ItemListUl>
                {errorMessage}               
                {items}
            </ItemListUl>
        );
    }
}