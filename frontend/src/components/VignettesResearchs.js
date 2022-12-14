// import image from '../images/Metal.webp';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { useRef, useEffect, useState } from 'react';

function VignettesResearchs({ data }) {

  const refUpgrade = useRef(null);
  const refDowngrade = useRef(null);
  const [idBuildingUp, setIdBuildingUp] = useState(null);
  const [idBuildingDown, setIdBuildingDown] = useState(null);
  const [mineLevel, setMineLevel] = useState(null);
  const [metalPrice, setMetalPrice] = useState(null);
  const [crystalPrice, setCrystalPrice] = useState(null);
  const [deuteriumPrice, setDeuteriumPrice] = useState(null);
  const [duration, setDuration] = useState(null);

  if (metalPrice === null) {
    setMetalPrice(parseInt(data[0].metal_price * Math.pow((data[0].price_multiplier / 100), (data[1][0].level))))
  }
  if (crystalPrice === null) {
    setCrystalPrice(parseInt(data[0].crystal_price * Math.pow((data[0].price_multiplier / 100), (data[1][0].level))))
  }
  if (deuteriumPrice === null) {
    setDeuteriumPrice(parseInt(data[0].deuterium_price * Math.pow((data[0].price_multiplier / 100), (data[1][0].level))))
  }

  function upgrade() {
    let userData = JSON.parse(localStorage.getItem("userData"));
    fetch('http://localhost:3001/researchs/upgrade', {
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
        calculateDuration(response.base_duration, response.newLevel);
      })
  }
  function downgrade() {
    let userData = JSON.parse(localStorage.getItem("userData"));
    fetch('http://localhost:3001/researchs/downgrade', {
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
        calculateDuration(response.base_duration, response.newLevel);
      })
  }
  useEffect(() => {
    if (idBuildingUp === null) {
      setIdBuildingUp({ idResearch: refUpgrade.current.attributes[0].value })
    }
    if (idBuildingDown === null) {
      setIdBuildingDown({ idResearch: refDowngrade.current.attributes[0].value })
    }
  }, [idBuildingUp, idBuildingDown])
  if (mineLevel === null) {
    setMineLevel(data[1][0].level);
  }

  // Calcule la dur??e pour obtenir la recherche
  function calculateDuration(base_duration, level) {
    let vraieDuree = 0;
    let vraieDuree2 = 0;
    for (let i = 0; i <= level; i++) {
      if (i === 0) {
        vraieDuree = base_duration;
        let minutes = parseInt(vraieDuree / 60).toString()
        let secondes = (vraieDuree % 60).toString()
        setDuration(minutes + "min " + secondes + "s");
      } else {
        vraieDuree2 = vraieDuree * (data[0].duration_multiplier / 100);
        vraieDuree = vraieDuree2;
        let minutes = parseInt(vraieDuree / 60).toString()
        let secondes = (vraieDuree % 60).toString()
        setDuration(minutes + "min " + secondes + "s");
      }
    }
  }




  if (duration === null) {
    calculateDuration(data[0].base_duration, data[1][0].level)
  }





  return (
    <li>
      <div className="data-img" style={{ backgroundImage: 'url(' + data[0].img_src + ')' }}></div>
      <div>
        <p className="building-name">Technologie {data[0].name} niveau {mineLevel} (temps de construction : {duration})</p>
        <div className="flex-li-infos">
          <p className="buildingDescription">
            {data[0].description}
          </p>
          <div className="buildingInfos">
            <div className="upgrade-info">N??cessaire pour le niveau {mineLevel + 1} :</div>
            <span className="upgrade-price">{metalPrice} m??tal, </span>
            <span className="upgrade-price">{crystalPrice} cristal, </span>
            <span className="upgrade-price">{deuteriumPrice} deut??rium</span>
            <div className="btn-vignettes-container">
              <button ref={refUpgrade} onClick={upgrade} id={data[0].id} className="action-upgrade">Am??liorer <FontAwesomeIcon className="faArrowUp" icon={faArrowUp} /></button>
              <button ref={refDowngrade} onClick={downgrade} id={data[0].id} className="action-downgrade">D??molire <FontAwesomeIcon className="faArrowDown" icon={faArrowDown} /></button>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export default VignettesResearchs;