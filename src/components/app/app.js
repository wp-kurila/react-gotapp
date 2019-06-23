import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import styled from 'styled-components';


const Button = styled.button`
    display: block;
    margin: 0 auto 40px auto;
    padding: 0 30px;
`


export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true
        }
    }

    toggleVisible = () => {
        this.setState(() => {
            return {
                visible: !this.state.visible
            }            
        })      
    }

    render() {
        const char = this.state.visible ? <RandomChar /> : null;
        const botton = this.state.visible ? `Убрать` : `Вернуть`;

        return (
            <> 
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            {char}
                            <Button onClick={this.toggleVisible}>{botton}</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col md='6'>
                            <ItemList />
                        </Col>
                        <Col md='6'>
                            <CharDetails />
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}