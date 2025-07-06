import { useEffect, useRef, useState } from "react";
import "../space-traffic.css";

type ShipData = {
  id: number;
  isUfo: boolean;
  dir: "left" | "right";
  top: string; // e.g. "40vh"
  duration: number; // seconds
};

export default function SpaceTraffic() {
  const [ships, setShips] = useState<ShipData[]>([]);
  const counter = useRef(0);

  /* Spawner */
  useEffect(() => {
    const spawn = () => {
      setShips(current => {
        if (current.length >= 2) return current; // respect max 2 visible

        const id = counter.current++;
        const isUfo = Math.random() < 0.5;
        const dir: ShipData["dir"] = Math.random() < 0.5 ? "right" : "left";
        const top = `${Math.floor(Math.random() * 90)}vh`;
        const duration = 15 + Math.random() * 15; // 15-30s

        const newShip: ShipData = { id, isUfo, dir, top, duration };

        // schedule removal after finished animation
        setTimeout(() => {
          setShips(s => s.filter(sh => sh.id !== id));
        }, (duration + 0.5) * 1000);

        return [...current, newShip];
      });
    };

    // initial spawn immediately
    spawn();
    // spawn every 10-20 s
    const interval = setInterval(spawn, 10000 + Math.random() * 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-traffic">
      {ships.map(({ id, isUfo, dir, top, duration }) => (
        <div
          key={id}
          className={isUfo ? "ufo" : "ship"}
          style={{
            top,
            animation: `${isUfo ? (dir === "right" ? "ufo-right" : "ufo-left") : dir === "right" ? "ship-right" : "ship-left"} ${duration}s linear`,
            transform: isUfo ? `rotate(${dir === "right" ? 90 : 180}deg)` : undefined,
          }}
        />
      ))}
    </div>
  );
}
