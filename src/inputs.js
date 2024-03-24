import { render } from "@wordpress/element";
import UpgradeInputs from "./UpgradeInputs";

const InputsApp = () => {
  return <UpgradeInputs />;
};

window.addEventListener(
  "load",
  function () {
    render(
      <InputsApp />,
      document.querySelector("#hkpu_product_upgrade_inputs")
    );
  },
  false
);
