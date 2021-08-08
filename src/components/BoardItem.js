import React, { Component } from 'react';
import styled from 'styled-components';

const ItemContainer = styled.div`
    height: 10em;
    width: 10em;
    border: 1px solid darkGray;
    margin: 1em;
    overflow: hidden;
    padding: 1em;
`

export default class BoardItem extends Component {
    constructor(props) {
        super(props);

        this.formatDate = this.formatDate.bind(this);
    }

    formatDate(date) {
        const postDate = new Date(date);
        const nowDate = new Date();
        let final = 0;
        let unit = '';
        let elapsed = nowDate.getTime() - postDate.getTime();
        if (elapsed < 3600000) {
            final = Math.floor(elapsed / 60000) //mins
            unit = final === 1 ? 'minute' : 'minutes';
        } else if (elapsed < 86400000) {
            final = Math.floor(elapsed / 3600000) //hours
            unit = final === 1 ? 'hour' : 'hours';
        } else if (elapsed < 2678000000) {
            final = Math.floor(elapsed / 86400000) //days
            unit = final === 1 ? 'day' : 'days';
        } else if (elapsed < 31540000000) {
            final = Math.floor(elapsed / 2678000000) //months
            unit = final === 1 ? 'month' : 'months';
        } else {
            final = Math.floor(elapsed / 31540000000) //years
            unit = final === 1 ? 'year' : 'years';
        }

        return `${final} ${unit} ago`;
    }

    render() {
        return (
            <div>
                <ItemContainer style={{backgroundColor: "#297A80", {this.props.post.attachments.media_keys}}}>
                    <p>{this.props.post.text}</p>
                    <p>{this.formatDate(this.props.post.created_at)}</p>
                </ItemContainer>
            </div>
        )
    }
}
