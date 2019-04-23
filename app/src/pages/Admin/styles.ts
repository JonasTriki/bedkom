import styled from "styled-components";
import {darkBlue, darkerBlue, yellow} from "../../colors";
import {ComponentType} from "react";

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
  background: ${darkBlue};
  color: white;
  padding: .5rem;
`;

export const PageListSeparator = styled.div`
  height: 1px;
  width: calc(100% - 1rem);
  background: ${yellow};
  margin: 0 .5rem .5rem;
`;

export interface AdminPageItemProps {
  text: string;
  path: string;
  component: ComponentType;
  checked?: boolean;
  onClick?: () => void;
}

export const AdminPageItem = styled.div<AdminPageItemProps>`
  padding: .5rem .25rem;
  text-align: center;
  font-size: 1.1rem;
  color: ${(props: AdminPageItemProps) => props.checked ? yellow : 'white'}
  cursor: pointer;
  
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
`;

export const PageTitle = styled.div`
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  padding: 1rem;
`;

export const PageContent = styled.div`
  flex: 1;
  padding: 0 1rem;
`;