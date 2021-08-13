import React, { Component } from "react";
import styled from "styled-components";

const Item = styled.button`
    border: 2px solid darkGray;
    margin: 1em;
    overflow: hidden;
    padding: 1em;
`;
const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    height: 20em;
    width: 20em;
`;

const PostText = styled.p`
    text-align: left;
    color: color-constrast(black vs white, gray, darkgray, lightgray);
    font-weight: bold;
    font-size: 16px;
`;

const PostDate = styled.p`
    text-align: left bottom;
    color: color-constrast(black vs white, gray, darkgray, lightgray);
`;

export default class BoardItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            colors: ["#002B5C", "#00471B", "#F9A01B"],
        };

        this.formatDate = this.formatDate.bind(this);
        this.getBackground = this.getBackground.bind(this);
        this.displayTweet = this.displayTweet.bind(this);
    }

    formatDate(date) {
        const postDate = new Date(date);
        const nowDate = new Date();
        let final = 0;
        let unit = "";
        let elapsed = nowDate.getTime() - postDate.getTime();
        if (elapsed < 3600000) {
            final = Math.floor(elapsed / 60000); //mins
            unit = final === 1 ? "minute" : "minutes";
        } else if (elapsed < 86400000) {
            final = Math.floor(elapsed / 3600000); //hours
            unit = final === 1 ? "hour" : "hours";
        } else if (elapsed < 2678000000) {
            final = Math.floor(elapsed / 86400000); //days
            unit = final === 1 ? "day" : "days";
        } else if (elapsed < 31540000000) {
            final = Math.floor(elapsed / 2678000000); //months
            unit = final === 1 ? "month" : "months";
        } else {
            final = Math.floor(elapsed / 31540000000); //years
            unit = final === 1 ? "year" : "years";
        }

        return `${final} ${unit} ago`;
    }

    getBackground() {
        if (this.props.post.attachments) {
            if (this.props.post.attachments.media_keys) {
                let mediaArr = this.props.media;
                let bgKey = this.props.post.attachments.media_keys[0];
                let media = mediaArr.find((ele) => ele.media_key === bgKey);
                if (media.type === "photo") {
                    return `url(${media.url})`;
                } else {
                    return `white`;
                }
            }
        } else {
            let colorArr = this.state.colors;
            return colorArr[Math.floor(Math.random() * colorArr.length)];
        }
    }

    displayTweet(e) {
        e.preventDefault();
        window.alert("Displaying tweet");
    }

    render() {
        return (
            <div>
                <Item
                    onClick={(e) => this.displayTweet(e)}
                    style={{ background: this.getBackground() }}
                >
                    <TextContainer>
                        <PostText>{this.props.post.text}</PostText>
                        <PostText>
                            {this.formatDate(this.props.post.created_at)}
                        </PostText>
                    </TextContainer>
                </Item>
            </div>
        );
    }
}
