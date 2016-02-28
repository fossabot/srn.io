import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import PostList from './components/post/PostList';

class Index extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <PostList />
    );
  }
}

export default connect()(Index);
