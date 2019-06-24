import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import styled from 'styled-components';
import ErrorMessage from '../errorMessage';
import CharacterPage from '../CharacterPage/';


const Button = styled.button`
    display: block;
    margin: 0 auto 40px auto;
    padding: 0 30px;
`


export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,          
            error: false
        }
    }

    componentDidCatch() {
        console.log('error');
        this.setState({
            error: true
        })
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

        if(this.state.error) {
            return <ErrorMessage />
        }

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
                    <CharacterPage />                  
                </Container>
            </>
        )
    }
}