import React, { Component } from 'react';
import styled from 'styled-components';
import '../assets/styles/hovered.css';

const ItemCard = styled.button`
    border: 2px solid darkGray;
    margin: 1em 0.3em;
    overflow: hidden;
    height: 25em;
    width: 25em;
    border-radius: 1em;
    padding: 1em;
    background-color: #00471b;
    cursor: pointer;
    transition: all 1s ease;
`;

const ImageCard = styled(ItemCard)`
    padding: 0;
`;

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
`;

const DarkPostText = styled.p`
    text-align: left;
    font-size: large;
    color: black;
    font-weight: 400;
`;

const LightPostText = styled(DarkPostText)`
    color: white;
`;

const DarkPostDate = styled.p`
    text-align: left bottom;
    color: black;
    float: left;
`;

const LightPostDate = styled(DarkPostDate)`
    color: white;
`;

const EmbeddedImage = styled.img`
    height: 100%;
    width: auto;
    margin: 0;
`;

export default class BoardItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hovered: false,
        };

        this.formatDate = this.formatDate.bind(this);
        this.displayTweet = this.displayTweet.bind(this);
        this.flipImageCard = this.flipImageCard.bind(this);
    }

    formatDate(date) {
        const postDate = new Date(date);
        const nowDate = new Date();
        let final = 0;
        let unit = '';
        let elapsed = nowDate.getTime() - postDate.getTime();
        if (elapsed < 3600000) {
            final = Math.floor(elapsed / 60000); //mins
            unit = final === 1 ? 'minute' : 'minutes';
        } else if (elapsed < 86400000) {
            final = Math.floor(elapsed / 3600000); //hours
            unit = final === 1 ? 'hour' : 'hours';
        } else if (elapsed < 2678000000) {
            final = Math.floor(elapsed / 86400000); //days
            unit = final === 1 ? 'day' : 'days';
        } else if (elapsed < 31540000000) {
            final = Math.floor(elapsed / 2678000000); //months
            unit = final === 1 ? 'month' : 'months';
        } else {
            final = Math.floor(elapsed / 31540000000); //years
            unit = final === 1 ? 'year' : 'years';
        }

        return `${final} ${unit} ago`;
    }

    displayTweet(e) {
        e.preventDefault();
        this.props.expandTweet(this.props.post);
    }

    flipImageCard(ele) {
        if (this.state.hovered === true) {
            this.setState({ hovered: false });
        } else {
            this.setState({ hovered: true });
        }
    }

    render() {
        if (this.props.media) {
            let mediaUrl = '';
            if (this.props.media.type === 'photo') {
                mediaUrl = this.props.media.url;
            } else {
                mediaUrl = this.props.media.preview_image_url;
            }
            return (
                <div>
                    <ImageCard
                        className={this.state.hovered ? 'hovered' : null}
                        onClick={(e) => this.displayTweet(e)}
                        onMouseEnter={(e) => this.flipImageCard(e.target)}
                        onMouseLeave={(e) => this.flipImageCard(e.target)}>
                        {this.state.hovered ? (
                            <div
                                style={{
                                    padding: '1em',
                                }}>
                                <LightPostText>
                                    {this.props.post.text}
                                </LightPostText>
                                <LightPostDate>
                                    {this.formatDate(
                                        this.props.post.created_at
                                    )}
                                </LightPostDate>
                            </div>
                        ) : (
                            <EmbeddedImage src={mediaUrl} />
                        )}
                    </ImageCard>
                </div>
            );
        } else {
            return (
                <div>
                    <ItemCard onClick={(e) => this.displayTweet(e)}>
                        <TextContainer>
                            <LightPostText>
                                {this.props.post.text}
                            </LightPostText>
                            <LightPostDate>
                                {this.formatDate(this.props.post.created_at)}
                            </LightPostDate>
                        </TextContainer>
                    </ItemCard>
                </div>
            );
        }
    }
}
