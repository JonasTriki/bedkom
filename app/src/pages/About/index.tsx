import * as React from 'react';
import {RouteComponentProps, withRouter} from "react-router";
import {injectIntl, InjectedIntlProps, FormattedMessage, FormattedHTMLMessage} from "react-intl";
import messages from "./messages";
import {TopInfo, Wrapper, Title, Description, InfoSections, LongDescription, Divider, CenteredTitle} from './styles';
import InfoSection, {InfoSectionProps} from './components/InfoSection';
import {mdiAccountGroup, mdiHumanGreeting, mdiPresentation} from "@mdi/js";
import NextSectionArrow from "./components/NextSectionArrow";
import Section from './components/Section';
import {useEffect} from "react";
import {connect} from "react-redux";
import {getBedkomMembers} from "../../api/actions";
import {RootState} from "../../store";
import {BedkomMember} from "../../models/BedkomMember";
import {Dispatch} from "redux";

interface AboutProps extends RouteComponentProps, InjectedIntlProps {
  bedkomMembers: BedkomMember[];
  getBedkomMembers: () => void;
}

const About: React.FC<AboutProps> = ({intl, getBedkomMembers, bedkomMembers}) => {

  // Fetch bedkom-members upon mounting component
  useEffect(() => {
    getBedkomMembers();
  }, []);

  const infoSections: InfoSectionProps[] = [
    {
      icon: mdiPresentation,
      title: intl.formatMessage(messages.presentations),
      description: intl.formatMessage(messages.presentationsInfo),
    },
    {
      icon: mdiHumanGreeting,
      title: intl.formatMessage(messages.relations),
      description: intl.formatMessage(messages.relationsInfo),
    },
    {
      icon: mdiAccountGroup,
      title: intl.formatMessage(messages.members),
      description: intl.formatHTMLMessage(messages.membersInfo),
    },
  ];

  const TopSection = () => (
    <Section excludeMenu>
      <TopInfo>
        <Title>
          <FormattedHTMLMessage
            id='about.bedkom-title'
            defaultMessage='<strong>Bedriftskomitéen</strong> ved echo – Fagutvalget for informatikk, UiB'
          />
        </Title>
        <Description>
          <FormattedHTMLMessage
            id='about.bedkom-short-desc'
            defaultMessage='
              Vi er en undergruppe av <span className="emphasis">echo</span>, med ansvar for å arrangere presentasjoner med bedrifter.
              Vi tilbyr hjelp med planlegging, markedsføring og organisering av presentasjoner fra start til slutt.
              <br /><br />
              Dersom dette virker interessant for dere som bedrift, vennligst besøk siden «For bedrifter» for mer informasjon.
            '
          />
        </Description>
      </TopInfo>
      <InfoSections>
        {infoSections.map((props, i) => (
          <InfoSection
            key={i}
            {...props}
          />
        ))}
      </InfoSections>
      <NextSectionArrow>
        {intl.formatMessage(messages.ourMembers)}
      </NextSectionArrow>
    </Section>
  );

  const MembersSection = () => (
    <Section>
      <LongDescription>
        <FormattedHTMLMessage
          id='about.bedkom-desc'
          defaultMessage='
            Bedriftskomitéen (eller <i>Bedkom</i> for kort) ved echo tilbyr hjelp med planlegging, markedsføring og organisering av ulike arrangement for bedrifter. Dette kan for eksempel være
            bedriftspresentasjoner eller workshops. Vi tilbyr rådgivning til bedrifter om hvordan de kan kommunisere effektivt og målrettet med våre studenter, og
            være en positiv faglig bidragsyter ved Institutt for Informatikk.<br /><br />

            Medlemstallet i Bedkom er ikke fastsatt, og nye medlemmer rekrutteres ved behov. Bedriftskomitéens medlemmer velges ikke ved ordinært valg, men ved
            stemmegivning blant eksisterende medlemmer. Ledige posisjoner utlyses på echo sine sider.
          '
        />
      </LongDescription>
      <CenteredTitle>
        {intl.formatMessage(messages.ourMembers)}
      </CenteredTitle>
      <Divider/>
      {bedkomMembers.length === 0 ? (
        <div>Laster inn...</div>
      ) : (
        bedkomMembers.map((member, i) => (
          <div key={i}>
            {member.firstName + " " + member.lastName}
          </div>
        ))
      )}
      <Divider/>
      <NextSectionArrow>
        {intl.formatMessage(messages.contactSchema)}
      </NextSectionArrow>
    </Section>
  );

  const schemaSection = (
    <Section>

    </Section>
  );

  return (
    <Wrapper>
      <TopSection/>
      <MembersSection/>
      {schemaSection}
    </Wrapper>
  )
};

const mapStateToProps = (state: RootState) => ({
  bedkomMembers: state.api.bedkomMembers
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getBedkomMembers: () => dispatch(getBedkomMembers())
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(withRouter<AboutProps>(About)));