import React, { Component } from 'react';
import styled from 'styled-components';

import HeroCard from '../component/HeroCard';

const Wrapper = styled.div`
`;

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const ListWrapper = styled.div`
  margin: 0 auto;
  display: flex;
`;

class HeroPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      heroes: [],
      activeHeroId: null,
      isLoaded: false,
      error: null,
    }
  }

  componentDidMount() {
    fetch("https://hahow-recruit.herokuapp.com/heroes")
      .then(res => res.json())
      .then(
        (heroes) => {
          this.setState({
            isLoaded: true,
            heroes
          })
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          })
        }
      )
  }

  render() {
    const {
      heroes,
    } = this.state;

    return (
      <Wrapper>
        <Container className="container">
          <ListWrapper>
            {heroes.map(hero => (
              <HeroCard key={`hero-${hero.id}`} hero={hero} />
            ))}
          </ListWrapper>
        </Container>
      </Wrapper>
    );
  }
}

export default HeroPage;