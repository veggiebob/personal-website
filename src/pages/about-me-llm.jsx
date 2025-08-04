import React, { useEffect, useState } from "react";
import LLMCacheContent from "../components/LLMCacheContent";
import AboutMeSection from "../components/AboutMeSection";

const TABS = {
  Experience: "Experience",
  Languages: "Languages",
  Tools: "Tools",
  Skills: "Skills",
};

const ACRONYMS = {
  "RIT": "Rochester Institute of Technology",
}

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
    const regex = new RegExp(`\\b${acronym}\\b`, 'gi');
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

  useEffect(() => {
    fetch("https://api.veggiebob.com/get-roles")
      .then((res) => res.json())
      .then((data) => {
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
            cache_key: `${activeTab.toLowerCase()}/sections`,
            prompt: listPrompt + '\nLimit it to just 3-5 answers.',
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
                  sidebarText={capitalizeEveryFirstLetter(capitalizeAcronyms(section))}
                >
                  <LLMCacheContent
                    cache_key={`veggiebob.com/${activeTab.toLowerCase()}/section/${section}?role=${selectedRole}`}
                    prompt={contentPromptTemplate(section)}
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
              (section) => `Briefly tell me about your experience at ${section}, considering that I am a ${selectedRole}.`
            )
          break;
        case TABS.Languages:
          setTabContent(
            `List the programming languages you know in all lower case, separated by new lines. For example: javascript\ntypescript\npython\n`,
            (section) => `Briefly tell me about your experience with ${section}, considering that I am a ${selectedRole}.`
          );
          break;
        case TABS.Tools:
          setTabContent(
            `List the tools you use in all lower case, separated by new lines. For example: git\nvscode\npostman\n`,
            (section) => `Briefly tell me about your experience with ${section}, considering that I am a ${selectedRole}.`
          );
          break;
        case TABS.Skills:
          setTabContent(
            `List the skills you have in all lower case, separated by new lines. For example: problem-solving\ncommunication\nteamwork\n`,
            (section) => `Briefly tell me about your skills in ${section}, considering that I am a ${selectedRole}.`
          );
          break;
      } 
    }
  }, [activeTab, selectedRole]);

  return (
    <div>
      <h1>About Me</h1>
      <LLMCacheContent
        cache_key="about_me"
        prompt="Tell me about yourself in 1, brief sentence."
        use_personal_info={true}
        direct={false}
      />
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="dynamic-dropdown" style={{ marginRight: "0.5rem" }}>
          I am (a/an)...
        </label>
        <select
          id="dynamic-dropdown"
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
        >
          {dropdownOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div style={{ display: "flex", gap: "1rem" }}>
        {Object.keys(TABS).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "0.5rem 1rem",
              borderBottom: activeTab === tab ? "2px solid #007acc" : "none",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontWeight: activeTab === tab ? "bold" : "normal",
            }}
          >
            {tab}
          </button>
        ))}
      </div>
      <div>
        {sections.length === 0 ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="ml-3 text-content-secondary">Loading sections...</span>
          </div>
        ) : (
          sections
        )}
      </div>
    </div>
  );
}

export default AboutMe;
