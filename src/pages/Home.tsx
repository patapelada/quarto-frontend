import { Button } from "@/components/ui/button";
import { useState } from "react";

const About = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <Button onClick={() => setCount((count) => count + 1)}>
        Click me count is {count}
      </Button>
    </>
  );
};

export default About;
