import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import ShaderTile from "../components/ShaderTile";
import { fetchShadertoyData } from "../util/fetchShadertoyData";

const shadertoy = () => {
  const [shaders, setShaders] = useState([]);

  useEffect(() => {
    async function fetchShaders() {
      const data = await fetchShadertoyData();
      setShaders(data);
    }
    fetchShaders();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Shadertoy Projects</h1>
        <p className="text-lg text-gray-600 mb-6">
          A collection of my fragment shaders created with GLSL. Each shader is an interactive visual experiment.
        </p>
        <a 
          href="https://www.shadertoy.com/user/veggiebob/sort=newest"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-200"
          target="_blank"
          rel="noopener noreferrer"
        >
          View All Projects on Shadertoy
          <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
          </svg>
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
