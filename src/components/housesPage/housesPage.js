import React, {Component} from 'react';
import {Col, Row} from 'reactstrap';
import ItemList from '../itemList';
import CharDetails, {Field} from '../charDetails/';
import ErrorMessage from '../errorMessage/';
import GotService from '../../services/GotService';
import RowBlock from '../rowBlock';

export default class HousesPage extends Component {

    gotService = new GotService();

    state = {
        selectedHouse: null,
        error: false
    }

    onItemSelected = (id) => {
        this.setState({
            selectedHouse: id
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
                getData={this.gotService.getAllHouses}
                renderItem={({name, region}) => `${name} (${region})`}
            />
        )

        const charDetails = (
            <CharDetails 
                itemId={this.state.selectedHouse}
                getData={this.gotService.getHouse}>
                <Field field='region' label='Region' />
                {/* <Field field='born' label='Born' />                
                <Field field='died' label='Died' />                
                <Field field='culture' label='Culture' />                 */}
            </CharDetails>
        )

        return (
            <RowBlock left={itemList} right={charDetails} />
        )
    }
}