import React from "react";

// Add css class name based on props and onmouseover handler
const Image = ({ url, title, id, onMouseOver, active }) => (
  <li className={active ? 'active' : ''}>
    <img onMouseOver={(e) => onMouseOver(id, e)} id={id} src={url} alt={title} />
  </li>
);

export default Image;
