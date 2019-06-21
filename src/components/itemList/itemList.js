import React, {Component} from 'react';
import './itemList.css';
import styled from 'styled-components';

const ItemListUl = styled.ul`
    .list-group-item {
        cursor: pointer;
    }
`
export default class ItemList extends Component {

    render() {
        return (
            <ItemListUl>
                <li className="list-group-item">
                    John Snow
                </li>
                <li className="list-group-item">
                    Brandon Stark
                </li>
                <li className="list-group-item">
                    Geremy
                </li>
            </ItemListUl>
        );
    }
}