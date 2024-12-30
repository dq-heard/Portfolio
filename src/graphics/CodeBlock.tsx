import { useEffect, useState } from "react";

const CodeBlock = () => {
  const [animationState, setAnimationState] = useState("animate");

  useEffect(() => {
    const delay =
      (18 + 26 + 21 + 20 + 24 + 15 + 18 + 17 + 18 + 5 + 3) * 150 + 3000; // Total time in ms

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
      <span className="line01">
        <span style={{ color: "rgb(121, 40, 161)" }}>const </span>
        <span>developer = {"{"}</span>
      </span>
      <span className="line02">
        <span style={{ paddingLeft: "15px" }} />
        <span>firstName:</span>
        <span style={{ color: "rgb(0, 128, 0)" }}>"DeQuentin"</span>
        <span>,</span>
      </span>
      <span className="line03">
        <span style={{ paddingLeft: "15px" }} />
        <span>lastName:</span>
        <span style={{ color: "rgb(0, 128, 0)" }}>"Heard"</span>
        <span>,</span>
      </span>
      <span className="line04">
        <span style={{ paddingLeft: "15px" }} />
        <span>type:</span>
        <span style={{ color: "rgb(0, 128, 0)" }}>"Front End"</span>
        <span>,</span>
      </span>
      <span className="line05">
        <span style={{ paddingLeft: "15px" }} />
        <span>hobby:repeat = () =&gt; {"{"}</span>
      </span>
      <span className="line06">
        <span style={{ paddingLeft: "60px" }} />
        <span style={{ color: "var(--text-color-light)" }}>//eat();</span>
      </span>
      <span className="line07">
        <span style={{ paddingLeft: "60px" }} />
        <span style={{ color: "var(--text-color-light)" }}>//sleep();</span>
      </span>
      <span className="line08">
        <span style={{ paddingLeft: "60px" }} />
        <span style={{ color: "var(--text-color-light)" }}>//code();</span>
      </span>
      <span className="line09">
        <span style={{ paddingLeft: "60px" }} />
        <span style={{ color: "var(--text-color-light)" }}>//repeat();</span>
      </span>
      <span className="line10" style={{ paddingLeft: "15px" }}>
        {"}"}
      </span>
      <span className="line11">{"};"}</span>
    </code>
  );
};

export default CodeBlock;
