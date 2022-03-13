//Get query slug without using SSR

import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const Test = () => {
  const [q, setQ] = useState(null);
  const { query } = useRouter();

  useEffect(() => {
    setQ(query);
  }, []);
  return <div>Test</div>;
};

export default Test;
