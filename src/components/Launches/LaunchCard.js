import ScrollAnim from 'rc-scroll-anim'
import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

import TweenOne from 'rc-tween-one'
import styled from 'styled-components'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css'

const Element = ScrollAnim.Element
ScrollAnim.scrollScreen.init({ loop: true })

export const LaunchCard = ({ columnDefs, upcomingRowData, pastRowData, onGridReady }) => {
   
    return (
        <Page id='page0'>
            <HeroWrapper>
                <HeroImage src={`https://farm1.staticflickr.com/914/29700004918_334cd5a572_k.jpg`} />
            </HeroWrapper>
            <Scroll>
                <Tween
                animation={{ y: 0, opacity: 1 }}
                key="c">
                    <Content> 
                        <Tabs>
                            <Title>Past and Upcoming Launches</Title>   
                            <Folder>
                                <StyledTab>PAST</StyledTab>
                                <StyledTab>UPCOMING</StyledTab>
                            </Folder>               
                            <TabPanel>
                                <GridWrapper 
                                className='ag-theme-balham-dark'>                  
                                    <AgGridReact
                                        id='past'
                                        columnDefs={columnDefs}
                                        rowData={ pastRowData}
                                        onGridReady={onGridReady}>
                                    </AgGridReact>                       
                                </GridWrapper>
                            </TabPanel>
                            <TabPanel>
                                <GridWrapper 
                                    className='ag-theme-balham-dark'>                  
                                    <AgGridReact
                                        id='upcoming'
                                        columnDefs={columnDefs}
                                        rowData={ upcomingRowData}
                                        onGridReady={onGridReady}>
                                    </AgGridReact>
                                </GridWrapper>
                            </TabPanel>
                        </Tabs>
                    </Content>
                </Tween>
            </Scroll>
        </Page>
    )
}


const Page = styled(Element)`
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

const Scroll = styled.div`
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
    margin-top: 5%;
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

const GridWrapper = styled.div`
    height: 74vh;
    width: 100%;
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

const Tween = styled(TweenOne)`
    opacity: 0;
    transform: translateY(100px);
`;

const HeroWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #cccccc;
    height: 1000px; 
    z-index: -1;
    overflow: hidden;
`;

const HeroImage = styled.img`
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    height: 100%;
`;