import React, { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import NewLoan from "./pages/NewLoan";

export default function App() {
  const [route, setRoute] = useState(window.location.pathname);

  useEffect(() => {
    const onPop = () => setRoute(window.location.pathname);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  if (route === "/loan" || route === "/loan/") {
    return <NewLoan />;
  }

  return <Dashboard />;
}
