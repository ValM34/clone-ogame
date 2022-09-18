// import image from '../images/Metal.webp';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { useRef, useEffect, useState } from 'react';

function Vignettes({ item }) {

  const refUpgrade = useRef(null);
  const refDowngrade = useRef(null);
  const [state, setState] = useState(null);
  const [state2, setState2] = useState(null);

  console.log(item[0].price_multiplier)
  console.log(item[0].id)
  let metalPrice = parseInt(item[0].metal_price * Math.pow((item[0].price_multiplier / 100), (item[1][0].level - 1)))
  let crystalPrice = parseInt(item[0].crystal_price * Math.pow((item[0].price_multiplier / 100), (item[1][0].level - 1)))
  let deuteriumPrice = parseInt(item[0].deuterium_price * Math.pow((item[0].price_multiplier / 100), (item[1][0].level - 1)))

  function upgrade() {
    let userData = JSON.parse(localStorage.getItem("userData"));
    fetch('http://localhost:3001/buildings/upgrade', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': userData[0].token
      },
      body: JSON.stringify(state)
    })
  }
  function downgrade() {
    let userData = JSON.parse(localStorage.getItem("userData"));
    fetch('http://localhost:3001/buildings/downgrade', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': userData[0].token
      },
      body: JSON.stringify(state)
    })
  }
  useEffect(() => {
    if (state === null) {
      setState({ idBuilding: refUpgrade.current.attributes[0].value })
    }
    if (state2 === null) {
      setState2({ idBuilding: refDowngrade.current.attributes[0].value })
    }

  }, [state])
  console.log(item)
  return (
    <li>
      <div className="item-img" style={{ backgroundImage: 'url(' + item[0].img_src + ')' }}></div>
      <div>
        <p className="building-name">{item[0].name}</p>
        <div className="flex-li-infos">
          <p className="buildingDescription">
            {item[0].description}
          </p>
          <div className="buildingInfos">
            <div className="upgrade-info">Nécessaire pour le niveau 2 :</div>
            <span className="upgrade-price">{metalPrice} métal, </span>
            <span className="upgrade-price">{crystalPrice} cristal, </span>
            <span className="upgrade-price">{deuteriumPrice} deutérium</span>
            <div className="btn-vignettes-container">
              <button ref={refUpgrade} onClick={upgrade} id={item[0].id} className="action-upgrade">Améliorer <FontAwesomeIcon className="faArrowUp" icon={faArrowUp} /></button>
              <button ref={refDowngrade} onClick={downgrade} id={item[0].id} className="action-downgrade">Démolire <FontAwesomeIcon className="faArrowDown" icon={faArrowDown} /></button>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export default Vignettes;