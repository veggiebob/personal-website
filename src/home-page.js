import React from 'react';
import ReactDOM from 'react-dom';
import { Link, NavLink } from 'react-router-dom';

class ProjectTile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            alt: this.props.alt,
            src: this.props.src,
            link: this.props.link
        }
    }
    render() {
        return (
            <div className="img-link-wrapper">
                <Link
                    className="img-link"
                    to={this.state.link}
                    >
                    <img
                        className="subpage-tile"
                        id="hi"
                        src={this.state.src}
                        alt={this.state.alt}
                    />
                </Link>
            </div>
        )
    }
}

function Projects(props) {
    return (
        <div>
            <ProjectTile src="assets/gym-preview.png" alt="gym data" link="gym" />
            <ProjectTile src="assets/terminal-template.png" alt="terminal image" link="parse-demo" />
            <ProjectTile src="https://www.shadertoy.com/img/logo.png" alt="shadertoy logo" link="shadertoy" />
        </div>
    )
}

const MainPage = props => (
    <div>
        <h1>Hello World!</h1>
        <h2>🚧🚧 This is my website under construction 🚧🚧</h2>
        <p>
            The source for this webserver is available at 🦀 <a href="https://github.com/veggiebob/personal-webserver">my github</a> 🚀
            <br/>

            <br/>
            You can also find the website itself at <a href="https://github.com/veggiebob/hosted-website">my github.</a>
        </p>
        <Projects />
    </div>
);

export default MainPage;