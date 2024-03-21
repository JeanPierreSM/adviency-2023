import React from "react";
import styled from "styled-components";

const TOTAL_SNOWFLAKES = 16;

const ContainerBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
`;

const SnowflakeBox = styled.span`
  position: absolute;
  font-size: 24px;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
`;

const RandomSnowflakes = () => {
  const snowFlakeRandomPosition = (index) => {
    const position = {
      top: `${Math.random() * 80}vh`,
      left:
        index < TOTAL_SNOWFLAKES / 2
          ? `${Math.random() * 50}%`
          : `${50 + Math.random() * 50}%`,
    };

    return position;
  };

  return (
    <ContainerBox>
      {Array.from({ length: TOTAL_SNOWFLAKES }, (_, index) => {
        const position = snowFlakeRandomPosition(index);
        return (
          <SnowflakeBox
            key={index}
            role="img"
            aria-label="snowflake"
            top={position.top}
            left={position.left}
          >
            ❄️
          </SnowflakeBox>
        );
      })}
    </ContainerBox>
  );
};

export default RandomSnowflakes;
