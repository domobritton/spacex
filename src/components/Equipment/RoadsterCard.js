import React from 'react'
import styled from 'styled-components'

export const RoadsterCard = ({ roadster }) => {
    let utcDate = roadster.launch_date_utc
    let localDate = new Date(utcDate).toLocaleDateString()
    let distance = (Math.round(roadster.earth_distance_mi * 100) / 100).toString()
    let speed = (Math.round(roadster.speed_mph * 100) / 100).toString() 

    return (
        <>
            <List>
                <Item>Launch Date: {localDate}</Item>
                <Item>Distance From Earth: {distance} miles</Item>
                <Item>Travel Speed: {speed} miles per hour</Item>
                <Item>Orbit Type: {roadster.orbit_type}</Item>
            </List>
            <SubTitle>{roadster.name}</SubTitle>
            <Description>
                {roadster.details}
                <Images>
                    <TeslaImg src={roadster.flickr_images[0]} />
                    <TeslaImg src={roadster.flickr_images[1]} />
                    <TeslaImg src={roadster.flickr_images[2]} />
                    <TeslaImg src={roadster.flickr_images[3]} />
                </Images>
            </Description>
        </>
    )
}

const List = styled.ul `
    display: flex;
    position: relative;
    justify-content: space-around;
    align-items: center;
    background: #1C1F1F;
    height: 32px;

    @media all and (max-width: 768px) {
        margin: 40px;
    }
`;
List.displayName = 'List'

const Item = styled.li `
    list-style: none;
    color: #A7A8A8;
    font-size: 12px;
    font-weight: bold;
`;
Item.displayName = 'Item'

const SubTitle = styled.h3 `
    font-size: 30px;
    margin: 50px 20px 30px;
`;
SubTitle.displayName = 'Subtitle'

const Description = styled.div `
    position: relative;
    padding: 40px 20px;
    line-height: 24px;

    @media all and (max-width: 768px) {
        margin: 40px;
    }
`;
Description.displayName = 'Description'

const Images = styled.div `
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 30px;
`;
Images.displayName = 'Images'

const TeslaImg = styled.img `
    width: 22.5%;
    overflow: hidden;
`;
TeslaImg.displayName = 'TeslaImg'