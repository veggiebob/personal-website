import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import ShaderTile from "../components/ShaderTile";
import { fetchShadertoyData } from "../util/fetchShadertoyData";

const shadertoy = () => {
  const [shaders, setShaders] = useState([]);

  useEffect(async () => {
    setShaders(await fetchShadertoyData());
  }, []);

  return (
    <div>
      <h1>Shadertoy Projects</h1>
      <br />
      <p>
        All Projects{" "}
        <a href="https://www.shadertoy.com/user/veggiebob/sort=newest">here</a>
      </p>
      <div id="shadertoy-loads">
        {shaders.length > 0 ? (
          shaders.map((shaderData) => (
            <ShaderTile {...shaderData} key={shaderData.key} id={shaderData.key} />
          ))
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </div>
  );
};

export default shadertoy;
