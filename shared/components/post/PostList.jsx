import React, { Component } from 'react';
import { connect } from 'react-redux';

import PostItem from './PostItem';

const PostList = (props) => {
  const posts = props.posts.filter(post => {
    return !post.archived && !post.draft;
  });

  if (posts.length === 0) {
    return (
      <p>Nothing to see here.</p>
    );
  }

  return (
    <div>
      {posts.map(post => <PostItem key={post._id} post={post} />)}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    posts: state.posts
  }
}

export default connect(mapStateToProps)(PostList);
