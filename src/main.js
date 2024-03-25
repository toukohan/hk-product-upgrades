import { render } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { SearchControl, Spinner, SnackbarList } from "@wordpress/components";
import { useDispatch, useSelect } from "@wordpress/data";
import { store as coreDataStore } from "@wordpress/core-data";
import { useState, memo } from "@wordpress/element";
import UpgradeList from "./UpgradeList";
import CreateUpgradeButton from "./CreateUpgradeButton";
import CreateUpgradeCategoryButton from "./CreateUpgradeCategoryButton";
const MemoizedUpgradeList = memo(UpgradeList);

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const { upgrades, hasResolved } = useSelect(
    (select) => {
      const query = {};
      if (searchTerm) {
        query.search = searchTerm;
      }
      const selectorArgs = ["postType", "product-upgrade", query];
      return {
        upgrades: select(coreDataStore).getEntityRecords(...selectorArgs),
        hasResolved: select(coreDataStore).hasFinishedResolution(
          "getEntityRecords",
          selectorArgs
        ),
      };
    },
    [searchTerm]
  );

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
        upgrades={upgrades}
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
