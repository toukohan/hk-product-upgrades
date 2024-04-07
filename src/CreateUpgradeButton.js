import { __ } from "@wordpress/i18n";
import { useDispatch, useSelect } from "@wordpress/data";
import { store as coreDataStore } from "@wordpress/core-data";
import {
  Button,
  Modal,
  Spinner,
  TextControl,
  SelectControl,
} from "@wordpress/components";
import { useState, useEffect } from "@wordpress/element";

export default function CreateUpgradeButton({
  categories,
  hasCategoriesResolved,
}) {
  const [isOpen, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  return (
    <>
      <Button onClick={openModal} variant="primary">
        {__("Uusi päivitys", "hk-product-upgrades")}
      </Button>
      {isOpen && (
        <Modal
          onRequestClose={closeModal}
          title={__("Luo uusi päivitys", "hk-product-upgrades")}
        >
          <CreateUpgradeForm
            onCancel={closeModal}
            onSaveFinished={closeModal}
            categories={categories}
            hasCategoriesResolved={hasCategoriesResolved}
          />
        </Modal>
      )}
    </>
  );
}

function CreateUpgradeForm({
  onCancel,
  onSaveFinished,
  categories,
  hasCategoriesResolved,
}) {
  const [upgrade, setUpgrade] = useState({
    title: "",
    content: "",
    price: "",
    category: "",
  });

  const handleChange = (value, field) => {
    setUpgrade((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    console.log("upgrade:", upgrade);
  }, [upgrade]);

  const { saveEntityRecord } = useDispatch(coreDataStore);

  const handleSave = async () => {
    const savedRecord = await saveEntityRecord("postType", "product-upgrade", {
      title: upgrade.title,
      content: upgrade.content,
      meta: {
        hkpu_price: upgrade.price,
        hkpu_category: upgrade.category,
      },
      status: "publish",
    });
    if (savedRecord) {
      console.log("Saved upgrade:", savedRecord);
      onSaveFinished();
    }
  };

  const { lastError, isSaving } = useSelect(
    (select) => ({
      lastError: select(coreDataStore).getLastEntitySaveError(
        "postType",
        "product-upgrade"
      ),
      isSaving: select(coreDataStore).isSavingEntityRecord(
        "postType",
        "product-upgrade"
      ),
    }),
    []
  );

  const categoryArray = categories?.map((category) => ({
    label: category.name,
    value: category.id,
  }));

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
        id="title"
        label={__("Title", "hk-product-upgrades")}
        value={upgrade.title}
        onChange={(value) => handleChange(value, "title")}
      />
      {hasCategoriesResolved && categoryArray && (
        <SelectControl
          id="category"
          label={__("Category", "hk-product-upgrades")}
          value={upgrade.category}
          options={[
            {
              label: __("No category", "hk-product-upgrades"),
              value: "",
            },
            ...categoryArray,
          ]}
          onChange={(value) => handleChange(value, "category")}
        />
      )}
      {!categoryArray && <Spinner />}
      <TextControl
        id="content"
        label={__("Content", "hk-product-upgrades")}
        value={upgrade.content}
        onChange={(value) => handleChange(value, "content")}
      />
      <TextControl
        id="price"
        label={__("Price", "hk-product-upgrades")}
        value={upgrade.price}
        onChange={(value) => handleChange(value, "price")}
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
