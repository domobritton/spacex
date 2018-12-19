import React from 'react'
import ScrollAnim from 'rc-scroll-anim'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import styled from 'styled-components'

const ScrollOverPack = ScrollAnim.OverPack
ScrollAnim.scrollScreen.init({ loop: true })

export const EquipmentCard = ({imageSwitch, roadster, rockets, switchImage }) => { 

        return (
            <Page>
                <HeroWrapper>
                    {imageSwitch ? 
                    <HeroImage src={roadster.flickr_images[1]} /> :
                    <HeroImage src={`https://farm5.staticflickr.com/4887/31180979107_d935b82634_k.jpg`} />
                    }
                </HeroWrapper>
                <Scroll
                playScale={1}
                id="page1">
                    <Content> 
                        <Tabs>
                            <Title>SpaceX Equipment</Title>   
                            <Folder>
                                <StyledTab onClick={() => switchImage()}>ROCKETS</StyledTab>
                                <StyledTab onClick={() => switchImage()}>ROADSTER</StyledTab>
                            </Folder>
                        
                            <TabPanel>
                                <Inner>
                                    <RocketCard rockets={rockets}/>
                                </Inner>
                            </TabPanel>
                            <TabPanel>
                                <Inner>
                                    <RoadsterCard roadster={roadster} />
                                </Inner>
                            </TabPanel>
                        </Tabs>
                    </Content>
                </Scroll>
          </Page>
      )
}

const RocketCard = ({ rockets }) => {
    return rockets.map(data => (
          <React.Fragment key={data.id}>
            <List>
                <Item>Rocket: {data.rocket_name}</Item>
                <Item>First Flight: {data.first_flight}</Item>
                <Item>Cost Per Launch: $ {data.cost_per_launch}</Item>
            </List>
            <Description>
                {data.description}
                <Button>
                    <Link href={data.wikipedia} alt='wikipedia link' target='_blank'>MORE INFO</Link>
                </Button>
            </Description>
          </React.Fragment>
        )
    )
}

const RoadsterCard = ({ roadster }) => {
    if (roadster.length < 1) { return null }
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

const Page = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
    flex-direction: row;
    height: 1000px;
    width: 100vw;
    font-family: 'Noto Sans', sans-serif;
`;

const Scroll = styled(ScrollOverPack)`
    background: transparent;
    width: 100%;
    height: 1000px;
    padding-top: 5%;

    @media all and (max-width: 768px) {
        padding-top: 15%;
    }
`;

const Content = styled.div`
    margin: 0 auto;
    flex-grow: 1;
    position: relative;
    overflow: hidden;
    width: 80vw;
    padding: 10px;
    height: 80vh;
    background-color: rgba(0,0,0,0.4);
    margin-top: 2%;
    border-radius: 4px;
    color: #ffffff;

    @media all and (max-width: 975px) {
        width: 90%;
    }

    @media all and (max-width: 768px) {
        width: 95%;
        height: 75vh;
    }
`;

const Folder = styled(TabList)`
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    margin-bottom: 5px;
`;

const StyledTab = styled(Tab)`
    list-style: none;
    cursor: pointer;
    color: #8d8d8d;
    width: 100px;
    height: 40px;
    margin-right: 10px;
    border-right: 1px solid orange;
    border-bottom: 1px solid orange;
    border-bottom-right-radius: 8px;
    transition: all .35s ease-in-out;

    &:hover, &.react-tabs__tab--selected {
        color: white;
        -webkit-box-shadow: 2px -1px 0px -1px orange;
        -moz-box-shadow: 2px -1px 0px -1px orange;
        box-shadow: 2px -1px 0px -1px orange;     
    }
`;

const Title = styled.h2`
    position: absolute;
    top: 10px;
    right: 10px;
    font-family: 'Exo', sans-serif;
    letter-spacing: 2px;
    font-size: 35px;

    @media all and (max-width: 768px) {
        font-size: 25px;
    }

    @media all and (max-width: 600px) {
        font-size: 18px;
    }

    @media all and (max-width: 500px) {
      display: none;
    }
`;

const SubTitle = styled.h3`
    font-size: 30px;
    margin: 50px 20px 30px;
`;

const Inner = styled.div`
    overflow-y: scroll;
    overflow-x: hidden;
    background: #2D3436;
    position: relative;
    width: 100%;
    height: 500px;
`;

const List = styled.ul`
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

const Item = styled.li`
    list-style: none;
    color: #A7A8A8;
    font-size: 12px;
    font-weight: bold;
`;

const Description = styled.div`
    position: relative;
    padding: 40px 20px;
    line-height: 24px;

    @media all and (max-width: 768px) {
        margin: 40px;
    }
`;

const Images = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 30px;
`;

const TeslaImg = styled.img`
    width: 22.5%;
    overflow: hidden;
`;

const Button = styled.button`
    position: absolute;
    bottom: 10px;
    right: 15px;
    width: 100px;
    height: 30px;
    padding: 5px;
    border: 1px solid orange;
    border-radius: 5px;
    background: transparent;
    cursor: pointer;
    color: #A7A8A8;
    transition: all .35s ease-in-out;

    &:hover {
        color: #ffffff;
    }
`;

const Link = styled.a`
    text-decoration: none;
    color: inherit;
`;

const HeroWrapper = styled.div`
  position: absolute;
  top: 1000px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #cccccc;
  height: 1000px; 
  background-position: center; 
  background-repeat: no-repeat;
  background-size: cover;
  z-index: -1;
  overflow: hidden;
`;

const HeroImage = styled.img`
    width: 100vw;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
`;