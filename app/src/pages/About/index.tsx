import * as React from 'react';
import {RouteComponentProps, withRouter} from "react-router";
import {injectIntl, InjectedIntlProps} from "react-intl";

interface AboutProps extends RouteComponentProps, InjectedIntlProps {

}

class About extends React.Component<AboutProps> {
  render() {
    return (
      <div>
        About
      </div>
    )
  }
}

export default injectIntl(withRouter<AboutProps>(About));