import styled from "styled-components";
import { grayBorder } from "../colors";

export const Table = styled.table`
  table-layout: fixed;
  border-collapse: collapse;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
  border-radius: 0.25rem;

  thead {
    th {
      text-align: left;
      padding: 1rem;
      border-bottom: 1px solid ${grayBorder};
    }
  }

  tbody {
    tr {
      :hover {
        background: rgba(0, 0, 0, 0.025);
      }

      td {
        padding: 1rem;
      }

      td.company-logo {
        text-align: center;
        img {
          vertical-align: middle;
          max-height: 1rem;
          max-width: 3rem;
        }
      }

      td.icon-button {
        cursor: pointer;
        text-align: center;
        > * {
          vertical-align: middle;
        }
      }
    }
  }
`;
