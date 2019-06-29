import React, {Component} from 'react';
import {Col, Row} from 'reactstrap';
import ItemList from '../itemList';
import CharDetails, {Field} from '../charDetails/';
import ErrorMessage from '../errorMessage/';
import GotService from '../../services/GotService';
import RowBlock from '../rowBlock';

export default class BooksPage extends Component {

    gotService = new GotService();

    state = {
        selectedBook: null,
        error: false
    }

    onItemSelected = (id) => {
        this.setState({
            selectedBook: id
        })
    }

    componentDidCatch() {        
        this.setState({
            error: true
        })
    }

    render() {

        if (this.state.error) {
            return <ErrorMessage />
        }

        const itemList = (
            <ItemList 
                onItemSelected={this.onItemSelected}
                getData={this.gotService.getAllBooks}
                renderItem={({name, numberOfPages}) => `${name} (${numberOfPages})`}
            />
        )

        const charDetails = (
            <CharDetails 
                itemId={this.state.selectedBook}
                getData={this.gotService.getBook}>
                <Field field='numberOfPages' label='Pages' />               
            </CharDetails>
        )

        return (
            <RowBlock left={itemList} right={charDetails} />
        )
    }
}