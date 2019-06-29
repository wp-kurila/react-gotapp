import React, {Component} from 'react';
import './itemList.css';
import styled from 'styled-components';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';


const ItemListUl = styled.ul`
    .list-group-item {
        cursor: pointer;
    }
`
export default class ItemList extends Component {   

    state = {
        itemList: null,    
        error: false
    }

    componentDidMount() {
        const {getData} = this.props;

        getData()
            .then( (itemList) => {
                this.setState({
                    itemList                   
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
            const {id} = item;
            const label = this.props.renderItem(item);

            return (
                <li 
                    key={id}
                    className="list-group-item"
                    onClick={ () => this.props.onItemSelected(id) }>
                    {label}
                </li>
            )
        })
    }

    render() {

        const {itemList, error} = this.state;        

        if (!itemList) {
            return <Spinner />
        }

        const errorMessage = error ? <ErrorMessage /> : null;         
        const items = this.renderItems(itemList);


        return (
            <ItemListUl>
                {errorMessage}               
                {items}
            </ItemListUl>
        );
    }
}