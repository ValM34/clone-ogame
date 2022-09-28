// import image from '../images/Metal.webp';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { useRef, useEffect, useState } from 'react';

function Vignettes({ item }) {

  const refUpgrade = useRef(null);
  const refDowngrade = useRef(null);
  const [idBuildingUp, setIdBuildingUp] = useState(null);
  const [idBuildingDown, setIdBuildingDown] = useState(null);
  const [mineLevel, setMineLevel] = useState(null);
  const [metalPrice, setMetalPrice] = useState(null);
  const [crystalPrice, setCrystalPrice] = useState(null);
  const [deuteriumPrice, setDeuteriumPrice] = useState(null);

  function upgrade() {
    let userData = JSON.parse(localStorage.getItem("userData"));
    fetch('http://localhost:3001/buildings/upgrade', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': userData[0].token
      },
      body: JSON.stringify(idBuildingUp)
    })
      .then((response) => response.json())
      .then((response) => {
        setMineLevel(response.newLevel);
        setMetalPrice(parseInt(response.metalPrice * Math.pow((response.priceMultiplier / 100), (response.newLevel))));
        setCrystalPrice(parseInt(response.crystalPrice * Math.pow((response.priceMultiplier / 100), (response.newLevel))));
        setDeuteriumPrice(parseInt(response.deuteriumPrice * Math.pow((response.priceMultiplier / 100), (response.newLevel))));
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
      body: JSON.stringify(idBuildingDown)
    })
      .then((response) => response.json())
      .then((response) => {
        setMineLevel(response.newLevel);
        setMetalPrice(parseInt(response.metalPrice * Math.pow((response.priceMultiplier / 100), (response.newLevel))));
        setCrystalPrice(parseInt(response.crystalPrice * Math.pow((response.priceMultiplier / 100), (response.newLevel))));
        setDeuteriumPrice(parseInt(response.deuteriumPrice * Math.pow((response.priceMultiplier / 100), (response.newLevel))));
      })
  }
  useEffect(() => {
    if (idBuildingUp === null) {
      setIdBuildingUp({ idBuilding: refUpgrade.current.attributes[0].value })
    }
    if (idBuildingDown === null) {
      setIdBuildingDown({ idBuilding: refDowngrade.current.attributes[0].value })
    }


  }, [idBuildingUp, idBuildingDown])

  if (mineLevel === null) {
    setMineLevel(item[1][0].level)
  }
  if (metalPrice === null) {
    setMetalPrice(parseInt(item[0].metal_price * Math.pow((item[0].price_multiplier / 100), (item[1][0].level))))
  }
  if (crystalPrice === null) {
    setCrystalPrice(parseInt(item[0].crystal_price * Math.pow((item[0].price_multiplier / 100), (item[1][0].level))))
  }
  if (deuteriumPrice === null) {
    setDeuteriumPrice(parseInt(item[0].deuterium_price * Math.pow((item[0].price_multiplier / 100), (item[1][0].level))))
  }
  return (
    <li>
      <div className="item-img" style={{ backgroundImage: 'url(' + item[0].img_src + ')' }}></div>
      <div>
        <p className="building-name">{item[0].name} niveau {mineLevel}</p>
        <div className="flex-li-infos">
          <p className="buildingDescription">
            {item[0].description}
          </p>
          <div className="buildingInfos">
            <div className="upgrade-info">Nécessaire pour le niveau {mineLevel + 1} :</div>
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