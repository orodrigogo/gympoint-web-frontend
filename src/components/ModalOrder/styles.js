import styled from "styled-components";
import { darken } from "polished";

export const Container = styled.div`
  background: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100vh;
  z-index: 1;
  position: absolute;

  form {
    width: 450px;
    margin: 100px auto;
    border-radius: 4px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    background-color: #ffffff;
    display: flex;
    flex-direction: column;

    h1 {
      font-family: Roboto;
      font-size: 14px;
      font-weight: bold;
      color: #444444;
      padding: 15px;
    }

    > span {
      width: 100%;
      text-align: justify;
      font-family: Roboto;
      font-size: 16px;
      color: #666666;
      padding: 10px 15px;
    }

    textarea {
      height: 127px;
      margin: 0 15px;
      padding: 10px;
      border-radius: 4px;
      border: solid 1px #dddddd;
      background-color: #ffffff;
    }

    button {
      height: 45px;
      margin: 20px 15px;
      border: none;
      border-radius: 4px;
      background-color: #ee4d64;
      font-family: Roboto;
      font-size: 16px;
      font-weight: bold;
      color: #ffffff;

      :disabled {
        cursor: not-allowed;
      }

      &:hover {
        background: ${darken(0.03, "#ee4d64")};
      }
    }
  }
`;
