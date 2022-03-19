import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import ShaderTile from "../components/ShaderTile";
import { fetchShadertoyData } from "../util/fetchShadertoyData";

// function ShaderPreview(props) {
//   const url = "https://www.shadertoy.com/view/" + props.shader_key;
//   return (
//     <tr key={props.shader_key + props.views}>
//       <td>
//         <a href={url}>
//           <img className="shadertoy-preview" src={props.preview} />
//         </a>
//       </td>
//       <td style={{ paddingLeft: 20 }}>
//         <p>
//           <a href={url}>{props.name}</a>
//           <br />
//           <br />
//           <span style={{ color: "white" }}>{props.views} 👁️</span>
//           &nbsp;<span style={{ color: "red" }}>{props.likes} ❤️</span>
//           &nbsp;
//           <br />
//           <span title={props.description} style={{ marginRight: 10 }}>
//             {props.description}
//           </span>
//         </p>
//       </td>
//     </tr>
//   );
// }

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
        ⚠️{" "}
        <span>
          Since the Shadertoy API hasn't been doing to hot lately,
          <br />I recommend you just go directly to my{" "}
        </span>{" "}
        <a href="https://www.shadertoy.com/user/veggiebob/sort=newest">
          profile
        </a>
        <br />
        <br />
        All Projects{" "}
        <a href="https://www.shadertoy.com/user/veggiebob/sort=newest">here</a>
      </p>
      <div id="shadertoy-loads">
        {shaders.length > 0 ? (
          shaders.map((shaderData) => (
            <ShaderTile {...shaderData} key={shaderData.key} />
          ))
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </div>
  );
};

export default shadertoy;
