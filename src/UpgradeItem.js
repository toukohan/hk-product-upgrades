import { TextControl, SelectControl, Button } from "@wordpress/components";
import { useSelect, useDispatch } from "@wordpress/data";
import { store as coreDataStore } from "@wordpress/core-data";
import { decodeEntities } from "@wordpress/html-entities";
import { useEffect, useState } from "@wordpress/element";
import { store as noticesStore } from "@wordpress/notices";

export default function UpgradeItem({ upgrade, upgradeCategories }) {
  const { createSuccessNotice, createErrorNotice } = useDispatch(noticesStore);
  const { editedUpgrade, lastError, isSaving, hasEdits } = useSelect(
    (select) => {
      return {
        lastError: select(coreDataStore).getLastEntitySaveError(
          "postType",
          "product-upgrade",
          upgrade.id
        ),
        isSaving: select(coreDataStore).isSavingEntityRecord(
          "postType",
          "product-upgrade",
          upgrade.id
        ),
        hasEdits: select(coreDataStore).hasEditsForEntityRecord(
          "postType",
          "product-upgrade",
          upgrade.id
        ),
        editedUpgrade: select(coreDataStore).getEditedEntityRecord(
          "postType",
          "product-upgrade",
          upgrade.id
        ),
      };
    }
  );

  useEffect(() => {
    console.log("editedUpgrade", editedUpgrade);
  }, [editedUpgrade]);

  const { editEntityRecord, saveEditedEntityRecord } =
    useDispatch(coreDataStore);

  const categoryArray = upgradeCategories?.map((category) => ({
    label: category.name,
    value: category.id,
  }));

  const placeholderCategory = {
    label: "No category",
    value: "",
  };

  const handleTitleChange = (title) => {
    editEntityRecord("postType", "product-upgrade", editedUpgrade.id, {
      title,
    });
  };
  const handleCategoryChange = (category) => {
    editEntityRecord("postType", "product-upgrade", editedUpgrade.id, {
      meta: {
        hkpu_category: category,
      },
      terms: {
        "upgrade-category": [category],
      },
    });
  };

  const handleContentChange = (content) => {
    editEntityRecord("postType", "product-upgrade", editedUpgrade.id, {
      content,
    });
  };

  const handlePriceChange = (price) => {
    if (!isNaN(price) && price >= 0) {
      editEntityRecord("postType", "product-upgrade", editedUpgrade.id, {
        meta: {
          hkpu_price: price,
        },
      });
    } else {
      createErrorNotice("Price must be a positive number");
    }
  };

  const handleSave = async () => {
    const savedRecord = await saveEditedEntityRecord(
      "postType",
      "product-upgrade",
      editedUpgrade.id
    );
    if (savedRecord) {
      console.log("Saved upgrade:", savedRecord);
    }
  };

  console.log("array", categoryArray);
  return (
    <>
      <tr key={editedUpgrade.id}>
        <td>
          <TextControl
            id="upgrade-title"
            value={decodeEntities(editedUpgrade.title)}
            onChange={handleTitleChange}
          />
        </td>
        <td>
          <TextControl
            id="upgrade-content"
            value={decodeEntities(editedUpgrade.content)}
            onChange={handleContentChange}
          />
        </td>
        <td>
          <SelectControl
            id="upgrade-category"
            value={editedUpgrade.meta.hkpu_category}
            options={categoryArray ? categoryArray : []}
            onChange={handleCategoryChange}
          />
        </td>
        <td>
          <TextControl
            id="upgrade-price"
            value={editedUpgrade.meta.hkpu_price}
            onChange={handlePriceChange}
          />
        </td>
        <td>
          <Button variant="primary" disabled={!hasEdits} onClick={handleSave}>
            Save
          </Button>
          <DeleteUpgradeButton upgradeId={editedUpgrade.id} />
        </td>
      </tr>
    </>
  );
}

function DeleteUpgradeButton({ upgradeId }) {
  const { deleteEntityRecord } = useDispatch(coreDataStore);

  const handleDelete = async () => {
    const deletedRecord = await deleteEntityRecord(
      "postType",
      "product-upgrade",
      upgradeId
    );
    if (deletedRecord) {
      console.log("Upgrade deleted", upgradeId);
    }
  };
  return (
    <Button isDestructive onClick={handleDelete}>
      Delete
    </Button>
  );
}
