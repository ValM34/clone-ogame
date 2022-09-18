import { useState, useEffect } from 'react';

function Header() {

  const [data, setData] = useState(null);

  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem("userData"))
    fetch('http://localhost:3001/data/getdata', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': userData[0].token
      }
    })
      .then((response) => response.json())
      .then((response) => {
        if (data === null) {
          setData(response);
        }

      })
  }, [data])

  return (
    <div>Métal: {data !== null && parseInt(data.totalMetal)} Cristal: {data !== null && parseInt(data.totalCrystal)} Deutérium: {data !== null && parseInt(data.totalDeuterium)}</div>
  );
}

export default Header;