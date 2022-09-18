import Vignettes from '../components/Vignettes.js';

function HomeUser(listItems) {
  console.log(listItems.listItems.building)

  let url = document.location.href.replace("http://localhost:3000/", "")
  let urlObj = { url: url }


  let listItems3 = [];

  for (let i = 0; i < listItems.listItems.building.length; i++) {
    if (listItems.listItems.building[i][0].page === urlObj.url) {
      listItems3.push(listItems.listItems.building[i]);
    }
  }

  console.log(listItems)

  return (
    <div>
      <ol>
        {listItems !== null && listItems3.map((item) => {
          return <Vignettes item={item} key={item[0].id} />
        })}
      </ol>
    </div>
  );
}

export default HomeUser;