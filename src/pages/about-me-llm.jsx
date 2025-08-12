import React, { useEffect, useState } from "react";
import LLMCacheContent from "../components/LLMCacheContent";
import AboutMeSection from "../components/AboutMeSection";
import AboutMeSectionSkeleton from "../components/AboutMeSectionSkeleton";
import { loadMUIComponents } from "../components/LazyMUIComponents";
import { getFormControlSx, getSelectMenuProps } from "../styles/muiTheme";
import "../styles/AboutMePage.css";

const TABS = {
  Experience: "Experience",
  Languages: "Languages",
  Tools: "Tools",
  Skills: "Skills",
};

const ACRONYMS = {
  RIT: "Rochester Institute of Technology",
};

function capitalizeEveryFirstLetter(str) {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function capitalizeAcronyms(str) {
  let result = str;
  for (const [acronym, fullForm] of Object.entries(ACRONYMS)) {
    // case insensitive match
    const regex = new RegExp(`\\b${acronym}\\b`, "gi");
    // replace with uppercase acronym
    result = result.replace(regex, acronym.toUpperCase());
  }
  return result;
}

function AboutMe() {
  const [activeTab, setActiveTab] = useState(TABS.Experience);
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [customRole, setCustomRole] = useState("");
  const [isAddingCustomRole, setIsAddingCustomRole] = useState(false);
  const [sections, setSections] = useState([]);
  const [muiComponents, setMuiComponents] = useState(null);
  const [muiLoaded, setMuiLoaded] = useState(false);

  // Function to handle adding custom role
  const handleAddCustomRole = () => {
    if (customRole.trim()) {
      const newRole = customRole.trim();
      const existingRole = dropdownOptions.find(opt => 
        opt.toLowerCase() === newRole.toLowerCase() && opt !== "Custom"
      );
      
      if (existingRole) {
        // Role already exists, just select it
        setSelectedRole(existingRole);
      } else {
        // Add new role to dropdown
        setDropdownOptions(prev => [...prev.filter(opt => opt !== "Custom"), newRole, "Custom"]);
        setSelectedRole(newRole);
      }
      
      setCustomRole("");
      setIsAddingCustomRole(false);
    }
  };

  // Function to handle key press in custom input
  const handleCustomRoleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddCustomRole();
    }
  };

  // Load MUI components on mount
  useEffect(() => {
    const loadMUI = async () => {
      try {
        const components = await loadMUIComponents();
        setMuiComponents(components);
        setMuiLoaded(true);
      } catch (error) {
        console.error("Failed to load MUI:", error);
        setMuiLoaded(true); // Still set to true to show fallback
      }
    };
    loadMUI();
  }, []);

  useEffect(() => {
    fetch("https://api.veggiebob.com/get-roles")
      .then((res) => res.json())
      .then((data) => {
        if (!data || !data.body || !Array.isArray(data.body)) {
          console.error("Invalid roles data format:", data);
          return;
        }
        setDropdownOptions([...data.body, "Custom"] || []);
        if (data.body && data.body.length > 0) {
          setSelectedRole(data.body[0]);
        }
      })
      .catch(() => setDropdownOptions([]));
  }, []);

  useEffect(() => {
    function setTabContent(listPrompt, contentPromptTemplate) {
      fetch("https://api.veggiebob.com/llm-cache", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cache_key: `veggiebob.com/${activeTab.toLowerCase()}/sections`,
          prompt: listPrompt + "\nLimit it to just 2-4 lines.",
          use_personal_info: true,
          direct: true,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setSections(
            data.body.split(/\n/).map((section, index) => (
              <AboutMeSection
                key={index}
                sidebarText={capitalizeEveryFirstLetter(
                  capitalizeAcronyms(section)
                )}
              >
                <LLMCacheContent
                  cache_key={`veggiebob.com/${activeTab.toLowerCase()}/section/${section}?role=${selectedRole}`}
                  prompt={contentPromptTemplate(section) + "\nYou may use bold (**) occasionally to highlight specific key terms and metrics. Minimize fluff, and keep it light and short."}
                  use_personal_info={true}
                  direct={false}
                  backoff={1000 * index} // stagger requests
                />
              </AboutMeSection>
            ))
          );
        })
        .catch(() => setSections([]));
    }
    if (selectedRole.length > 0 && selectedRole !== "Custom") {
      setSections([]);
      
      switch (activeTab) {
        case TABS.Experience:
          setTabContent(
            `List the companies or projects you have worked at, in all lower case, separated by new lines. For example: company-a\ncompany-b\nproject-x\n`,
            (section) =>
              `Briefly tell me about your experience at ${section}, considering that I am a ${selectedRole}.`
          );
          break;
        case TABS.Languages:
          setTabContent(
            `List the programming languages you know in all lower case, separated by new lines. For example: javascript\ntypescript\npython\n`,
            (section) =>
              `Briefly tell me about your experience with ${section}, considering that I am a ${selectedRole}.`
          );
          break;
        case TABS.Tools:
          setTabContent(
            `List the tools you use in all lower case, separated by new lines. For example: git\nvscode\npostman\n`,
            (section) =>
              `Briefly tell me about your experience with ${section}, considering that I am a ${selectedRole}.`
          );
          break;
        case TABS.Skills:
          setTabContent(
            `List the skills you have in all lower case, separated by new lines. For example: problem-solving\ncommunication\nteamwork\n`,
            (section) =>
              `Briefly tell me about your skills in ${section}, considering that I am a ${selectedRole}.`
          );
          break;
      }
    }
  }, [activeTab, selectedRole]);

  return (
    <div>
      <h1>About Me</h1>
      <div className="mb-4">
        <div className="flex items-center gap-2 flex-wrap">
          <label className="text-content-primary">
            I am a/an
          </label>
          {muiLoaded && muiComponents ? (
            <>
              <muiComponents.FormControl
                variant="outlined"
                size="small"
                sx={getFormControlSx({ maxWidth: '200px' })}
              >
                <muiComponents.InputLabel>Role</muiComponents.InputLabel>
                <muiComponents.Select
                  value={selectedRole}
                  label="Role"
                  onChange={(e) => {
                    setSelectedRole(e.target.value);
                    if (e.target.value === "Custom") {
                      setIsAddingCustomRole(true);
                    } else {
                      setCustomRole("");
                      setIsAddingCustomRole(false);
                    }
                  }}
                  MenuProps={getSelectMenuProps()}
                >
                  {dropdownOptions.map((option) => (
                    <muiComponents.MenuItem key={option} value={option}>
                      {option}
                    </muiComponents.MenuItem>
                  ))}
                </muiComponents.Select>
              </muiComponents.FormControl>
              {isAddingCustomRole && (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={customRole}
                    onChange={(e) => setCustomRole(e.target.value)}
                    onKeyPress={handleCustomRoleKeyPress}
                    placeholder="Enter your role"
                    className="bg-bg-secondary text-content-primary border border-border-medium p-2 rounded-md"
                    style={{ height: '40px', fontSize: '14px', minWidth: '150px' }}
                  />
                  <button
                    onClick={handleAddCustomRole}
                    disabled={!customRole.trim()}
                    className="bg-primary text-white px-3 py-2 rounded-md hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ height: '40px', fontSize: '14px' }}
                  >
                    Add
                  </button>
                  <button
                    onClick={() => {
                      setIsAddingCustomRole(false);
                      setCustomRole("");
                      setSelectedRole(dropdownOptions.find(opt => opt !== "Custom") || "");
                    }}
                    className="bg-bg-tertiary text-content-primary px-3 py-2 rounded-md hover:bg-border-medium border border-border-medium"
                    style={{ height: '40px', fontSize: '14px' }}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <select
                id="dynamic-dropdown"
                value={selectedRole}
                onChange={(e) => {
                  setSelectedRole(e.target.value);
                  if (e.target.value === "Custom") {
                    setIsAddingCustomRole(true);
                  } else {
                    setCustomRole("");
                    setIsAddingCustomRole(false);
                  }
                }}
                className="bg-bg-secondary text-content-primary border-medium p-2 rounded-md max-w-xs"
              >
                {dropdownOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {isAddingCustomRole && (
                <div className="flex items-center gap-2 ml-2">
                  <input
                    type="text"
                    value={customRole}
                    onChange={(e) => setCustomRole(e.target.value)}
                    onKeyPress={handleCustomRoleKeyPress}
                    placeholder="Enter your role"
                    className="bg-bg-secondary text-content-primary border border-border-medium p-2 rounded-md"
                  />
                  <button
                    onClick={handleAddCustomRole}
                    disabled={!customRole.trim()}
                    className="bg-primary text-white px-3 py-2 rounded-md hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => {
                      setIsAddingCustomRole(false);
                      setCustomRole("");
                      setSelectedRole(dropdownOptions.find(opt => opt !== "Custom") || "");
                    }}
                    className="bg-bg-tertiary text-content-primary px-3 py-2 rounded-md hover:bg-border-medium border border-border-medium"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <div className="about-me-tabs">
        {Object.keys(TABS).map((tab_key) => {
          let tab_name = TABS[tab_key];
          return (
            <button
              key={tab_name}
              onClick={() => setActiveTab(tab_name)}
              className={`about-me-tab-button ${activeTab === tab_name ? 'active' : ''}`}
            >
              {tab_name}
            </button>
          );
        })}
      </div>
      <div>
        {sections.length === 0 ? (
          <div className="space-y-6">
            {muiLoaded && muiComponents ? (
              // MUI Skeleton placeholders that match AboutMeSection layout
              Array.from({ length: 5 }).map((_, index) => (
                <AboutMeSectionSkeleton 
                  key={index} 
                  muiComponents={muiComponents} 
                />
              ))
            ) : (
              // Fallback loading spinner
              <div className="about-me-loading">
                <div className="about-me-loading-spinner"></div>
                <span className="about-me-loading-text">
                  Loading sections...
                </span>
              </div>
            )}
          </div>
        ) : (
          sections
        )}
      </div>
    </div>
  );
}

export default AboutMe;
