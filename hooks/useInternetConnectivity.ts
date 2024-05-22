

import { useState, useEffect } from "react";

export default function useInternetConnectivity() {
  const [userIsOnline, setUserIsOnline] = useState(false);

  useEffect(() => {
    const checkInternetConnectivity = async () => {
        try {
            const response = await fetch("/api/v1/crud/others/internet-status");
            const data = await response.json();
            
            
            if (response.ok) {
                setUserIsOnline(true); // Set userIsOnline to true if the API request is successful
            } else {
                setUserIsOnline(false); // Set userIsOnline to false if there's an error in the API request
            }
        } catch (error) {
            console.error("Error checking internet connectivity:", error);
            setUserIsOnline(false); // Set userIsOnline to false if there's an error
        }
    };

    checkInternetConnectivity(); 

    // Add an interval to check internet connectivity periodically
    const interval = setInterval(checkInternetConnectivity, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return userIsOnline;
}
