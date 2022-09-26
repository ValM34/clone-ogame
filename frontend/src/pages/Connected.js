import Vignettes from '../components/Vignettes';
import { useState } from 'react';

function Connected() {

  const [buildingsData, setBuildingsData] = useState(null);

  let url = document.location.href.replace("http://localhost:3000/", "")
  let urlObj = { url: url }
  let userData = JSON.parse(localStorage.getItem("userData"))

  fetch('http://localhost:3001/buildings/displaybuildings', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': userData[0].token
    },
    body: JSON.stringify(urlObj)
  })
    .then((response) => response.json())
    .then((response) => {
      if (buildingsData === null) {
        setBuildingsData(response)
      }
    })

  return (
    <ol>
      {buildingsData !== null && buildingsData.building.map((item) => {
        return <Vignettes item={item} key={item[0].id} />
      })}
    </ol>
  );
}

export default Connected;