import { format } from 'date-fns';
import { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';

export function getFormattedDateTime__util() {
  const now = new Date();
  
  const time = format(now, 'HH:mm:ss');
  const date = format(now, 'dd/MM/yyyy');
  const day = format(now, 'EEEE');
  const year = format(now, 'yyyy');
  
  return `Current Time: ${time}, Date: ${date}, Day: ${day}, Year: ${year}`;
}

console.log(getFormattedDateTime__util());



export const useTimeAgo__util = (startDate: Date) => {
  const [timeAgo, setTimeAgo] = useState<string>('a moment ago');

  useEffect(() => {
    const updateMessage = () => {
      const formattedDistance = formatDistanceToNow(startDate, { addSuffix: true });
      setTimeAgo(formattedDistance);
    };

    // Immediately update once
    updateMessage();

    // Then update every minute
    const intervalId = setInterval(updateMessage, 60000);

    // Cleanup on component unmount
    return () => clearInterval(intervalId);
  }, [startDate]);

  return timeAgo;
};