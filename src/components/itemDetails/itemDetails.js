import React, {Component} from 'react';
import './itemDetails.css';
import styled from 'styled-components';
import Spinner from '../spinner';


const SpanError = styled.span`
    color: #fff;
    text-align: center;
    font-size: 26px;
`

const Field = ({item, field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    )
}

export {
    Field
}
export default class ItemDetails extends Component {      

    state = {
        item: null,
        loading: true,        
        error: false
    }

    componentDidMount() {
        this.updateChar();  
        this.setState({
            loading:false
        })          
    }

    componentDidUpdate(prevProps) {                  
        if (this.props.itemId !== prevProps.itemId) {
            this.updateChar();
            this.setState({loading:true})
        }
    }

    updateChar() {       
        const {itemId} = this.props;
        if (!itemId) {
            return;
        }
        const {getData} = this.props;
        getData(itemId)
            .then( (item) => {
                this.setState({
                    item,
                    loading: false           
                })
        })             
    }   

    onError = (err) => {
        this.setState({
            error: true            
        })
    }    
    
    render() { 
        
        const message = this.props.message

        if (!this.state.item) {
            return <SpanError>{message}</SpanError>
        }              
        
        const {item, loading} = this.state;        
        const {name} = item;

        const spinner = loading ? <Spinner /> : null; 
               
        
        return (  
                <>
                    
                    <div className="char-details rounded">
                        {spinner}
                        <h4>{name}</h4>
                        <ul className="list-group list-group-flush">
                            {
                                React.Children.map(this.props.children, (child) => {
                                    return React.cloneElement(child, {item})
                                })
                            }
                        </ul>       
                    </div>    
                </>
        )
    }
}