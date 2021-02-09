import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledNavLink = styled(NavLink)`
  background-color: lightgrey;
  padding: 16px;
  transition: all .24s ease;

  &.-active {
    background-color: white;
  }

  &:hover {
    opacity: 0.9;
    transform: scale(1.02);
  }
`;

const Avatar = styled.img`
  width: 200px;
  background: #f9f9f9;
`;

const Name = styled.div`
  font-size: 28px;
  color: grey;
  margin-top: 10px;
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