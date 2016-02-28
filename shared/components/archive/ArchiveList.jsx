import React, { Component } from 'react';
import { connect } from 'react-redux';

import ArchiveItem from './ArchiveItem';

const ArchiveList = (props) => {
  if (!props.posts || props.posts.length === 0) {
    return (
      <p>Archive is empty.</p>
    );
  }

  return (
    <section>
      <ul className="archive">
        {props.posts.map(post => <ArchiveItem key={post._id} post={post} />)}
      </ul>
    </section>
  );
};

function mapStateToProps(state) {
  return {
    posts: state.posts
  };
}

export default connect(mapStateToProps)(ArchiveList);
