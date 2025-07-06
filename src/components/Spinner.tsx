
export default function Spinner() {
  return (
    <div className="spinner">
      <div className="solar-system">
        <div className="sun" />

        <div className="orbit orbit-1">
          <div className="planet planet-1" />
        </div>
        <div className="orbit orbit-2">
          <div className="planet planet-2" />
        </div>
        <div className="orbit orbit-3">
          <div className="planet planet-3" />
        </div>
      </div>
    </div>
  );
}