import * as React from 'react';
import {injectIntl, InjectedIntlProps} from 'react-intl';
import {
  Banner,
  News,
  NextPresentation,
  Subtitle,
  Title,
  Wrapper,
  Description,
  Articles,
  PresentationInfo
} from "./styles";
import {RootState} from "../../store";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {Presentation} from "../../models/Presentation";
import {Article} from "../../models/Article";
import globalMessages from "../../translations/global";
import messages from "./messages";
import {Button} from "../../styles/Button";
import {User} from "../../models/User";
import ArticleItem from "./components/ArticleItem";
import {useState} from "react";
import PresentationDialog from "./components/PresentationDialog";

interface HomeProps extends InjectedIntlProps {
  user: User;
  presentations: Presentation[] | null;
  news: Article[] | null;
}

const Home: React.FC<HomeProps> = ({intl, user, presentations, news}) => {

  const nextPresentaion = () => {
    if (!presentations || presentations.length === 0) return;
    return presentations[0];
  };
  const pres = nextPresentaion();
  const userSignedUpToPres = (pres && user.presentations) ? user.presentations.indexOf(pres.id) > -1 : false;

  const [presentationDialogOpen, setPresentationDialogOpen] = useState(false);

  const register = () => setPresentationDialogOpen(true);

  const deregister = () => {

    // TODO: Alert dialog with confirmation, before deregistering.
  };

  return (
    <Wrapper>
      <NextPresentation>
        {!pres ? (
          <div>{intl.formatMessage(globalMessages.loading)}</div>
        ) : (
          <>
            <Title>{intl.formatMessage(messages.nextPresentation)}</Title>
            <Banner>
              <img src={pres.company ? pres.company.bannerImgUrl : ''}/>
            </Banner>
            <Subtitle>
              {
                pres.company
                  ? intl.formatMessage(messages.welcomeToPresentationWith, {company: pres.company.name})
                  : intl.formatMessage(messages.welcomeToPresentation)
              }
            </Subtitle>
            <Description>
              {pres.description}
            </Description>
            <Button theme={userSignedUpToPres ? 'red' : 'normal'} onClick={() => {
              if (userSignedUpToPres) {
                deregister();
              } else {
                register();
              }
            }}>
              {
                userSignedUpToPres
                  ? intl.formatMessage(messages.clickForDeregistration)
                  : intl.formatMessage(messages.clickForRegistration)
              }
            </Button>
            <PresentationInfo>
              {pres.minStudyYear > 1 ? (
                intl.formatMessage(messages.presentationOpenFor, {year: pres.minStudyYear})
              ) : (
                intl.formatMessage(messages.presentationOpenForAll)
              )}
            </PresentationInfo>
          </>
        )}
      </NextPresentation>
      <News>
        {!news ? (
          <div>{intl.formatMessage(globalMessages.loading)}</div>
        ) : (
          <>
            <Title>{intl.formatMessage(messages.news)}</Title>
            <Articles>
              {
                news.map((article, i) => (
                  <ArticleItem key={i} article={article}/>
                ))
              }
            </Articles>
          </>
        )}
      </News>
      <PresentationDialog
        open={presentationDialogOpen} setOpen={setPresentationDialogOpen}
        presentation={pres}
      />
    </Wrapper>
  );
};

const mapStateToProps = (state: RootState) => ({
  user: state.api.user,
  presentations: state.api.presentations,
  news: state.api.news,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Home));