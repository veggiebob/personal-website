import React from "react";

const ShaderTile = ({ key, name, thumbnail, description, views }) => {
  return (
    <div>
      {key}
      <br /> {name}
      <br /> {description}
      <br /> {views}
      <br />
      <img src={thumbnail} alt="" />
    </div>
  );
};

export default ShaderTile;
