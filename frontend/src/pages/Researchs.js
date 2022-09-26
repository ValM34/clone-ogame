import { useState } from 'react';
import VignettesResearchs from '../components/VignettesResearchs';

function Researchs() {

  const [researchsData, setResearchsData] = useState(null);

  let url = document.location.href.replace("http://localhost:3000/", "");
  let urlObj = { url: url };
  let userData = JSON.parse(localStorage.getItem("userData"));

  fetch('http://localhost:3001/researchs/displayresearchs', {
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
      if (researchsData === null) {
        setResearchsData(response);
      }
    })

  return (
    <ol>
      {researchsData !== null && researchsData.research.map((data) => {
        return <VignettesResearchs data={data} key={data[1][0].id} />
      })}
    </ol>
  );
}

export default Researchs;