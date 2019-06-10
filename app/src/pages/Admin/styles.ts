import styled from "styled-components";
import { darkBlue, darkerBlue, grayBorder, yellow } from "../../colors";
import { ComponentType } from "react";

export const AdminWrapper = styled.div`
  flex: 1;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 12rem auto;
  grid-template-areas: "pagelist" "page";
`;

export const AdminPageList = styled.div`
  grid-template: "pagelist";
  display: flex;
  flex-direction: column;
  color: ${darkBlue};
  border-right: 1px solid ${grayBorder};
`;

export const PageListSeparator = styled.div`
  height: 1px;
  width: calc(100% - 1rem);
  background: ${yellow};
  margin: 0 0.5rem 0.5rem;
`;

export interface AdminPageItemProps {
  text: string;
  path: string;
  component: ComponentType;
  checked?: boolean;
  onClick?: () => void;
}

export const AdminPageItem = styled.div<AdminPageItemProps>`
  padding: 0.75rem 0.5rem;
  text-align: center;
  font-size: 1.1rem;
  cursor: pointer;
  background: ${(props: AdminPageItemProps) =>
    props.checked ? yellow : "unset"};

  // Make the text unselectable
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

export const AdminPage = styled.div`
  grid-template: "page";
  display: grid;
  grid-template-rows: auto 1fr;
  overflow: scroll;
`;

export const PageHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
`;

export const PageTitle = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  flex: 1;
`;

export const PageContent = styled.div`
  flex: 1;
  padding: 0 2rem;
`;
