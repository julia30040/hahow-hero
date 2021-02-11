import React from 'react';
import styled, { keyframes } from 'styled-components';

const jump = keyframes`
  0% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(6px);
  }

  100% {
    transform: translateY(6px);
  }
`;

const Wrapper = styled.div`
  font-size: 32px;
  color: grey;
`;

const Text = styled.span`
    display: inline-block;
    animation: ${jump} .6s ${({index}) => parseInt(index, 10) * 0.1}s linear alternate infinite;
`;

function Loader({
  className,
}) {
  const loadTexts = 'Loading...'.split('');

  return (
    <Wrapper className={className}>
      {loadTexts.map((loadText, index) => (
        <Text index={index} key={`loadText-${index}`}>{loadText}</Text>
      ))}
    </Wrapper>
  );
}

export default Loader;