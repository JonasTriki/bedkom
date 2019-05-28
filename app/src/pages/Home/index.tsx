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
import AlertDialog from "../../components/AlertDialog";
import {registrationsDeregister} from "../../api/endpoints";
import {errorSnack, successSnack} from "../../styles/SnackbarProps";
import {useSnackbar} from "notistack";
import {getSession} from "../../api/actions";

interface HomeProps extends InjectedIntlProps {
  user: User;
  presentations: Presentation[] | null;
  news: Article[] | null;
  getSession: () => void;
}

const Home: React.FC<HomeProps> = ({intl, user, presentations, news, getSession}) => {
  const { enqueueSnackbar } = useSnackbar();

  const nextPresentaion = () => {
    if (!presentations || presentations.length === 0) return;
    return presentations[0];
  };
  const pres = nextPresentaion();
  const userSignedUpToPres = (pres && user.presentations) ? user.presentations.indexOf(pres.id) > -1 : false;

  const [presentationDialogOpen, setPresentationDialogOpen] = useState(false);
  const [unregisterDialogOpen, setUnregisterDialogOpen] = useState(false);
  const [deregistering, setDeregistering] = useState(false);

  const registerDialog = () => setPresentationDialogOpen(true);

  const deregisterDialog = () => setUnregisterDialogOpen(true);
  const deregister = async () => {
    if (deregistering || !pres) return;
    setDeregistering(true);

    const response = await registrationsDeregister(pres.id);
    if (!response || response.status !== 200) {
      enqueueSnackbar(intl.formatMessage(messages.confirmDeregistrationError), errorSnack);
      return;
    }

    // Deregistered from company presentation
    // TODO: Dispatch action to users presentation
    getSession();
    setDeregistering(false);
    enqueueSnackbar(intl.formatMessage(messages.confirmDeregistrationSuccessful), successSnack);
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
                deregisterDialog();
              } else {
                registerDialog();
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
      <AlertDialog
        open={unregisterDialogOpen}
        setOpen={setUnregisterDialogOpen}
        title={intl.formatMessage(messages.confirmDeregistration)}
        description={intl.formatMessage(messages.confirmDeregistrationMessage)}
        yesMessage={
          deregistering
            ? intl.formatMessage(globalMessages.loading)
            : intl.formatMessage(messages.confirmDeregistrationYes)
        }
        yesAction={deregister}
      />
    </Wrapper>
  );
};

const mapStateToProps = (state: RootState) => ({
  user: state.api.user,
  presentations: state.api.presentations,
  news: state.api.news,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getSession: () => dispatch(getSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Home));