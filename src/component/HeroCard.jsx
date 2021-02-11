import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import {
  COLOR_BLUE,
  COLOR_YELLOW,
} from '../share/color'

const StyledNavLink = styled(NavLink)`
  background-color: ${COLOR_BLUE};
  padding: 16px;
  transition: all .24s ease;
  border-radius: 10px;

  &.-active {
    background-color: ${COLOR_YELLOW};
  }

  &:hover {
    opacity: 0.9;
    transform: scale(1.02);
  }
`;

const Avatar = styled.img`
  width: 200px;
  height: 200px;
  background: #f9f9f9;
`;

const Name = styled.div`
  font-size: 28px;
  color: #d3d3d3;
  margin-top: 10px;
  text-align: center;
  
  .-active & {
    color: #000;
  }
`;

function HeroCard({
  hero,
}) {
  return (
    <StyledNavLink
      to={`/heroes/${hero.id}`}
      activeClassName="-active">
        <Avatar src={hero.image} />
        <Name>{hero.name}</Name>
    </StyledNavLink>
  );
}

export default HeroCard;