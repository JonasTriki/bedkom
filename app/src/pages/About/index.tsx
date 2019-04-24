import * as React from 'react';
import {RouteComponentProps, withRouter} from "react-router";
import {injectIntl, InjectedIntlProps, FormattedHTMLMessage, FormattedMessage} from "react-intl";
import messages from "./messages";
import {
  TopInfo,
  Wrapper,
  Title,
  Description,
  InfoSections,
  LongDescription,
  Divider,
  CenteredTitle,
  Members,
  MultiInput, FormWrapper
} from './styles';
import InfoSection, {InfoSectionProps} from './components/InfoSection';
import {mdiAccountGroup, mdiHumanGreeting, mdiPresentation} from "@mdi/js";
import NextSectionArrow from "./components/NextSectionArrow";
import Section from './components/Section';
import {useEffect, useRef, useState} from "react";
import {connect} from "react-redux";
import {getBedkomMembers} from "../../api/actions";
import {RootState} from "../../store";
import {BedkomMember} from "../../models/BedkomMember";
import {Dispatch} from "redux";
import MemberBlock from "./components/MemberBlock";
import {Form} from '../../styles/Form';
import {Input} from "../../styles/Input";
import {Button} from '../../styles/Button';
import * as api from "../../api/endpoints";
import {useSnackbar} from "notistack";
import {errorSnack, infoSnack, successSnack} from "../../styles/SnackbarProps";
import isEmail from "validator/lib/isEmail";

interface AboutProps extends RouteComponentProps, InjectedIntlProps {
  bedkomMembers: BedkomMember[] | null;
  getBedkomMembers: () => void;
}

const About: React.FC<AboutProps> = ({intl, getBedkomMembers, bedkomMembers}) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  // Fetch bedkom-members upon mounting component
  useEffect(() => {
    getBedkomMembers();
  }, []);

  const ourMembersRef = useRef<HTMLDivElement>(null);
  const contactFormRef = useRef<HTMLDivElement>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sendingForm, setSendingForm] = useState(false);
  const resetState = () => {

    // TODO: Kind of lame to be doing this all manually, right?
    setName('');
    setEmail('');
    setMessage('');
    setSendingForm(false);
  };

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

  const validateContactFormInput = () => {
    if (name.length === 0) {
      enqueueSnackbar(intl.formatMessage(messages.errorName), infoSnack);
      return false;
    }
    if (!isEmail(email)) {
      enqueueSnackbar(intl.formatMessage(messages.errorEmail), infoSnack);
      return false;
    }
    if (message.length === 0) {
      enqueueSnackbar(intl.formatMessage(messages.errorMessage), infoSnack);
      return false;
    }
    return true;
  };

  const sendContactForm = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    if (sendingForm || !validateContactFormInput()) return;
    setSendingForm(true);

    let response = await api.aboutContact(name, email, message);
    if (!response || response.status !== 200) {
      enqueueSnackbar(intl.formatMessage(messages.errorSendingMessage), errorSnack);
    } else {
      enqueueSnackbar(intl.formatMessage(messages.messageSent), successSnack);
    }
    resetState();
  };

  const topSection = (
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
      <NextSectionArrow sectionRef={ourMembersRef}>
        {intl.formatMessage(messages.ourMembers)}
      </NextSectionArrow>
    </Section>
  );

  const membersSection = (
    <Section ref={ourMembersRef}>
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
      <Members>
        {!bedkomMembers ? (
          <div>Laster inn...</div>
        ) : (
          bedkomMembers.map((member, i) => (
            <MemberBlock member={member} key={i}>
              {member.firstName + " " + member.lastName}
            </MemberBlock>
          ))
        )}
      </Members>
      <Divider/>
      <NextSectionArrow sectionRef={contactFormRef}>
        {intl.formatMessage(messages.contactForm)}
      </NextSectionArrow>
    </Section>
  );

  const formSection = (
    <Section ref={contactFormRef}>
      <LongDescription>
        <FormattedMessage
          id='about.contact-form-info'
          defaultMessage='
            Dersom du har noen spørsmål angående Bedriftskomitéen, eller hvordan man for eksempel blir medlem, kan du sende en liten melding til oss ved hjelp av skjemaet nedenfor. Vil vi komme tilbake til deg så snart som mulig!
          '
        />
      </LongDescription>
      <FormWrapper>
        <CenteredTitle>
          {intl.formatMessage(messages.contactForm)}
        </CenteredTitle>
        <Form fixedWidth='25rem'>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={intl.formatMessage(messages.name)}
          />
          <Input
            email
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={intl.formatMessage(messages.email)}
          />
          <MultiInput
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={intl.formatMessage(messages.message)}
          />
          <Button onClick={sendContactForm}>
            <FormattedMessage
              id='about.contact-form-send'
              defaultMessage='Send inn'
            />
          </Button>
        </Form>
      </FormWrapper>
    </Section>
  );

  return (
    <Wrapper>
      {topSection}
      {membersSection}
      {formSection}
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