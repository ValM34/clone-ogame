let maxLevel = 50;
let metalMine = [];

for (i = 0; i < maxLevel; i++) {
  if (i != 0) {
    metalMine[i] = { "level": i, "production": Math.trunc(30 * i * Math.pow(1.1, i)) };
  } else {
    metalMine[i] = { "level": i, "production": 20 };
  }
};



// Prix de la mine de métal

let metalMinePrice = [];
let actualPriceMetal = 60;
let actualPriceCrystal = 15;
metalMinePrice[0] = {
  "level": 1,
  "metal price": actualPriceMetal,
  "crystal price": actualPriceCrystal
}

for (i = 0; i < maxLevel; i++) {
  if (i !== 0) {
    actualPriceMetal = actualPriceMetal * 1.5 ^ i - 1; // Il faut tester de mettre netre parenthèses (i - 1) pour voir comment ça réagit
    actualPriceCrystal = actualPriceCrystal * 1.5 ^ i - 1;
    metalMinePrice[i+1] = {
      "level": i + 1,
      "metal price": actualPriceMetal * 1.5 ^ i - 1,
      "crystal price": actualPriceCrystal * 1.5 ^ i - 1
    }
  } else {
    metalMinePrice[1] = {
      "level": 1,
      "metal price": actualPriceMetal * 1.5 ^ 1 - 1,
      "crystal price": actualPriceCrystal * 1.5 ^ 1 - 1
    }
  }
}

var data = [];
// ...
data[0] = { "ID": "1", "Status": "Valid" };
data[1] = { "ID": "2", "Status": "Invalid" };
// ...
var tempData = [];
for ( var index=0; index<data.length; index++ ) {
    if ( data[index].Status == "Valid" ) {
        tempData.push( data );
    }
}
data = tempData;

