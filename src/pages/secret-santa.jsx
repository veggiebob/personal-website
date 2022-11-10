import React, { useState } from "react";
import { CONFIG } from "../runconfig";

const SecretSanta = () => {
    let [selected, setSelected] = useState(false);
    let [name, setName] = useState("awaiting response...");
    let [options, setOptions] = useState(null);
    let [err, setErrorMessage] = useState("");
    if (options === null) { 
        fetch(
            CONFIG.serverLocation + '/secret-santa/options',
            {
                headers: {
                    'Access-Control-Allow-Headers': '*'
                }
            }
        ).then(response => {
            response.json().then(data => {
                setOptions(data)
            }).catch(e => {
                console.log("Failed to parse json! See error below:");
                console.log(e);
                setErrorMessage('Bad formatting of JSON')
            })
        }).catch(e => {
            console.log("failed to fetch secret santa options from server");
            setOptions([])
            setErrorMessage('Could not fetch options')
        })
    }
    const getName = name => {
        setSelected(true);
        fetch(
            CONFIG.serverLocation + '/secret-santa/giftee/' + name,
            {
                headers: {
                    'Access-Control-Allow-Headers': '*'
                }
            }
        ).then(response => {
            response.text().then(text => {
                setName(text);
            }).catch(e => {
                setErrorMessage("Unable to read text from response");
            })
        }).catch(e => {
            console.log("Could not fetch result from server");
            setErrorMessage('Could not fetch secret santa result')
        })
    }
    let optionsButtons = options === null || options.length === 0 ? 
        <span>no options</span> : 
        <div>
            {options.map(
                n => <div key={n}>
                        <button
                            className="p-1 m-8 w-full border-solid border-2 border-slate-250 rounded-md bg-orange-500 text-white" 
                            type="button" 
                            onClick={e => getName(n)}>{n}</button>
                    </div>)}
        </div>
    return <div>
        {selected ? <span>{name}</span> : optionsButtons}
                <br />
                <span className="text-red-600">{err}</span>
    </div>
}

export default SecretSanta;