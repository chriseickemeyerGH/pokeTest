import React from "react";

const Type = ({ typeArray }) => (
  <>
    {typeArray.map(item => (
      <p key={item.type.name}>Type: {item.type.name.toUpperCase()}</p>
    ))}
  </>
);
export default Type;
