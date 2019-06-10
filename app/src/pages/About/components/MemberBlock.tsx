import * as React from "react";
import styled from "styled-components";
import { BedkomMember } from "../../../models/BedkomMember";
import { mdiAccountCircle } from "@mdi/js";
import { darkBlue, grayedText } from "../../../colors";
import { Icon } from "@mdi/react";
import { InjectedIntlProps, injectIntl } from "react-intl";
import messages from "../../../types/messages";

const Style = styled.div`
  display: grid;
  grid-column-gap: 0.5rem;
  justify-content: center;
  justify-items: center;

  img {
    width: 7.5rem;
    height: 7.5rem;
  }
`;

interface TextProps {
  dimmed?: boolean;
}

const Text = styled.div<TextProps>`
  font-size: 1.1rem;
  color: ${props => (props.dimmed ? grayedText : darkBlue)};
`;

interface MemberBlockProps extends InjectedIntlProps {
  member: BedkomMember;
}

const MemberBlock = injectIntl<MemberBlockProps>(({ member, intl }) => {
  const fullName = member.firstName + " " + member.lastName;
  return (
    <Style>
      {member.imgUrl ? (
        <img src={member.imgUrl} alt={fullName} />
      ) : (
        <Icon
          className="thumb"
          path={mdiAccountCircle}
          color={darkBlue}
          size="7.5rem"
        />
      )}
      <Text>{fullName}</Text>
      <Text dimmed>{intl.formatMessage(messages[member.position])}</Text>
    </Style>
  );
});

export default MemberBlock;
