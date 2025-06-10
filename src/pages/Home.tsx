import { useState } from "react";

const About = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <button onClick={() => setCount((count) => count + 1)}>
        Click me count is {count}
      </button>
    </>
  );
};

export default About;
