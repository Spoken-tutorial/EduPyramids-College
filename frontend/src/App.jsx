import { useEffect, useState } from "react";
import api from "./lib/api";

export default function App() {
  const [status, setStatus] = useState("loading...");

  useEffect(() => {
    api.get("/health/").then(
      (res) => setStatus(res.data.status),
      () => setStatus("error")
    );
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h1>Edupyramids College</h1>
      <p>Backend health: {status}</p>
    </div>
  );
}
