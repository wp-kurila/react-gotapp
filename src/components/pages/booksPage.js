import React, {Component} from 'react';
import ItemList from '../itemList';
import ErrorMessage from '../errorMessage';
import GotService from '../../services/GotService';
import {withRouter} from 'react-router-dom';


class BooksPage extends Component {

    gotService = new GotService();

    state = {        
        error: false
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

        return (
            <ItemList 
                onItemSelected={(itemId) => {
                    this.props.history.push(itemId)
                }}
                message={`Выберите книгу из списка`}
                getData={this.gotService.getAllBooks}
                renderItem={({name, numberOfPages}) => `${name} (${numberOfPages})`}
            />
        )
    }    
}

export default withRouter(BooksPage);