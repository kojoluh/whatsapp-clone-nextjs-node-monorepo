import React, { useRef, useEffect } from "react";

function ContextMenu({ options, cordinates, contextMenu, setContextMenu }) {
  const contextMenuRef = useRef(null);
  const handleClick = (e, callback) => {
    e.stopPropagation();
    setContextMenu(false);
    callback();
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (event.target.id !== 'context-opener') {
        if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)) {
          setContextMenu(false);
        }
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, []);

  return (
    <div
      style={{
        top: cordinates.y,
        left: cordinates.x
      }}
      ref={contextMenuRef}
      className={`bg-dropdown-background fixed py-2 z-[100] shadow-xl`}
    >
      <ul>
        {
          options.map(({ name, callback }) => (
            <li
              className="px-5 py-2 cursor-pointer hover:bg-background-default"
              key={name}
              onClick={(e) => handleClick(e, callback)}>
                <span className="text-white">{name}</span>
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default ContextMenu;
