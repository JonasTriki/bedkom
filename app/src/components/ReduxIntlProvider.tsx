import {connect} from "react-redux";
import {IntlProvider} from "react-intl";
import {RootState} from "../store";
import {messages} from "../";

const mapStateToProps = (state: RootState) => {
  const locale = state.lang.locale;
  return {
    key: locale,
    locale: locale,
    messages: messages[locale]
  }
};

/**
 * Custom Intl Provider to fetch language from Redux Store as we update it.
 */
export default connect(mapStateToProps)(IntlProvider);