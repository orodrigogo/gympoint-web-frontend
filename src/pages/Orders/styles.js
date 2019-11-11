import styled from "styled-components";
import { darken } from "polished";

export const Container = styled.div`
  width: 700px;
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
  }
`;

export const Content = styled.div`
  margin-top: 30px;
  min-width: 700px;
  height: 542px;
  border-radius: 4px;
  background-color: #ffffff;

  table {
    width: 100%;
    text-align: left;
    padding: 30px;

    thead {
      font-family: Roboto;
      font-size: 16px;
      font-weight: bold;
      color: #444444;
    }

    tbody {
      font-family: Roboto;
      font-size: 16px;
      color: #666666;

      tr {
        td {
          padding: 15px 0;
          border-bottom: 1px solid #eee;

          button {
            background: none;
            border: none;
            margin: 0 10px;
          }

          > .btnEdit {
            font-family: Roboto;
            font-size: 15px;
            color: #4d85ee;
          }

          > .btnDelete {
            font-family: Roboto;
            font-size: 15px;
            color: #de3b3b;
          }

          &:last-child {
            text-align: right;
          }
        }
      }
    }
  }
`;

export const PageActions = styled.div`
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    border: none;
    padding: 10px;
    border-radius: 4px;
    background-color: #ee4d64;
    color: #fff;
  }

  span {
    margin: 0 10px;
  }
`;
