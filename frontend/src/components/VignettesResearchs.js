// import image from '../images/Metal.webp';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { useRef, useEffect, useState } from 'react';

function VignettesResearchs({ data }) {

  const refUpgrade = useRef(null);
  const refDowngrade = useRef(null);
  const [state, setState] = useState(null);
  const [state2, setState2] = useState(null);

  console.log(data[0].price_multiplier)
  console.log(data[0].id)
  let metalPrice = parseInt(data[0].metal_price * Math.pow((data[0].price_multiplier / 100), (data[1][0].level)))
  let crystalPrice = parseInt(data[0].crystal_price * Math.pow((data[0].price_multiplier / 100), (data[1][0].level)))
  let deuteriumPrice = parseInt(data[0].deuterium_price * Math.pow((data[0].price_multiplier / 100), (data[1][0].level)))

  function upgrade() {
    let userData = JSON.parse(localStorage.getItem("userData"));
    fetch('http://localhost:3001/researchs/upgrade', {
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
    fetch('http://localhost:3001/researchs/downgrade', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': userData[0].token
      },
      body: JSON.stringify(state2)
    })
  }
  useEffect(() => {
    if (state === null) {
      setState({ idResearch: refUpgrade.current.attributes[0].value })
    }
    if (state2 === null) {
      setState2({ idResearch: refDowngrade.current.attributes[0].value })
    }
  }, [state, state2])
    


  return (
    <li>
      <div className="data-img" style={{ backgroundImage: 'url(' + data[0].img_src + ')' }}></div>
      <div>
        <p className="building-name">Technologie {data[0].name} niveau {data[1][0].level}</p>
        <div className="flex-li-infos">
          <p className="buildingDescription">
            {data[0].description}
          </p>
          <div className="buildingInfos">
            <div className="upgrade-info">Nécessaire pour le niveau {data[1][0].level + 1} :</div>
            <span className="upgrade-price">{metalPrice} métal, </span>
            <span className="upgrade-price">{crystalPrice} cristal, </span>
            <span className="upgrade-price">{deuteriumPrice} deutérium</span>
            <div className="btn-vignettes-container">
              <button ref={refUpgrade} onClick={upgrade} id={data[0].id} className="action-upgrade">Améliorer <FontAwesomeIcon className="faArrowUp" icon={faArrowUp} /></button>
              <button ref={refDowngrade} onClick={downgrade} id={data[0].id} className="action-downgrade">Démolire <FontAwesomeIcon className="faArrowDown" icon={faArrowDown} /></button>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export default VignettesResearchs;