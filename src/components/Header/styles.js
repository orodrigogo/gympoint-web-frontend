import styled from "styled-components";
import { darken } from "polished";

export const Container = styled.div`
  width: 100%;
  height: 64px;
  border: solid 1px #dddddd;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;

  nav {
    display: flex;
    align-items: center;

    ul {
      display: flex;
      align-items: center;

      &::before {
        content: "";
        border: 1px solid #ddd;
        height: 32px;
        margin: 0 20px;
      }

      li {
        cursor: pointer;
        margin-left: 20px;

        &:first-child {
          margin: 0;
        }

        a {
          transition: color 0.2s;
          color: #444444;
          font-family: Roboto;
          font-size: 15px;
          font-weight: bold;

          &:hover {
            color: #de3b3b;
          }
        }
      }
    }
  }

  aside {
    display: flex;
    flex-direction: column;

    span {
      font-family: Roboto;
      font-size: 14px;
      font-weight: bold;
      color: #666666;
      padding-bottom: 3px;
    }

    button {
      font-family: Roboto;
      font-size: 14px;
      color: #de3b3b;
      border: none;
      background: none;

      &:hover {
        color: ${darken(0.03, "#de3b3b")};
      }
    }
  }
`;
