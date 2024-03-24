import { __ } from "@wordpress/i18n";
import { useDispatch, useSelect } from "@wordpress/data";
import { store as coreDataStore } from "@wordpress/core-data";
import { Button, Modal, Spinner, TextControl } from "@wordpress/components";
import { useState, useEffect } from "@wordpress/element";

export default function CreateUpgradeCategoryButton() {
  const [isOpen, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  return (
    <>
      <Button onClick={openModal} variant="primary">
        {__("Uusi kategoria", "hk-product-upgrades")}
      </Button>
      {isOpen && (
        <Modal
          onRequestClose={closeModal}
          title={__("Luo uusi päivityskategoria", "hk-product-upgrades")}
        >
          <CreateUpgradeForm
            onCancel={closeModal}
            onSaveFinished={closeModal}
          />
        </Modal>
      )}
    </>
  );
}

function CreateUpgradeForm({ onCancel, onSaveFinished }) {
  const [category, setCategory] = useState({
    name: "",
    description: "",
  });

  const handleChange = (value, field) => {
    setCategory((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    console.log("Category changed", category);
  }, [category]);

  const { saveEntityRecord } = useDispatch(coreDataStore);

  const handleSave = async () => {
    const savedRecord = await saveEntityRecord("taxonomy", "upgrade-category", {
      name: category.name,
      description: category.description,
      status: "publish",
    });
    if (savedRecord) {
      console.log("Saved category:", savedRecord);
      onSaveFinished();
    }
  };

  const { lastError, isSaving } = useSelect(
    (select) => ({
      lastError: select(coreDataStore).getLastEntitySaveError(
        "taxonomy",
        "upgrade-category"
      ),
      isSaving: select(coreDataStore).isSavingEntityRecord(
        "taxonomy",
        "upgrade-category"
      ),
    }),
    []
  );

  return (
    <div>
      {lastError && (
        <div>
          <p>
            {__(
              "There was an error saving the upgrade. Please try again.",
              "hk-product-upgrades"
            )}
          </p>
          <p>{lastError.message}</p>
        </div>
      )}
      <TextControl
        id="name"
        label={__("Nimi", "hk-product-upgrades")}
        value={category.name}
        onChange={(value) => handleChange(value, "name")}
        autoComplete="off"
      />
      <TextControl
        id="description"
        label={__("Kuvaus", "hk-product-upgrades")}
        value={category.description}
        onChange={(value) => handleChange(value, "description")}
        autoComplete="off"
      />

      <div>
        <Button variant="primary" onClick={handleSave}>
          {isSaving ? (
            <>
              <Spinner />
              {__("Tallentaa", "hk-product-upgrades")}
            </>
          ) : (
            __("Tallenna", "hk-product-upgrades")
          )}
        </Button>
        <Button onClick={onCancel}>
          {__("Peruuta", "hk-product-upgrades")}
        </Button>
      </div>
    </div>
  );
}
