import React, { useState } from "react";
import { CONFIG } from "../runconfig";

const strHash = function (s) {
    var hash = 0,
      i,
      chr;
    if (s.length === 0) return hash;
    for (i = 0; i < s.length; i++) {
      chr = s.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
};
const LoginGptClient = () => {
    let [password, setPassword] = useState('');
    let [unlocked, setUnlocked] = useState(false);

    return <>
        {unlocked ? <GptClient /> : (
            <div>
                Please enter the password: 
                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <br/>
                <button
                    type="button"
                    onClick={e => {
                        if (strHash(password) === 777780726) {
                            setUnlocked(true);
                        } else {
                            setPassword('');
                            alert("Incorrect password");
                        }
                    }}
                    >Submit</button>
            </div>
        )}
    </>
}

const formatResponseText = (response) => {
    return response.split('\n').map(
        (line, i) => 
        <div 
            key={i}
            className="text-left"
            >{line}</div>
    );
}

const GptClient = () => {
    /*
    messages is 
    [
        {
            role: 'user' | 'assistant' | 'system',
            content: string
        }
    ]
    */
    let [messages, setMessages] = useState([]);
    let [input, setInput] = useState('');
    let [sending, setSending] = useState(false);

    return (
        <div>
            <div>
                {messages.map(
                    m => <div key={m.role + m.content}>
                        <strong>{m.role}:</strong><br/>
                        <div
                            className="text-left">
                            {formatResponseText(m.content)}
                        </div>
                        </div>
                )}
            </div>
            <br/>
            <textarea
                type="text"
                value={input}
                rows={9}
                placeholder="write something..."
                onChange={(e) => setInput(e.target.value)}
                className="font-mono"
            />
            <button
                type="button"
                className="bg-orange-500 text-white p-2 rounded-md"
                onClick={e => {
                    setSending(true);
                    fetch(
                        CONFIG.serverLocation + '/gpt-client',
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify([
                                ...messages,
                                {
                                    role: 'user',
                                    content: input
                                }
                            
                            ])
                        }
                    ).then(response => {
                        response.json().then(data => {
                            console.log(data)
                            setMessages(data.messages); 
                            setInput('');
                            setSending(false);
                        }).catch(e => {
                            console.log("Failed to parse json! See error below:");
                            console.log(e);
                            setSending(false);
                        })
                    }).catch(e => {
                        console.log("failed to fetch secret santa options from server");
                    })
                }}
            >{sending ? "Sending..." : "Send"}</button>
        </div>
    );
}

export default LoginGptClient;