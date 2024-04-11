"use client";
import { useState, useEffect } from "react";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";

const DraggableResizableWindow: React.FC = () => {
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [bounds, setBounds] = useState({
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  });

  const toggleMinimize = () => setIsMinimized(!isMinimized);
  const toggleFullScreen = () => setIsFullScreen(!isFullScreen);

  // Effect to adjust the bounds based on the viewport size to prevent overflow
  useEffect(() => {
    const updateBounds = () => {
      const maxWidth = window.innerWidth; // Assuming 200 is the width of your component
      const maxHeight = window.innerHeight; // Assuming 200 is the height of your component
      setBounds({
        top: 0,
        left: 0,
        right: maxWidth,
        bottom: maxHeight,
      });
    };

    updateBounds();
    window.addEventListener("resize", updateBounds);

    return () => {
      window.removeEventListener("resize", updateBounds);
    };
  }, []);

  if (isMinimized) {
    return (
      <button
        onClick={toggleMinimize}
        className="p-2 bg-blue-500 text-white rounded"
      >
        Restore
      </button>
    );
  }

  return (
    <Draggable handle=".handle" bounds={bounds}>
      <ResizableBox
        width={200}
        height={200}
        minConstraints={[100, 100]}
        maxConstraints={
          isFullScreen ? [window.innerWidth, window.innerHeight] : [600, 600]
        }
        className="flex flex-col border border-black rounded overflow-hidden"
      >
        <div className="handle flex justify-between items-center p-2 bg-gray-300 cursor-move">
          <span>Drag here</span>
          <div className="flex gap-2">
            <button
              onClick={() => setIsMinimized(true)}
              className="p-1 bg-blue-500 text-white rounded"
            >
              Minimize
            </button>
            <button
              onClick={toggleFullScreen}
              className="p-1 bg-green-500 text-white rounded"
            >
              {isFullScreen ? "Normal" : "Full Screen"}
            </button>
            <button className="p-1 bg-red-500 text-white rounded">Close</button>
          </div>
        </div>
        <iframe
          className="flex h-full w-full flex-col rounded-md"
          allow="midi; microphone; camera; geolocation; encrypted-media; autoplay; clipboard-write; clipboard-read; picture-in-picture"
        />
      </ResizableBox>
    </Draggable>
  );
};

export default DraggableResizableWindow;
