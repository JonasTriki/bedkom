import React, { useState } from "react";
import { connect } from "react-redux";
import { RootState } from "../../store";
import { User } from "../../models/User";
import {
  Column,
  Container,
  Divider,
  Form,
  InfoTable,
  Top,
  Wrapper
} from "./styles";
import { mdiAccountCircle, mdiExitToApp } from "@mdi/js";
import { Icon } from "@mdi/react";
import { darkBlue } from "../../colors";
import { FormattedMessage, InjectedIntlProps, injectIntl } from "react-intl";
import { Link } from "../../styles/Link";
import messages from "./messages";
import { Input } from "../../styles/Input";
import {
  usersChangePassword,
  usersEdit,
  usersLogout
} from "../../api/endpoints";
import { Dispatch } from "redux";
import { userEdited, userSignedOut } from "../../api/actions";
import { IconButton } from "../../styles/IconButton";
import isEmail from "validator/lib/isEmail";
import { useSnackbar } from "notistack";
import {
  errorSnack,
  infoSnack,
  successSnack
} from "../../styles/SnackbarProps";
import AlertDialog from "../../components/AlertDialog";

interface ProfileProps extends InjectedIntlProps {
  user: User;
  userEdited: (user: User) => void;
  userSignedOut: () => void;
}

const Profile: React.FC<ProfileProps> = ({
  user,
  userEdited,
  userSignedOut,
  intl
}) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [allergies, setAllergiers] = useState(user.allergies);

  const [changingProfile, setChangingProfile] = useState(false);
  const [changingProfileLoading, setChangingProfileLoading] = useState(false);

  const [editingPassword, setEditingPassword] = useState(false);
  const [editingPasswordLoading, setEditingPasswordLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [deleteOpenDialog, setDeleteOpenDialog] = useState(false);

  const getAdmission = (user: User) => {
    const msg =
      user.startSemester === "spring" ? messages.spring : messages.autumn;
    return intl.formatMessage(msg) + " " + user.startYear;
  };

  const validateChangeProfileInput = () => {
    if (firstName.length === 0) {
      enqueueSnackbar(intl.formatMessage(messages.errorFirstName), infoSnack);
      return false;
    }
    if (lastName.length === 0) {
      enqueueSnackbar(intl.formatMessage(messages.errorLastName), infoSnack);
      return false;
    }
    if (!isEmail(email)) {
      enqueueSnackbar(intl.formatMessage(messages.errorEmail), infoSnack);
      return false;
    }
    return true;
  };

  const changeProfile = async () => {
    if (changingProfile && !changingProfileLoading) {
      if (!validateChangeProfileInput()) return;

      setChangingProfileLoading(true);

      const response = await usersEdit(firstName, lastName, email, allergies);
      if (!response || response.status !== 200) {
        enqueueSnackbar(
          intl.formatMessage(messages.profileChangingError),
          errorSnack
        );
      } else {
        // Dispatch changes to redux store
        userEdited(response.data.data.user);
        setChangingProfile(false);
      }

      setChangingProfile(false);
      setChangingProfileLoading(false);
    } else {
      setChangingProfile(true);
    }
  };

  const validateChangePasswordInput = () => {
    if (currentPassword.length <= 1) {
      enqueueSnackbar(
        intl.formatMessage(messages.errorCurrentPassword),
        infoSnack
      );
      return false;
    }
    if (newPassword.length <= 1) {
      enqueueSnackbar(intl.formatMessage(messages.errorNewPassword), infoSnack);
      return false;
    }
    return true;
  };

  const changePassword = async () => {
    if (editingPassword && !editingPasswordLoading) {
      if (!validateChangePasswordInput()) return;

      setEditingPasswordLoading(true);

      const response = await usersChangePassword(currentPassword, newPassword);
      if (!response) {
        enqueueSnackbar(
          intl.formatMessage(messages.changingPasswordError),
          errorSnack
        );
      } else {
        if (response.status !== 200) {
          if (response.status === 401) {
            enqueueSnackbar(
              intl.formatMessage(messages.changingPasswordNoMatch),
              errorSnack
            );
          } else {
            enqueueSnackbar(
              intl.formatMessage(messages.changingPasswordError),
              errorSnack
            );
          }
        }
      }

      setCurrentPassword("");
      setNewPassword("");
      setEditingPasswordLoading(false);
      setEditingPassword(false);
    } else {
      setEditingPassword(true);
    }
  };

  const resetPasswordUsingMail = async () => {
    // TODO: Implement mail-endpoint first.
    setTimeout(() => {}, 1000);
    enqueueSnackbar("Tilbakemeldingslenke sendt!", successSnack);
  };

  const logout = async () => {
    // Log out user
    const response = await usersLogout();
    if (!response || response.status !== 200) {
      enqueueSnackbar(
        intl.formatMessage(messages.profileLogoutError),
        errorSnack
      );
      return;
    }

    // ... and update store + cookies!
    userSignedOut();
  };

  const deleteMyAccount = async () => {
    // TODO: Implement delete my account
  };

  return (
    <Wrapper>
      <Container>
        <Top>
          <Icon
            className="thumb"
            path={mdiAccountCircle}
            color={darkBlue}
            size="5rem"
          />
          {user.firstName + " " + user.lastName}
        </Top>
        <Divider />
        <InfoTable>
          <tbody>
            <tr>
              <td>
                <FormattedMessage
                  id="profile.firstname"
                  defaultMessage="Fornavn"
                />
              </td>
              {changingProfile ? (
                <td>
                  <Input
                    value={firstName}
                    disabled={changingProfileLoading}
                    onChange={e => setFirstName(e.target.value)}
                  />
                </td>
              ) : (
                <td>{user.firstName}</td>
              )}
            </tr>
            <tr>
              <td>
                <FormattedMessage
                  id="profile.lastname"
                  defaultMessage="Etternavn"
                />
              </td>
              {changingProfile ? (
                <td>
                  <Input
                    value={lastName}
                    disabled={changingProfileLoading}
                    onChange={e => setLastName(e.target.value)}
                  />
                </td>
              ) : (
                <td>{user.lastName}</td>
              )}
            </tr>
            <tr>
              <td>
                <FormattedMessage
                  id="profile.email"
                  defaultMessage="E-postadresse"
                />
              </td>
              {changingProfile ? (
                <td>
                  <Input
                    value={email}
                    disabled={changingProfileLoading}
                    onChange={e => setEmail(e.target.value)}
                  />
                </td>
              ) : (
                <td>{user.email}</td>
              )}
            </tr>
            <tr>
              <td>
                <FormattedMessage
                  id="profile.allergies"
                  defaultMessage="Allergier"
                />
              </td>
              {changingProfile ? (
                <td>
                  <Input
                    value={allergies}
                    disabled={changingProfileLoading}
                    onChange={e => setAllergiers(e.target.value)}
                  />
                </td>
              ) : (
                <td>
                  {user.allergies
                    ? user.allergies
                    : intl.formatMessage(messages.noAllergies)}
                </td>
              )}
            </tr>
            <tr className="bottom-divider">
              <td />
              <td>
                <Link onClick={changeProfile}>
                  {changingProfile ? (
                    changingProfileLoading ? (
                      intl.formatMessage(messages.saving)
                    ) : (
                      <FormattedMessage
                        id="profile.save-change"
                        defaultMessage="Lagre endringer"
                      />
                    )
                  ) : (
                    <FormattedMessage
                      id="profile.change"
                      defaultMessage="Endre profil"
                    />
                  )}
                </Link>
              </td>
            </tr>
            <tr className="top-pad">
              <td>
                <FormattedMessage
                  id="profile.studyprogram"
                  defaultMessage="Studieprogram"
                />
              </td>
              <td>{user.studyProgram}</td>
            </tr>
            <tr>
              <td>
                <FormattedMessage id="profile.year" defaultMessage="Årskull" />
              </td>
              <td>{getAdmission(user)}</td>
            </tr>
            <tr className="bottom-divider">
              <td>
                <FormattedMessage id="profile.grade" defaultMessage="Klasse" />
              </td>
              <td>
                <FormattedMessage
                  id="profile.class.value"
                  defaultMessage="{year}. klasse"
                  values={{ year: user.year }}
                />
              </td>
            </tr>
            <tr className="top-pad">
              <td>
                <FormattedMessage
                  id="profile.password"
                  defaultMessage="Passord"
                />
              </td>
              <td>
                {editingPassword ? (
                  <Column>
                    <Form>
                      <Input
                        password
                        value={currentPassword}
                        onChange={e => setCurrentPassword(e.target.value)}
                        placeholder={intl.formatMessage(
                          messages.currentPassword
                        )}
                      />
                      <Input
                        password
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        placeholder={intl.formatMessage(messages.newPassword)}
                      />
                    </Form>
                    <Link onClick={changePassword}>
                      {editingPasswordLoading ? (
                        intl.formatMessage(messages.saving)
                      ) : (
                        <FormattedMessage
                          id="profile.save-new-password"
                          defaultMessage="Endre passord"
                        />
                      )}
                    </Link>
                  </Column>
                ) : (
                  <Link onClick={changePassword}>
                    <FormattedMessage
                      id="profile.change-password"
                      defaultMessage="Klikk for å endre passord"
                    />
                  </Link>
                )}
              </td>
            </tr>
            <tr>
              <td />
              <td>
                <Link onClick={resetPasswordUsingMail}>
                  <FormattedMessage
                    id="profile.reset-password"
                    defaultMessage="Klikk for å få tilbakestillingslenke på e-post"
                  />
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <FormattedMessage id="profile.account" defaultMessage="Konto" />
              </td>
              <td>
                <Link onClick={() => setDeleteOpenDialog(true)}>
                  <FormattedMessage
                    id="profile.delete-my-account"
                    defaultMessage="Slett min konto"
                  />
                </Link>
              </td>
            </tr>
          </tbody>
        </InfoTable>
        <Divider />
        <IconButton iconPath={mdiExitToApp} className="logout" onClick={logout}>
          <FormattedMessage id="profile.logout" defaultMessage="Logg ut" />
        </IconButton>
        <AlertDialog
          open={deleteOpenDialog}
          setOpen={setDeleteOpenDialog}
          title={intl.formatMessage(messages.confirmAccountDeletion)}
          description={intl.formatMessage(messages.accountDeletionMessage)}
          yesMessage={intl.formatMessage(messages.accountDeletionYes)}
          yesAction={deleteMyAccount}
        />
      </Container>
    </Wrapper>
  );
};

const mapStateToProps = (state: RootState) => ({
  user: state.api.user
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  userEdited: (user: User) => dispatch(userEdited(user)),
  userSignedOut: () => dispatch(userSignedOut())
});

export default injectIntl(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Profile)
);

/*

<IconButton iconPath={mdiPencil} className='change-info'>
  <FormattedMessage id='profile.change' defaultMessage='Endre profil'/>
</IconButton>

 */
