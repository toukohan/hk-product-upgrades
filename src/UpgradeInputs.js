import { Spinner } from "@wordpress/components";

import { useEffect, useState } from "@wordpress/element";

export default function UpgradeInputs() {
  const [selectedUpgrades, setSelectedUpgrades] = useState([]);
  const [selectionsResolved, setSelectionsResolved] = useState(false);
  const [upgrades, setUpgrades] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const productId = window.location.search.split("&")[0].split("=")[1];

    fetch(`/wp-json/hkpu/v1/product-upgrade-data/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUpgrades(data.upgrades);
        setCategories(data.categories);
        setSelectedUpgrades(data.selected_upgrades);
        setSelectionsResolved(true);
      });
  }, []);

  const handleChange = (e) => {
    const upgradeId = e.target.value;
    if (selectedUpgrades.includes(upgradeId)) {
      setSelectedUpgrades(selectedUpgrades.filter((id) => id !== upgradeId));
    } else {
      setSelectedUpgrades([...selectedUpgrades, upgradeId]);
    }
  };

  // const renderCategory = (category) => {
  //   const categoryUpgrades = upgrades.filter(
  //     (upgrade) => Number(upgrade.category) === category.id
  //   );

  //   if (categoryUpgrades.length === 0) {
  //     return null;
  //   }
  //   return (
  //     <div key={category.id}>
  //       <h4>{category.name}</h4>
  //       {categoryUpgrades.map(renderCheckbox)}
  //     </div>
  //   );
  // };

  return (
    <div className="upgrade-inputs">
      {selectionsResolved ? (
        categories?.map(
          (category) =>
            category && (
              <UpgradeCategory
                key={category.id}
                category={category}
                upgrades={upgrades}
                selectedUpgrades={selectedUpgrades}
                handleChange={handleChange}
              />
            )
        ) ?? <Spinner />
      ) : (
        <Spinner />
      )}
    </div>
  );
}
const UpgradeCategory = ({
  category,
  upgrades,
  selectedUpgrades,
  handleChange,
}) => {
  console.log("upgrade category selections: ", selectedUpgrades);
  const categoryUpgrades = upgrades.filter(
    (upgrade) => Number(upgrade.category) === category.id
  );

  if (categoryUpgrades.length === 0) {
    return null;
  }

  return (
    <div key={category.id}>
      <h4>{category.name}</h4>
      {categoryUpgrades.map((upgrade) => (
        <UpgradeCheckbox
          key={upgrade.id}
          upgrade={upgrade}
          selectedUpgrades={selectedUpgrades}
          handleChange={handleChange}
        />
      ))}
    </div>
  );
};

const UpgradeCheckbox = ({ upgrade, selectedUpgrades, handleChange }) => {
  console.log("Checkbox upgrade id: ", upgrade.id);
  console.log("Checkbox selectedUpgrades: ", selectedUpgrades);
  const isChecked = selectedUpgrades?.includes(upgrade.id.toString());
  return (
    <div key={upgrade.id} className="hkpu-upgrade-input">
      <label
        className="hkpu-upgrade-input__label"
        htmlFor={`hkpu_upgrades_${upgrade.id}`}
      >
        <input
          className="hkpu-upgrade-input__checkbox"
          type="checkbox"
          id={`hkpu_upgrades_${upgrade.id}`}
          name="hkpu_upgrades[]"
          value={upgrade.id}
          checked={isChecked}
          onChange={handleChange}
        />

        {upgrade.title}
        <span className="hkpu-upgrade-input__title"></span>
      </label>
      <span className="hkpu-upgrade-input__price">{upgrade.price}€</span>
    </div>
  );
};
