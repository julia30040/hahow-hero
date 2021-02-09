import React, { Component } from 'react';
import styled from 'styled-components';

import HeroList from '../component/HeroList';

const Wrapper = styled.div`
`;

class HeroPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      heroes: [],
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
        <div className="container">
          <HeroList heroes={heroes}/>
        </div>
      </Wrapper>
    );
  }
}

export default HeroPage;