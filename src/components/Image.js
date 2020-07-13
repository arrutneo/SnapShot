import React from "react";

const Image = ({ url, title, id, onMouseOver, active }) => (
  // Add css class name based on props
  <li className={active ? 'active' : ''}>
    // Add onmouseover handler
    <img onMouseOver={(e) => onMouseOver(id, e)} id={id} src={url} alt={title} />
  </li>
);

export default Image;
