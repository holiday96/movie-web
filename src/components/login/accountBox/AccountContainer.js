import React from 'react'
import styled from "styled-components";
import { AccountBox } from "./index";

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const AccountContainer = () => {
    return (
        <AppContainer>
          <AccountBox />
        </AppContainer>
    )
}

export default AccountContainer
