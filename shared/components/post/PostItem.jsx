import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'

import marked from 'marked';

const PostItem = (props) => {
  var post;

  if (props.post) {
    post = props.post;
  } else {
    var slug = "/" + props.params.year + "/" + props.params.month + "/" + props.params.slug;
    post = props.posts.find(p => p.url_slug === slug);
  }

  return (
    <section>
      <h1>
        <Link to={post.url_slug}>{post.title}</Link>
      </h1>

      <p>{new Date(post.date).toLocaleDateString()}</p>

      {post.content
        ? <p dangerouslySetInnerHTML={{ __html: marked(post.content) }} />
        : <img src={post.instagramUrl} />}
    </section>
  );
};

function mapStateToProps(state) {
  return {
    posts: state.posts
  };
}

export default connect(mapStateToProps)(PostItem);
