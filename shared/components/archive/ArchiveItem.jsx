import React from 'react';
import { Link } from 'react-router'

const ArchiveItem = (props) => {
  return (
    <li>
      <Link to={props.post.url_slug}>{props.post.title}</Link>
      <span>{new Date(props.post.date).toLocaleDateString()}</span>
    </li>
  )
};

export default ArchiveItem;
