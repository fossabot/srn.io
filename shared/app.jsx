import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

if (process.env.BROWSER) {
  require('./main.css');
}

import Side from './components/side/Side';

class App extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div className="row">
        <div className="col-lg-2 sidebar"><Side /></div>
        <div className="col-lg-10 content">{this.props.children}</div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired
};

export default connect()(App);
