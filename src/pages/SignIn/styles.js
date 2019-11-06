import styled from "styled-components";
import { darken } from "polished";

export const Wrapper = styled.div`
  background: #ee4d64;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.div`
  width: 360px;
  height: 448px;
  border-radius: 4px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  background-color: #ffffff;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    margin: 50px;
    width: 150px;
    height: 100px;
  }

  form {
    width: 100%;

    input {
      width: 90%;
      margin: 10px auto;
      padding: 0 10px;
      display: block;
      height: 45px;
      border-radius: 4px;
      border: solid 1px #dddddd;
      background-color: #ffffff;
      font-size: 16px;
    }

    > span {
      display: block;
      text-align: center;
      color: #ee4d64;
    }

    button {
      width: 90%;
      margin: 0 auto;
      height: 45px;
      border-radius: 4px;
      border: none;
      display: block;
      background-color: #ee4d64;
      color: #ffffff;
      font-size: 16px;
      font-weight: bold;
      margin-top: 20px;

      &:hover {
        background: ${darken(0.03, "#ee4d64")};
      }
    }
  }
`;
