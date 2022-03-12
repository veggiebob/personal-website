// import react
import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import './shadertoy.css'; 

const clipString = function (str, len) {
    return str.length>len?str.substring(0, len)+"...":str;
}

function ShaderPreview(props) {
    const url = "https://www.shadertoy.com/view/"+props.shader_key;
    return (
        <tr key={props.shader_key + props.views}>
            <td>
                <a href={url}>
                    <img className="shadertoy-preview" src={props.preview}/>
                </a>
            </td>
            <td style={{paddingLeft:20}}>
                <p>
                    <a href={url}>{props.name}</a><br/><br/>
                    <span style={{color:'white'}}>{props.views} 👁️</span>
                    &nbsp;<span style={{color:'red'}}>{props.likes} ❤️</span>
                    &nbsp;<br />
                    <span title={props.description} style={{marginRight:10}}>
                        {props.description}
                    </span>
                </p>
            </td>
        </tr>
    )
}

class SProjects extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            shaders: []
        }
    }

    addShader(props) {
        let shaders = this.state.shaders.slice();
        shaders.push(props);
        this.setState({shaders: shaders});
    }

    componentDidMount() {
        this.addShader({
            preview: 'https://www.shadertoy.com/media/shaders/WdXBWf.jpg',
            shader_key: "WdXBWf",
            views: 334,
            name: "voronoi on a sphere",
            description: "attempt to put voronoi on a sphere",
            likes: 1
        })
        this.fetch_shadertoy_data();
    }

    render() {
        return (<div>
            <h1>Shadertoy Projects</h1>
            <Link to="/">Homepage</Link>
            <br />
            <p>
                ⚠️ <span style={{color: "yellow"}}>Since the Shadertoy API hasn't been doing to hot lately,<br/>
                I recommend you just go directly to my </span> <a href="https://www.shadertoy.com/user/veggiebob/sort=newest">profile</a>
                <br />
                <br />
                All Projects <a href="https://www.shadertoy.com/user/veggiebob/sort=newest">here</a>
            </p>
            <table id="shadertoy-loads">
                {this.state.shaders.map(ShaderPreview)}
            </table>
        </div>);
    }

    fetch_shadertoy_data() {
        const SHADERTOY_APP_KEY = "NtHKMN";
        let shaderTable = document.getElementById("shadertoy-loads")
        fetch('https://www.shadertoy.com/api/v1/shaders/query/veggiebob?num=8&sort=newest&key='+SHADERTOY_APP_KEY)
            .then(data => {
                return data.json();
            })
            .then(data => {
                data = data.Results;
                if(data.length>10) {
                    data = data.slice(0, 10);
                }
                for(let pkey of data) {
                    fetch("https://www.shadertoy.com/api/v1/shaders/"+pkey+"?key="+SHADERTOY_APP_KEY)
                    .then(data => data.json())
                    .then(shader => {
                        // console.log("got a shader!");
                        let shaderThumb = "https://www.shadertoy.com/media/shaders/"+pkey+".jpg"
                        // console.log(shader)
                        // console.log(shaderThumb)
                        shader = shader.Shader;
                        this.addShader({
                            shader_key: pkey,
                            preview: shaderThumb,
                            name: shader.info.name,
                            views: shader.info.viewed,
                            likes: shader.info.likes,
                            description: clipString(shader.info.description.replace(/[\n\r]/g, "<br>"), 200)
                        });
                    })
                    .catch(reason => {
                        console.log(reason);
                    });
                }
            })
            .catch(reason => {
                console.log(reason);
            });
    }
}

export default SProjects;