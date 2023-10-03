import { useState } from "react";

export default function Modal() {
  const [isShown, setIsShown] = useState(true);

  const handleClick = () => {
    setIsShown((current) => !current);
  };

  const loaded = () => {
    return (
      <div>
        <dialog open>
          <article>
            <header>
              <button
                aria-label="Close"
                className="close outline"
                style={{ border: "none" }}
                onClick={handleClick}
              ></button>
            </header>
            <div>Ship's Info</div>
          </article>
        </dialog>
      </div>
    );
  };

  const empty = () => {
    return <div></div>;
  };

  return isShown ? loaded() : empty();
}
