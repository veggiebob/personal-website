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
  const [sections, setSections] = useState([]);
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
        setDropdownOptions(data.body || []);
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
    if (selectedRole.length > 0) {
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
        <div className="flex items-center gap-2">
          <label className="text-content-primary">
            I am a/an
          </label>
          {muiLoaded && muiComponents ? (
            <muiComponents.FormControl
              variant="outlined"
              size="small"
              sx={getFormControlSx({ maxWidth: '200px' })}
            >
            <muiComponents.InputLabel>Role</muiComponents.InputLabel>
            <muiComponents.Select
              value={selectedRole}
              label="Role"
              onChange={(e) => setSelectedRole(e.target.value)}
              MenuProps={getSelectMenuProps()}
            >
              {dropdownOptions.map((option) => (
                <muiComponents.MenuItem key={option} value={option}>
                  {option}
                </muiComponents.MenuItem>
              ))}
            </muiComponents.Select>
          </muiComponents.FormControl>
        ) : (
          <select
            id="dynamic-dropdown"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="bg-bg-secondary text-content-primary border-medium p-2 rounded-md max-w-xs"
          >
            {dropdownOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
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
