import HomeUser from '../pages/HomeUser';
import LeftColumn from '../layouts/LeftColumn';
import Header from '../layouts/Header';
import { useState, useEffect } from 'react';

function Connected() {

  const [listItems, setListItems] = useState(null);
  useEffect(() => {
    let url = document.location.href.replace("http://localhost:3000/", "")
    let urlObj = { url: url }
    let userData = JSON.parse(localStorage.getItem("userData"))
    fetch('http://localhost:3001/data/displaybuildings', {
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
        if (listItems === null) {
          setListItems(response)
          console.log(response.building)
        }
      })
  }, [listItems])
  return (
    <div>
      <Header />
      <div className="container-game">
        <LeftColumn />
        {listItems !== null &&
          <HomeUser listItems={listItems} />
        }
      </div>
    </div>
  );
}

export default Connected;