import React from 'react'
import ScrollAnim from 'rc-scroll-anim'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import styled from 'styled-components'
import TweenOne from 'rc-tween-one'

import { RocketCard } from './RocketCard'
import { RoadsterCard } from './RoadsterCard'

const ScrollOverPack = ScrollAnim.OverPack
ScrollAnim.scrollScreen.init({ loop: true })

export const EquipmentCard = ({imageSwitch, roadster, rockets, switchImage }) => { 

        return (
            <Page>
                <HeroWrapper>
                    {imageSwitch === 'b' ? 
                    <HeroImage src={roadster.flickr_images[1]} /> :
                    <HeroImage src={`https://farm5.staticflickr.com/4887/31180979107_d935b82634_k.jpg`} />
                    }
                </HeroWrapper>
                <Scroll
                playScale={1}
                replay
                id="page1">
                <Tween
                animation={{ y: 0, opacity: 1 }}
                key="1">
                    <Content> 
                        <Tabs>
                            <Title>SpaceX Equipment</Title>   
                            <Folder>
                                <StyledTab onClick={(e) => switchImage('a', e)}>ROCKETS</StyledTab>
                                <StyledTab onClick={(e) => switchImage('b', e)}>ROADSTER</StyledTab>
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
                    </Tween>
                </Scroll>
          </Page>
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
        height: 95vh;
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
StyledTab.displayName = 'StyledTab'

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

const Inner = styled.div`
    overflow-y: scroll;
    overflow-x: hidden;
    background: #2D3436;
    position: relative;
    width: 100%;
    height: 500px;
`;

const Tween = styled(TweenOne)`
    opacity: 0;
    transform: translateY(100px);
`;

const HeroWrapper = styled.div`
    position: absolute;
    top: 1000px;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #cccccc;
    height: 1000px; 
    z-index: -1;
    overflow: hidden;
`;

const HeroImage = styled.img`
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    height: 100%;
`;
