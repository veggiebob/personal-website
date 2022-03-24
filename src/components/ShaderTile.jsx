import React from "react";

const ShaderTile = ({ key, name, thumbnail, description, views, id }) => {
  return (
    <div>
      <br /> {name}
      <br /> {description}
      <br /> {views}
      <br />
      <iframe width='500' height='500' src={`https://www.shadertoy.com/embed/${id}?gui=true&t=300&paused=true&muted=true`} frameborder="0" allowfullscreen></iframe>
      {/* <img src={thumbnail} alt="" /> */}
    </div>
  );
};

export default ShaderTile;
