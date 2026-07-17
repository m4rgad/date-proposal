import { useEffect, useState } from "react";

export default function Cursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const move = (event: MouseEvent) => setPosition({ x: event.clientX, y: event.clientY });
    const enter = () => setHover(true);
    const leave = () => setHover(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", leave);
    window.addEventListener("mouseover", enter);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", leave);
      window.removeEventListener("mouseover", enter);
    };
  }, []);

  return (
    <>
      <div className="cursor-ring" style={{ left: position.x, top: position.y, opacity: hover ? 1 : 0.4, transform: `translate(-50%, -50%) scale(${hover ? 1.2 : 1})` }} />
      <div className="cursor-dot" style={{ left: position.x, top: position.y }} />
    </>
  );
}
