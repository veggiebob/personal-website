
/// Candy bracket colors
const BRACKET_COLORS = [
    "text-primary",
    "text-secondary", 
    "text-accent",
]

const Bracket = (props) => {
    const { color, children } = props;
    return <span className={"font-bold " + BRACKET_COLORS[color % BRACKET_COLORS.length]}>{children}</span>
}

const getOrDefault = (obj, key, defaultValue) => {
    if (obj.hasOwnProperty(key)) {
        return obj[key]
    }
    return defaultValue
}

const repeat = n => e => {
    let x = [];
    for (let i = 0; i < n; i++) {
        x.push(e);
    }
    return x;
}

/// Append 4 spaces
const Indents = (props) => <>{repeat(props.num)(<>&emsp;</>)}</>;

/// Funny green string
const JsonString = (props) => {
    // severe cope for not wanting to deal with quotes properly
    return <span className="json-string">
        {'"' + props.content.replaceAll(/\"/g, "\\\"") + '"'}
    </span>
}

/// Blue number
const JsonNumber = (props) => {
    return <span className="font-bold json-number">
        {props.content}
    </span>
}

/// left right pair (key: value)
const JsonField = (props) => {
    const {left, right, indent, color} = props;
    return <span className="json-key">
        <Indents num={indent} />
        <span className="font-bold json-key">{left}</span>: <JsonToHTML json={right} indent={indent + 1} color={color} />
    </span>
}

/// Show an array of elements
const JsonArray = (props) => {
    const {array, indent, color} = props;
    return <span>
        <Bracket color={color}>[</Bracket>
        <br/>
        {
            array.map((item, index) => 
                <span key={index} className="json-key">
                    <Indents num={indent + 1} />
                    <JsonToHTML json={item} indent={indent + 1} key={index} color={color + 1} />
                    {index < array.length - 1 ? ',' : ''}
                    <br />
                </span>
            )
        }
        <Indents num={indent} />
        <Bracket color={color}>]</Bracket>
    </span>
}

const JsonObject = (props) => {
    const {json, indent, color} = props;
    let keys = Object.keys(json);
    return <span>
        <Bracket color={color}>{"{"}</Bracket>
        <br/>
        {
            keys.map((key, index) =>
                <span key={key}>
                    <JsonField left={key} right={json[key]} indent={indent + 1} color={color + 1} />
                    {index < keys.length - 1 ? ',' : ''}
                    <br/>
                </span>
            )
        }
        <Indents num={indent} />
        <Bracket color={color}>{"}"}</Bracket>
    </span>
}

// 0 step
const JsonToHTML = (props) => {
    const { json } = props;
    let indent = getOrDefault(props, "indent", 0);
    let color = getOrDefault(props, "color", 0);
    if (typeof json === 'string') {
        return <JsonString content={json} />
    } else if (typeof json === 'number') {
        return <JsonNumber content={json} />
    } else if (Array.isArray(props.json)) {
        return <JsonArray array={json} indent={indent} color={color} />
    } else if (json instanceof Object) {
        return <JsonObject json={json} indent={indent} color={color} />
    } else {
        return <p>errorr rrerorerererer</p> 
    }
}

export default JsonToHTML;