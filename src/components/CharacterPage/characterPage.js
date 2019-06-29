import React, {Component} from 'react';
import {Col, Row} from 'reactstrap';
import ItemList from '../itemList';
import CharDetails, {Field} from '../charDetails/';
import ErrorMessage from '../errorMessage/';
import GotService from '../../services/GotService';
import RowBlock from '../rowBlock';

export default class CharacterPage extends Component {

    gotService = new GotService();

    state = {
        selectedChar: null,
        error: false
    }

    onItemSelected = (id) => {
        this.setState({
            selectedChar: id
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
                getData={this.gotService.getAllCharacters}
                renderItem={({name, gender}) => `${name} (${gender})`}
            />
        )

        const charDetails = (
            <CharDetails 
                message={`Выберите, пожалуйста, персонажа из списка`}
                itemId={this.state.selectedChar}
                getData={this.gotService.getCharacter}>
                <Field field='gender' label='Genger' />
                <Field field='born' label='Born' />                
                <Field field='died' label='Died' />                
                <Field field='culture' label='Culture' />                
            </CharDetails>
        )

        return (
            <RowBlock left={itemList} right={charDetails} />
        )
    }
}