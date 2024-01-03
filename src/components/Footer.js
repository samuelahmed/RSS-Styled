import { useEffect, useState } from "react";
import { getCurrentTime } from "../utils";

export default function Header() {
  
  const [time, setTime] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getCurrentTime());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="border-t-2 fixed bottom-0 w-full z-50 bg-background text-center">
      <div>{time ? time : "welcome"}</div>
    </footer>
  );
}
