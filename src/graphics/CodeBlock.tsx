import { useEffect, useState } from "react";

const CodeBlock = () => {
  const [animationState, setAnimationState] = useState("animate");

  useEffect(() => {
    const delay =
      (19 + 25 + 20 + 20 + 25 + 14 + 16 + 15 + 17 + 5 + 3) * 150 + 3000; // Total time in ms

    const intervalID = setInterval(() => {
      setAnimationState("fade-out");

      setTimeout(() => {
        setAnimationState("animate");
      }, 1000); // Duration of fade-out
    }, delay + 1000); // Add fade-out duration to the interval

    return () => clearInterval(intervalID); // Clean up on unmount
  }, []);

  return (
    <code
      className={`language-javascript type ${animationState}`}
      style={{
        display: "block",
        whiteSpace: "pre-wrap",
        opacity: animationState === "fade-out" ? 0 : 1,
        transition: "opacity 1s ease-in-out",
      }}
    >
      <span id="line01" className="lines">
        <span style={{ color: "rgb(121, 40, 161)" }}>const </span>
        <span>developer = {"{"}</span>
      </span>
      <span id="line02" className="lines">
        <span style={{ paddingLeft: "15px" }} />
        <span>firstName:</span>
        <span style={{ color: "rgb(0, 128, 0)" }}>"DeQuentin"</span>
        <span>,</span>
      </span>
      <span id="line03" className="lines">
        <span style={{ paddingLeft: "15px" }} />
        <span>lastName:</span>
        <span style={{ color: "rgb(0, 128, 0)" }}>"Heard"</span>
        <span>,</span>
      </span>
      <span id="line04" className="lines">
        <span style={{ paddingLeft: "15px" }} />
        <span>type:</span>
        <span style={{ color: "rgb(0, 128, 0)" }}>"Front End"</span>
        <span>,</span>
      </span>
      <span id="line05" className="lines">
        <span style={{ paddingLeft: "15px" }} />
        <span>hobby:repeat = () =&gt; {"{"}</span>
      </span>
      <span id="line06" className="lines">
        <span style={{ paddingLeft: "60px" }} />
        <span style={{ color: "var(--text-color-light)" }}>//eat();</span>
      </span>
      <span id="line07" className="lines">
        <span style={{ paddingLeft: "60px" }} />
        <span style={{ color: "var(--text-color-light)" }}>//sleep();</span>
      </span>
      <span id="line08" className="lines">
        <span style={{ paddingLeft: "60px" }} />
        <span style={{ color: "var(--text-color-light)" }}>//code();</span>
      </span>
      <span id="line09" className="lines">
        <span style={{ paddingLeft: "60px" }} />
        <span style={{ color: "var(--text-color-light)" }}>//repeat();</span>
      </span>
      <span id="line10" className="lines" style={{ paddingLeft: "15px" }}>
        {"}"}
      </span>
      <span id="line11" className="lines">
        {"};"}
      </span>
    </code>
  );
};

export default CodeBlock;
