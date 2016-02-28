import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'

import marked from 'marked';

const Side = (props) => {
  return (
    <div className="react-sidebar">
      <h1>
        <Link to="/">Søren Brokær</Link>
      </h1>
      <span className="tagline"
            dangerouslySetInnerHTML={{ __html: marked(props.bio || '') }}/>
      <ul>
        <li>
          <a href="https://github.com/srn" target="_blank">github</a>
        </li>
        <li>
          <a href="https://twitter.com/soerenr" target="_blank">twitter</a>
        </li>
        <li>
          <a href="https://linkedin.com/in/soerenr" target="_blank">linkedin</a>
        </li>
        <li>
          <Link to="/archive">archive</Link>
        </li>
      </ul>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    bio: state.settings.bio
  };
}

export default connect(mapStateToProps)(Side);
