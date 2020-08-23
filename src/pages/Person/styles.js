import styled from 'styled-components';
import { darken } from 'polished';
import PerfectScrollbar from 'react-perfect-scrollbar';

export const Scroll = styled(PerfectScrollbar)`
  max-height: 320px;
  padding: 5px 15px;
`;

export const PersonList = styled.ul`

padding-top: 30px;
margin-top: 30px;
border-top: 1px solid #eee;
list-style: none;
li {
  display: flex;
  padding: 15px 10px;
  border: 1px solid #eee;
  border-radius: 4px;

  & + li {
    margin-top: 10px;
  }
  
  button {
    margin: 14px 0;
    height:35px;
    width: 60px;
    background: #3b9eff;
    font-weight: bold;
    color: #fff;
    border: 0;
    border-radius: 4px;
    font-size: 16px;
    transition: background 0.3s;

    &:hover {
      background: ${darken(0.1, '#3b9eff')};
    }
  }

  div {
    flex: 1;
    margin-left: 15px;

    p {
      color: #fff;
      margin-top: 5px;
      font-size: 15px;
    }
  }
}
`;

export const Container = styled.div`

  color: #fff;

  max-width: 600px;
  margin: 50px auto;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    input {
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #fff;
      margin: 0 0 10px;

      &::placeholder {
        color: rgba(255, 255, 255, 0.7);
      }
    }

    Select {
      background: #3100CE
      border: 0;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #fff;
      margin: 0 0 10px;

    }

    span {
      color: red;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }

    hr {
      border: 0;
      height: 1px;
      background: rgba(255, 255, 255, 0.2);
      margin: 10px 0 20px;
    }

    button {
      margin: 5px 0;
      height: 44px;
      background: #3b9eff;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.3s;

      &:hover {
        background: ${darken(0.1, '#3b9eff')};
      }
    }
  }

  > button {
    width: 45%;
    margin: 10px 14px;
    height: 44px;
    background: #f64c75;
    font-weight: bold;
    color: #fff;
    border: 0;
    border-radius: 4px;
    font-size: 16px;
    transition: background 0.3s;

    &:hover {
      background: ${darken(0.1, '#f64c75')};
    }
  }
`;
