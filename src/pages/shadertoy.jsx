import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import ShaderTile from "../components/ShaderTile";
import { fetchShadertoyData } from "../util/fetchShadertoyData";
import { ExternalLinkIcon } from "../components/BetterLink";


const shadertoy = () => {
  const [shaders, setShaders] = useState([]);

  useEffect(() => {
    async function fetchShaders() {
      const data = await fetchShadertoyData();
      // sort the shaders by likes
      data.sort((a, b) => b.likes - a.likes);
      setShaders(data);
    }
    fetchShaders();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-content-primary mb-4">Shadertoy Projects</h1>
        <p className="text-lg text-content-secondary mb-6">
          A collection of my fragment shaders created with GLSL. Each shader is an interactive visual experiment.
        </p>
        <a 
          href="https://www.shadertoy.com/user/veggiebob/sort=newest"
          className="inline-flex items-center px-6 py-3 btn-primary font-medium rounded-md transition-colors duration-200"
          target="_blank"
          rel="noopener noreferrer"
        >
          View All Projects on Shadertoy
          <ExternalLinkIcon className="w-4 h-4 ml-2" />
        </a>
      </div>
      
      <div className="space-y-8">
        {shaders.length > 0 ? (
          shaders.map((shaderData) => (
            <ShaderTile {...shaderData} key={shaderData.key} id={shaderData.key} />
          ))
        ) : (
          <div className="flex justify-center items-center py-12">
            <LoadingSpinner />
          </div>
        )}
      </div>
    </div>
  );
};

export default shadertoy;
