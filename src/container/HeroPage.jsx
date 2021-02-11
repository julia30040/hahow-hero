import React, { Component } from 'react';
import styled from 'styled-components';
import { Route } from 'react-router-dom';

import Loader from '../component/Loader';
import HeroList from '../component/HeroList';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 360px;

  >.container {
    width: fit-content;
  }

  .list-loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
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
      isLoaded,
      heroes,
    } = this.state;

    return (
      <Wrapper>
        {isLoaded ? (
          <div className="container">
            <HeroList heroes={heroes}/>
          </div>
        ) : (
          <Loader className={'list-loader'} />
        )}
      </Wrapper>
    );
  }
}

export default HeroPage;