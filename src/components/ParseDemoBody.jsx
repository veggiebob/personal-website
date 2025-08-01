import { useState, useEffect } from "react";
import JsonToHTML from "../util/jsonToPrettyHTML";
import { translateInput } from "../util/parseInput";
import { loadMUIComponents } from "./LazyMUIComponents";

const ParseOutput = (props) => {
  return <div
      className="text-content-primary"
      style={{
        background: 'transparent',
      }}
      dangerouslySetInnerHTML={{ __html: props.parsed }}
    />
};

const DEFAULT_OUTPUT = `Act I: Scene I.

[Enter ROMEO and JULIET]

ROMEO:
Wherefore art thou, input? Dost thou await my command?
JULIET:
Ay, verily. Thy bidding shall be fulfilled with but a touch.

[Exeunt]`

const ParseDemoBody = () => {
  const [timer, setTimer] = useState();
  const [input, setInput] = useState(".[.,]");
  const [parsed, setParsed] = useState(DEFAULT_OUTPUT.replace(/\n/g, "<br/>")); 
  const [mode, setMode] = useState("default"); // or "ai"
  const [muiComponents, setMuiComponents] = useState(null);
  const [muiLoaded, setMuiLoaded] = useState(false);

  // Load MUI components on mount
  useEffect(() => {
    const loadMUI = async () => {
      try {
        const components = await loadMUIComponents();
        setMuiComponents(components);
        setMuiLoaded(true);
      } catch (error) {
        console.error('Failed to load MUI:', error);
        setMuiLoaded(true); // Still set to true to show fallback
      }
    };
    loadMUI();
  }, []);

  /**
   * Begin a 2 sec timeout, after which the current form data will be parsed and shown
   */
  const onSubmit = () => {
    clearTimeout(timer);
    setTimer(
      setTimeout(async () => {
        setParsed("Loading...");
        setParsed(await translateInput(input, mode));
      }, 0)
    );
  };

  return (
    <div className="flex rounded-lg border-2 bg-bg-secondary border-primary max-w-5xl w-full">
      <form
        className="flex flex-col w-[30%] p-8 gap-y-4 rounded-l-lg"
        // onKeyUp={onSubmit}
      >
        <div>
          Convert <a href='https://esolangs.org/wiki/Brainfuck'>brainf*ck
          </a> to <a href='https://esolangs.org/wiki/Shakespeare'>Shakespeare Programming Language</a>
          <div className="code-block"></div>
        </div>
        <label htmlFor="parse-input">
          Input
          <textarea
            id="parse-input"
            rows={9}
            type="text"
            placeholder="ex. reverse string >[>,]<[.<]"
            onChange={(e) => setInput(e.target.value)}
            className="font-mono"
          ></textarea>
          
          {muiLoaded && muiComponents ? (
            <muiComponents.FormControl 
              fullWidth 
              variant="outlined" 
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'var(--color-bg-muted)',
                  color: 'var(--color-text-primary)',
                  '& fieldset': {
                    borderColor: 'var(--color-border-medium)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'var(--color-border-dark)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'var(--color-primary)',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'var(--color-text-secondary)',
                  '&.Mui-focused': {
                    color: 'var(--color-primary)',
                  },
                },
              }}
            >
              <muiComponents.InputLabel>Mode</muiComponents.InputLabel>
              <muiComponents.Select
                value={mode}
                label="Mode"
                onChange={(e) => setMode(e.target.value)}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      backgroundColor: 'var(--color-bg-muted)',
                      '& .MuiMenuItem-root': {
                        color: 'var(--color-text-primary)',
                        '&:hover': {
                          backgroundColor: 'var(--color-bg-secondary)',
                        },
                        '&.Mui-selected': {
                          backgroundColor: 'var(--color-primary)',
                          color: 'var(--color-text-inverse)',
                          '&:hover': {
                            backgroundColor: 'var(--color-primary-dark)',
                          },
                        },
                      },
                    },
                  },
                }}
              >
                <muiComponents.MenuItem value="default">Default</muiComponents.MenuItem>
                <muiComponents.MenuItem value="ai">AI</muiComponents.MenuItem>
              </muiComponents.Select>
            </muiComponents.FormControl>
          ) : (
            <select
              onChange={(e) => setMode(e.target.value)}
              value={mode}
              className="bg-bg-muted text-content-primary border-medium p-2 rounded-md"
            >
              <option value="default">Default</option>
              <option value="ai">AI</option>
            </select>
          )}
          
          <button
            type="button"
            onClick={onSubmit}
            className="btn-primary p-2 rounded-md text-sm font-medium"
          >Translate</button>
        </label>
      </form>
      <div className="text-left font-mono text-content-primary p-8 w-[70%] rounded-r-lg">
        <ParseOutput parsed={parsed} />
      </div>
    </div>
  );
};

export default ParseDemoBody;
