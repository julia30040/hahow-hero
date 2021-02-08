import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: ${({ isActive }) => isActive ? 'white' : 'lightgrey'};
  padding: 20px;
`;
const Avatar = styled.img`
  width: 200px;
  height: 200px;
  background: #f9f9f9;
`;
const Name = styled.h3`
  font-size: 20px;
  color: grey;
`;

function HeroCard({
  hero,
  isActive,
}) {
  return (
    <Wrapper isActive={isActive}>
      <Avatar src={`https://placem.at/people?w=200&h=200&random=${hero.id}&txt=0&overlay_color=ffffff`}>
      </Avatar>
      <Name>{hero.name}</Name>
    </Wrapper>
  )
}

export default HeroCard