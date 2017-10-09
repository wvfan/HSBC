import React from 'react';

const lang = dict => (
  Component => (
    class LangProvider extends React.Component {
      static childContextTypes = {
        dict: React.PropTypes.object,
      };
      getChildContext() {
        return { dict };
      }
      render() {
        return <Component {...this.props} />;
      }
    }
  )
);
export default lang;
