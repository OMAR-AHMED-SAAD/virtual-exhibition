import { useEffect, useRef } from "react";
import propTypes from "prop-types";

const Explanation = ({ explanations }) => {
  const containerRef1 = useRef(null);
  const containerRef2 = useRef(null);
  const containerRef3 = useRef(null);
  const containerRef4 = useRef(null);

  useEffect(() => {
    if (
      containerRef1.current &&
      containerRef2.current &&
      containerRef3.current &&
      containerRef4.current
    ) {
      containerRef1.current.innerHTML = explanations?.IE;
      containerRef2.current.innerHTML = explanations?.NS;
      containerRef3.current.innerHTML = explanations?.TF;
      containerRef4.current.innerHTML = explanations?.JP;

      // If the HTML contains scripts that need to be executed
      [containerRef1, containerRef2, containerRef3, containerRef4].forEach(
        (ref) => {
          const scriptTags = ref.current.querySelectorAll("script");
          scriptTags.forEach((script) => {
            const newScript = document.createElement("script");
            newScript.innerHTML = script.innerHTML;
            document.body.appendChild(newScript);
          });
        }
      );
    }
  }, [explanations]);

  return (
    <div className="ent-model-expl">
      <div ref={containerRef1}></div>
      <div ref={containerRef2}></div>
      <div ref={containerRef3}></div>
      <div ref={containerRef4}></div>
    </div>
  );
};

Explanation.propTypes = {
  explanations: propTypes.object.isRequired,
};

export default Explanation;
