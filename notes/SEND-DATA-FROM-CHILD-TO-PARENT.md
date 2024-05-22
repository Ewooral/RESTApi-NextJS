```js
import React, { useState } from 'react';

// Parent Component
const ParentComponent = () => {
  const [dataFromChild, setDataFromChild] = useState(null);

  const handleData = (data) => {
    setDataFromChild(data);
  }

  return (
    <div>
      <h1>Data from child: {dataFromChild}</h1>
      <ChildComponent handleData={handleData} />
    </div>
  );
}

// Child Component
const ChildComponent = ({ handleData }) => {
  const sendData = () => {
    handleData("Data from Child");
  }

  return <button onClick={sendData}>Send Data</button>
}

export default ParentComponent;
```


In this example, the ParentComponent passes a callback function (handleData) to the ChildComponent through props. The ChildComponent can then call this function to send data back to the ParentComponent.

When the button in ChildComponent is clicked, it calls sendData, which then calls the handleData function passed from the ParentComponent, sending the string "Data from Child" back to the ParentComponent. The ParentComponent then displays this data.