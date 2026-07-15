import { useEffect, useState } from "react";

export const ServerStatus = () => {
  const [status, setStatus] = useState("");
  useEffect(() => {
    fetch("/api/health")
      .then((res) => res.json())
      .then((res) => setStatus(res));
  }, []);
  return (
    <div>
      <h1>
        Server Status is <strong>{status}</strong>
      </h1>
    </div>
  );
};
