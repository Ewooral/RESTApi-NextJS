import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

const EwooralCustomOverlay = () => {
  useEffect(() => {
    // Create a div to hold the overlay
    const overlayRoot = document.createElement('div');
    overlayRoot.setAttribute('id', 'ewooral-overlay-root');
    document.body.appendChild(overlayRoot);

    // Cleanup function to remove the div when the component unmounts
    return () => {
      document.body.removeChild(overlayRoot);
    };
  }, []);

  return ReactDOM.createPortal(
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 1000, // Ensure it covers other elements
    }}></div>,
    document.getElementById('ewooral-overlay-root')!
  );
};

export default EwooralCustomOverlay;