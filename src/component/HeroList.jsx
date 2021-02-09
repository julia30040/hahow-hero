import React, { Component } from 'react';
import styled from 'styled-components';

import HeroCard from '../component/HeroCard';

const Wrapper = styled.div`
  margin: 0 auto;
  padding: 16px 8px 6px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  > * {
    margin: 0 10px 10px;
  }
`;

function HeroList({
  heroes
}) {
  return (
    <Wrapper>
      {heroes.map(hero => (
        <HeroCard
          key={`hero-${hero.id}`}
          hero={hero} />
      ))}
    </Wrapper>
  );
}

export default HeroList;