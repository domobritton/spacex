import React from 'react'
import styled from 'styled-components'

export const RocketCard = ({ rockets }) => {
    if (rockets.length < 1) {
        return (
            <Content>
                <Loading>No Info To Show</Loading>
            </Content>
        )
    } else {
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
}

const Content = styled.div `
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
`;

const Loading = styled.div `
  font-size: 12px;
`;

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
// List.displayName = 'List'

const Item = styled.li `
    list-style: none;
    color: #A7A8A8;
    font-size: 12px;
    font-weight: bold;
`;
// Item.displayName = 'Item'

const Description = styled.div `
    position: relative;
    padding: 40px 20px;
    line-height: 24px;

    @media all and (max-width: 768px) {
        margin: 40px;
    }
`;
// Description.displayName = 'Description'

const Button = styled.button `
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
// Button.displayName = 'Button'

const Link = styled.a `
    text-decoration: none;
    color: inherit;
`;
// Link.displayName = 'Link'