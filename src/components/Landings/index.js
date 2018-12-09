import ScrollAnim from 'rc-scroll-anim'
import React, { Component } from 'react'

import TweenOne from 'rc-tween-one'
import Animate from 'rc-animate'
import styled from 'styled-components'


const ScrollOverPack = ScrollAnim.OverPack
ScrollAnim.scrollScreen.init({ loop: true })

export default class Landings extends Component {

    render() {
        return (
            <Page>
              <Image />
              <StyledScrollTwo
                playScale={1}
                id="page1">
                <StyledTweenTitle animation={{ opacity: 1 }} key='t'>
                  PAGE 1
                </StyledTweenTitle>
                <Animate key="2" transitionName="fade" transitionAppear>
                  <Content>Container 1</Content>
                </Animate>
                <StyledTweenOne
                  animation={{ y: 0, opacity: 1 }}
                  key="3">
                  <Content>Container 2</Content>
                </StyledTweenOne>
              </StyledScrollTwo>
            </Page>
        )
    }
}

const Page = styled.div`
  overflow: hidden;
  height: 1000px;
  width: 100%;
`;

const StyledScrollTwo = styled(ScrollOverPack)`
  background: transparent;
  width: 100%;
  height: 1000px;
`;

const StyledTweenTitle = styled(TweenOne)`
  width: 100%;
  opacity: 0;
  color: #fff;
  font-size: 32px;
  padding-top: 160px;
  text-align: center;
  padding-bottom: 50px;
`;

const Content = styled.div`
  margin: 0 auto;
  width: 600px;
  height: 80px;
  background: #000000;
  margin-top: 30px;
  border-radius: 4px;
  color: #ffffff;
`;

const StyledTweenOne = styled(TweenOne)`
  opacity: 0;
  transform: translateY(100px);
`;

const Image = styled.div`
  position: absolute;
  top: 1000px;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("https://farm5.staticflickr.com/4887/31180979107_d935b82634_k.jpg");
  background-color: #cccccc;
  height: 1000px; 
  background-position: center; 
  background-repeat: no-repeat;
  background-size: cover;
  z-index: -1;
`;