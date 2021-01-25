import React, { useState, useEffect, useRef } from "react";

const CardContent = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { authorName, authorCatchPhrase, postTitle, postBody } = props;
  const [allowExpand, setAllowExpand] = useState(true);
  const ref = useRef();
  useOnClickOutside(ref, (isExpanded) => setAllowExpand(false));

  function handleClick() {
    if (allowExpand === false) {
      setAllowExpand(true);
    }
    setIsExpanded(!isExpanded);
  }
  return (
    <div onClick={(event) => handleClick()}>
      <p>
        <span className="font-weight-bold">Post's title:</span> {postTitle}
      </p>
      {isExpanded && allowExpand && (
        <div ref={ref}>
          <p>
            <span className="font-weight-bold">Author's name:</span>{" "}
            {authorName}
          </p>
          <p>
            <span className="font-weight-bold">Author's catch phrase:</span>{" "}
            {authorCatchPhrase}
          </p>
          <p>
            <span className="font-weight-bold">Post's body: </span>
            {postBody}
          </p>
          <div className="text-center">
            <button
              className="btn btn-warning shadow text-white"
              onClick={(event) => setIsExpanded(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardContent;

function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, []);
}
