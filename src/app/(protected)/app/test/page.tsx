"use client";

import { updateUserCredits } from "@/auth/actions/user";
import { addCreditsToUser } from "@/auth/data/user";
import { useCurrentUser } from "@/auth/hooks/use-current-user";
import React, { useEffect, useState } from "react";
import axios from "axios"; // You may need to install axios via npm or yarn
import { testUrl, verifyDomain } from "./actions";

const Page = () => {
  const user = useCurrentUser();
  console.log("user", user);

  const handleClick = async () => {
    console.log("click");
    console.log("user", user);
    if (!user?.id) {
      return;
    }

    const response = await addCreditsToUser(user?.id, 1);

    if (response?.success) {
      await updateUserCredits(response.credits);
    }

    console.log("response", response);
  };

  return (
    <div>
      <button onClick={handleClick}>click me</button>
      {user?.credits}
      <DomainChecker />
      <URLChecker />
    </div>
  );
};

export default Page;

function DomainChecker() {
  const [domain, setDomain] = useState("");
  const [result, setResult] = useState<boolean | null>(null);

  const handleCheckDomain = async () => {
    try {
      const response = await verifyDomain({ domain });
      console.log("response", response);
      if (response.exists) {
        setResult(true);
      } else {
        setResult(false);
      }
    } catch (error) {
      console.error("Error checking domain:", error);
      setResult(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
      />
      <button onClick={handleCheckDomain}>Check Domain</button>
      {result !== null && (
        <p>
          {result
            ? "Domain exists and is reachable."
            : "Domain does not exist or cannot be reached."}
        </p>
      )}
    </div>
  );
}

function URLChecker() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<boolean | null>(null);

  const handleCheckUrl = async () => {
    try {
      const response = await testUrl({ url });
      console.log("response", response);
      if (response.exists) {
        setResult(true);
      } else {
        setResult(false);
      }
    } catch (error) {
      console.error("Error checking URL:", error);
      setResult(false);
    }
  };

  return (
    <div>
      <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
      <button onClick={handleCheckUrl}>Check URL</button>
      {result !== null && (
        <p>
          {result
            ? "URL exists and is reachable."
            : "URL does not exist or cannot be reached."}
        </p>
      )}
    </div>
  );
}
