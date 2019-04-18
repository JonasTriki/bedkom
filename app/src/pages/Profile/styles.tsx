import styled from 'styled-components';
import {darkBlue, grayBorder, grayedText, redError} from "../../colors";

export const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 50rem;
  margin: 2rem 0;
  
  /* Delete me button */
  .delete-me {
    align-self: flex-end;
    margin-top: 2rem;
  }
  
  /* Logout button */
  .logout {
    align-self: flex-end;
  }
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: ${grayBorder};
  margin: 1rem 0;
`;

export const Top = styled.div`
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    margin-right: 2rem;
  }
`;

export const InfoTable = styled.table.attrs(() => ({
  border: 'none'
}))`
  border-collapse: collapse;

  tr {
    td {
      padding: .5rem;
      
      .change-info {
        margin-left: auto;
      }
    }
    
    td:first-child {
      text-align: right;
      padding-right: .5rem;
      color: ${grayedText};
    }
    
    td.vertical-children {
      display: flex;
      align-items: center;
    }
  }
  
  tr.bottom-divider {
    border-bottom: 1px solid ${grayBorder};
    
    > td {
      padding-bottom: 1rem;
    }
  }
  
  tr.top-pad > td {
    padding-top: 1rem;
  }
`;

export const Column = styled.div`
  display: grid;
  justify-items: start;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  
  > * {
    margin-bottom: .75rem;
  }
`;