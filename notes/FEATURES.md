#  THE ONLINE, OFFLINE FEATURE
    Backend API Endpoint Creation: Created a new API endpoint /api/v1/check-internet-connectivity using Next.js API routes. This endpoint checks the internet connectivity status by attempting to connect to a reliable server (in this case, google.com).

    Frontend Hook for Internet Connectivity: Created a custom React hook named useInternetConnectivity to fetch the internet connectivity status from the backend API. This hook uses useState and useEffect to manage state and perform the API request asynchronously.

    Client-Side Integration: Integrated the useInternetConnectivity hook into the AdminHeader component. This component displays the internet connectivity status ("Online" or "Offline") based on the response from the hook.

    Error Handling: Handled errors gracefully in both the hook and the API endpoint. In case of errors (e.g., network issues, API failures), appropriate error messages are logged or displayed to the user.

Overall, this feature enhances the user experience by providing real-time informati
on about internet connectivity status, allowing users to stay informed 
and take appropriate actions based on their network conditions.

    The `useRef` hook is introduced in this code to keep track of the previous value of `userIsOnline` across re-renders of the component. 

In React, the state of a component gets reset on every re-render. However, there are times when you want to preserve some value across re-renders without causing a re-render when that value changes. This is where `useRef` comes in handy.

In this specific case, `prevUserIsOnlineRef` is used to store the previous online status of the user. This is useful because it allows the component to compare the current online status (`userIsOnline`) with the previous one (`prevUserIsOnlineRef.current`). If they are different, it means the online status has changed, and the component can then perform some action based on this change (like showing a toast notification).

Here's the relevant part of the code:

```typescriptreact
useEffect(() => {
  if (prevUserIsOnlineRef.current !== userIsOnline) {
    if (userIsOnline) {
      showSuccessToast('Online', `${session.firstname} is online.`);
    } else {
      showErrorToast('Offline', `${session.firstname} is offline.`);
    }
  }
  // Update the ref to the current value
  prevUserIsOnlineRef.current = userIsOnline;
}, [userIsOnline, showSuccessToast, showErrorToast]);
```

In this `useEffect`, the current online status is compared with the previous one. If they are different, a toast notification is shown. After that, the `prevUserIsOnlineRef` is updated to the current online status, so it can be used for comparison in the next render.