// disable type check for this file
// @ts-nocheck
import React, { useState, useRef, useEffect } from "react";
import { LuMenu } from "react-icons/lu";

const PopoverComponent = ({ message }: { message: string }) => {
  const [showPopover, setShowPopover] = useState(false);
  const [disableAutoShow, setDisableAutoShow] = useState(false);
  const buttonRef = useRef(null); // Reference to the button to position the popover

  const togglePopover = () => {
    setShowPopover(!showPopover);
  };

  useEffect(() => {
    if (disableAutoShow) {
      return;
    }

    const interval = setInterval(() => {
      setShowPopover(true);

      // Hide after 2 minutes
      setTimeout(() => {
        setShowPopover(false);
      }, 120000); // 120000 ms = some seconds
    }, 60000); // 60000 ms = 1 minutes

    return () => clearInterval(interval);
  }, [disableAutoShow]);

  return (
    <>
      <div className="flex flex-col items-start mb-4 gap-2">
        <button
          className="bg-blue-400 p-2 text-white text-xs"
          ref={buttonRef}
          onClick={togglePopover}
        >
          <LuMenu className="size-5" />
        </button>

        <span>
          <input
            id="disableAutoShow"
            type="checkbox"
            checked={disableAutoShow}
            onChange={(e) => setDisableAutoShow(e.target.checked)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="disableAutoShow"
            className="ml-2 text-xs font-medium text-gray-900 dark:text-gray-300"
          >
            Don&apos;t show this again!
          </label>
        </span>
      </div>

      {showPopover && (
        <div
          style={{
            position: "absolute",
            padding: ".8rem",
            top:
              buttonRef.current?.offsetTop! + buttonRef.current?.offsetHeight!,
            left: buttonRef.current?.offsetLeft!,
            border: "1px solid #ccc",
            backgroundColor: "#fff",
            zIndex: 1000, // Ensure it's above other content
          }}
          id="my-popover"
        >
          <button
            onClick={() => setShowPopover(false)}
            style={{
              position: "absolute",
              top: 0,
              right: "6px",
              cursor: "pointer",
              display: "flex", // Use flexbox
              alignItems: "center", // Center content vertically
              justifyContent: "center", // Center content horizontally
              width: "20px", // Adjust width as needed
              height: "20px", // Adjust height as needed
              cursor: "pointer",
            }}
          >
            <span className="flex justify-center items-center text-[9px] rounded-full p-[.4rem] w-1 h-1 bg-blue-400 text-white">
              x
            </span>
          </button>
          <p>{message}</p>
        </div>
      )}
    </>
  );
};

export default PopoverComponent;

/**
 * To automatically show the popover every 5 minutes and control its
 * visibility with a radio button, you can use the useEffect hook for
 * setting up an interval and another piece of state to manage the radio
 * button's checked status. Here's how you can modify your
 * PopoverComponent to include these features, along with TailwindCSS
 * for styling the radio button:
 */
