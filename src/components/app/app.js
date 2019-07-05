import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import {CharacterPage, BooksPage, HousesPage, BooksItem} from '../pages';
import RandomChar from '../randomChar';
import styled from 'styled-components';
import ErrorMessage from '../errorMessage';
import GotService from '../../services/GotService';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import img from './got.jpeg';


const Button = styled.button`
    display: block;
    margin: 0 auto 40px auto;
    padding: 0 30px;
`

const Wrapper = styled.div`
    overflow-x: hidden;
    background: url(${img}) center center no-repeat;
    background-size: cover;
    font-size: 16px;
    height: 100vh;	
`


export default class App extends Component {

    gotService = new GotService();

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
            <Router>
                <Wrapper> 
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

                        <Route path="/characters" component={CharacterPage} />                        
                        <Route path="/houses" component={HousesPage} />  
                        <Route path="/books" exact component={BooksPage} />                  
                        <Route path="/books/:id" render={
                            ({match}) => { 
                                const {id} = match.params;
                                return <BooksItem bookId={id}/>}
                        } />                  
                    </Container>                
                </Wrapper>
            </Router>
        )
    }
}