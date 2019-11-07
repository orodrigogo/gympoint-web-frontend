import styled from "styled-components";
import { darken } from "polished";

export const Container = styled.div`
  width: 1200px;
  margin: 0 auto;
  margin-top: 30px;

  header {
    display: flex;
    justify-content: space-between;

    h1 {
      font-family: Roboto;
      font-size: 24px;
      font-weight: bold;
      color: #444444;
    }

    aside {
      display: flex;

      > .return {
        background-color: #cccccc;

        &:hover {
          background: ${darken(0.05, "#cccccc")};
        }
      }

      button {
        width: 142px;
        height: 35px;
        border-radius: 4px;
        background-color: #ee4d64;
        color: #fff;
        font-family: Roboto;
        font-size: 14px;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.3s;
        border: none;
        margin-left: 5px;

        &:hover {
          background: ${darken(0.05, "#ee4d64")};
        }

        svg {
          margin-right: 3px;
        }
      }
    }
  }
`;

export const Content = styled.div`
  margin-top: 30px;
  min-width: 1200px;
  border-radius: 4px;
  background-color: #ffffff;

  form {
    padding: 20px;

    > .same-row {
      display: flex;
      flex-direction: row;

      div {
        margin-left: 20px;

        &:first-child {
          margin-left: 0;
        }
      }
    }
  }

  div {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 20px 0;

    h3 {
      font-family: Roboto;
      font-size: 14px;
      font-weight: bold;
      color: #444444;
      margin-bottom: 5px;
    }

    input {
      height: 45px;
      border-radius: 4px;
      border: solid 1px #dddddd;
      background-color: #ffffff;
      padding-left: 10px;
    }

    span {
      font-family: Roboto;
      font-size: 14px;
      color: #de3b3b;
      margin-top: 5px;
    }
  }
`;
