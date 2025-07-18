// src/FruitDropdown.js
import React from "react";
import Select from "react-select";

const groupedFruits = {
  Apples: [
    "Apple 7", "Apple 8", "Apple 9", "Apple 10", "Apple 13", "Apple 19",
    "Apple Hit", "Apple Red Yellow 2", "Apple Worm"
  ],
  Pears: ["Pear 2", "Pear Forelle 1", "Pear Stone 1"],
  "Peaches & Plums": ["Peach 2", "Plum 3"],
  Cherries: [
    "Cherry 2", "Cherry 3", "Cherry 4", "Cherry 5",
    "Cherry Rainier 1", "Cherry Rainier 2", "Cherry Rainier 3",
    "Cherry Wax Not Ripen 1"
  ],
  "Grapes & Berries": ["Grape Blue 1", "Blackberrie Not Rippen 1", "Strawberry Wedge 1"],
  Tomatoes: [
    "Tomato 1", "Tomato 2", "Tomato 3", "Tomato 5", "Tomato 7",
    "Tomato 8", "Tomato 9", "Tomato 10", "Tomato Heart 1"
  ],
  Avocados: ["Avocado Green 1", "Avocado Black 1"],
  "Melons & Figs": ["Melon Piel de Sapo 1", "Fig 1"],
  "Citrus & Others": [
    "Cherimoya 1", "Quince 2", "Quince 3", "Quince 4",
    "Cactus Fruit Red 1", "Cactus Fruit Green 1"
  ],
  Cucumber: ["Cucumber 5", "Cucumber 10"],
  "Veggies/Nuts": ["Cauliflower 1", "Pepper Orange 1", "Pistachio 1", "Walnut 1"]
};

const options = Object.entries(groupedFruits).map(([group, fruits]) => ({
  label: group,
  options: fruits.map(fruit => ({ label: fruit, value: fruit }))
}));

const FruitDropdown = () => {
  return (
    <div style={{ marginTop: 30, marginBottom: 30 }}>
      <h4>🧪 Check Available Fruits</h4>
      <Select
        options={options}
        placeholder="Search fruits..."
        isSearchable
      />
    </div>
  );
};

export default FruitDropdown;
