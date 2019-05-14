import * as React from "react";
import styled from "styled-components";
import {Article} from "../../../models/Article";
import {grayBorder} from "../../../colors";
import {DateTime} from "luxon";

const Style = styled.div`
  display: grid;
  grid-template-columns: 5rem 1fr;
  grid-template-rows: 1fr 1fr;
  border: 1px solid ${grayBorder};
  border-radius: .25rem;
  
  > div {
    padding: .5rem;
  }
`;

const DayMonth = styled.div`
  grid-row: 1 / 3;
  font-weight: 600;
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 1.25rem;
`;

const Headline = styled.div`
  font-size: 1.25rem;
`;

const Description = styled.div`

`;

interface ArticleItemProps {
  article: Article;
}

const ArticleItem: React.FC<ArticleItemProps> = ({article}) => {
  const dt = DateTime.fromISO(article.datePublished);
  const dayMonth = dt.toFormat('dd MMM').toUpperCase();
  return (
    <Style>
      <DayMonth>{dayMonth}</DayMonth>
      <Headline>{article.headline}</Headline>
      <Description>{article.description}</Description>
    </Style>
  )
};

export default ArticleItem;