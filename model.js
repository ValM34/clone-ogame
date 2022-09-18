const model = {
  user: {
    id: 1
  },
  planet: {
    id: 1,
    id_user: 1,
    metal_mine_level: 18,
    crystal_mine_level: 13
  },
  buildings: [
    {
      id: 1,
      name: "Mine de métal",
      metal_price: 60,
      crystal_price: 15,
      deuterium_price: 0,
      multiplier: 30,
      role: "production",
      page: "ressources",
      img_src: "images/name"
    },
    {
      id: 2,
      name: "Mine de cristal",
      metal_price: 48,
      crystal_price: 24,
      deuterium_price: 0,
      multiplier: 20,
      role: "production",
      page: "ressources",
      img_src: "images/name"
    }
  ],
  liaison_planet_building: [
    {
      id: 1,
      id_planet: 1,
      id_building: 1,
      level: 18
    },
    {
      id: 2,
      id_planet: 1,
      id_building: 2,
      level: 12
    }
  ]
}

console.log(model)

