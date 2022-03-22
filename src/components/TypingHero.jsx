import { useState, useEffect, useRef } from "react";

const Cursor = () => {
  return <div className="w-3 h-6 bg-neutral-900" />;
};

const TypingHero = () => {
  const sections = [
    "Hello! 👋",
    "I'm Andrew.",
    "I'm an undergrad CS student at RIT, with an interest in Rust, Haskell, and JavaScript.",
  ];
  const sectionWait = [60, 60, 20];
  const cursor = "█";
  const [refs] = useState([useRef(), useRef(), useRef()]);

  useEffect(() => {
    let totalWait = 1000;
    sections.forEach((section, sectionIx) => {
      const currRef = refs[sectionIx].current;
      const prevRef = sectionIx > 0 && refs[sectionIx - 1].current;
      for (let charIx = 0; charIx < section.length; charIx++) {
        const char = section[charIx];
        setTimeout(() => {
          currRef.innerHTML = currRef.innerHTML.slice(0, -1) + char + cursor;
          if (
            prevRef &&
            prevRef.innerHTML[prevRef.innerHTML.length - 1] === cursor
          )
            prevRef.innerHTML = refs[sectionIx - 1].current.innerHTML.slice(
              0,
              -1
            );
        }, totalWait);
        totalWait += sectionWait[sectionIx];
      }
      totalWait += 250;
    });
  });

  return (
    <section
      id="hello"
      className="max-w-5xl w-full flex flex-col mb-16 font-mono min-h-screen"
    >
      <h1 className="w-full leading-none font-thin flex flex-col text-left text-4xl">
        <span ref={refs[0]} className="w-full">
          {cursor}
        </span>
        <br />
        <span ref={refs[1]} className="w-full" />
        <br />
        <span ref={refs[2]} className="w-full" />
      </h1>
      <h2 className="w-full text-left"></h2>
    </section>
  );
};

export default TypingHero;
