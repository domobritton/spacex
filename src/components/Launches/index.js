import ScrollAnim from 'rc-scroll-anim'
import React, { Component } from 'react'

import TweenOne from 'rc-tween-one'
import Animate from 'rc-animate'
import styled from 'styled-components'


const ScrollOverPack = ScrollAnim.OverPack
ScrollAnim.scrollScreen.init({ loop: true })

export default class Launches extends Component {
  
  render() {
    return (
          <div>
            <Page>
              <Image />
              <StyledScrollOne
                playScale={0}
                id="page0"
                replay
                location="page0">
                <StyledTweenTitle animation={{ opacity: 1 }} key='c'>
                  PAGE 0
                </StyledTweenTitle>
                <Animate key="0" transitionName="fade" transitionAppear>
                  <Content>Container 1</Content>
                </Animate>
                <StyledTweenOne
                  animation={{ y: 0, opacity: 1 }}
                  key="1">
                  <Content>Container 2</Content>
                </StyledTweenOne>
              </StyledScrollOne>
            </Page>
          </div>
      )
  }
}

const Page = styled.div`
  overflow: hidden;
  height: 1000px;
  width: 100%;
`;

const StyledScrollOne = styled(ScrollOverPack)`
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
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("https://farm5.staticflickr.com/4840/45473446114_fd0e11923d_k.jpg");
  background-color: #cccccc;
  height: 1000px; 
  background-position: center; 
  background-repeat: no-repeat;
  background-size: cover;
  z-index: -1;
`;