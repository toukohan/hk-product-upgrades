import { render } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { SearchControl } from "@wordpress/components";
import { useSelect } from "@wordpress/data";
import { store as coreDataStore } from "@wordpress/core-data";
import { useEffect, useState, memo } from "@wordpress/element";
import UpgradeList from "./UpgradeList";
import CreateUpgradeButton from "./CreateUpgradeButton";
import CreateUpgradeCategoryButton from "./CreateUpgradeCategoryButton";
import Notifications from "./Notifications";
const MemoizedUpgradeList = memo(UpgradeList);

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUpgrades, setFilteredUpgrades] = useState([]);
  const { upgrades, hasResolved } = useSelect((select) => {
    const selectorArgs = ["postType", "product-upgrade"];
    return {
      upgrades: select(coreDataStore).getEntityRecords(...selectorArgs),
      hasResolved: select(coreDataStore).hasFinishedResolution(
        "getEntityRecords",
        selectorArgs
      ),
    };
  }, []);

  useEffect(() => {
    if (upgrades) {
      const results = upgrades.filter((upgrade) => {
        const title = upgrade.title.rendered.toLowerCase();
        return title.includes(searchTerm.toLowerCase());
      });
      setFilteredUpgrades(results);
    }
  }, [searchTerm, upgrades]);

  const { upgradeCategories, hasResolved: hasCategoriesResolved } = useSelect(
    (select) => {
      return {
        upgradeCategories: select(coreDataStore).getEntityRecords(
          "taxonomy",
          "upgrade-category"
        ),
        hasResolved: select(coreDataStore).hasFinishedResolution(
          "getEntityRecords",
          ["taxonomy", "upgrade-category"]
        ),
      };
    }
  );

  return (
    <div className="product-upgrade-app">
      <Notifications />
      <div className="upgrade-controls">
        <SearchControl
          label={__("Search upgrades", "hk-product-upgrades")}
          value={searchTerm}
          onChange={setSearchTerm}
        />
        <CreateUpgradeButton
          categories={upgradeCategories}
          hasCategoriesResolved={hasCategoriesResolved}
        />
        <CreateUpgradeCategoryButton />
      </div>
      <MemoizedUpgradeList
        upgrades={filteredUpgrades}
        hasResolved={hasResolved}
        upgradeCategories={upgradeCategories}
        hasCategoriesResolved={hasCategoriesResolved}
      />
    </div>
  );
}

window.addEventListener(
  "load",
  function () {
    render(<App />, document.querySelector("#hk-product-upgrades"));
  },
  false
);
