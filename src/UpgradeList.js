import { Spinner, Button, Modal } from "@wordpress/components";
import { useDispatch, useSelect } from "@wordpress/data";
import { store as coreDataStore } from "@wordpress/core-data";
import { useState } from "@wordpress/element";
import UpgradeItem from "./UpgradeItem";

export default function UpgradeList({
  upgrades,
  hasResolved,
  upgradeCategories,
  hasCategoriesResolved,
}) {
  if (!hasResolved || !hasCategoriesResolved) {
    return <Spinner />;
  }

  if (!upgrades?.length) {
    return <p>No upgrades found</p>;
  }

  return (
    <table className="wp-list-table widefat fixed striped table-view-list">
      <thead>
        <tr>
          <th>Title</th>
          <th>Content</th>
          <th>Category</th>
          <th style={{ width: 50 }}>Price</th>
          <th style={{ width: 190 }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {upgrades?.map((upgrade) => (
          <UpgradeItem
            key={upgrade.id}
            upgrade={upgrade}
            upgradeCategories={upgradeCategories}
          />
        ))}
      </tbody>
    </table>
  );
}

function EditUpgradeButton({ upgradeId }) {
  const [isOpen, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const { upgrade, lastError, isSaving, hasEdits } = useSelect(
    (select) => ({
      upgrade: select(coreDataStore).getEditedEntityRecord(
        "postType",
        "product-upgrade",
        upgradeId
      ),
      lastError: select(coreDataStore).getLastEntitySaveError(
        "postType",
        "product-upgrade",
        upgradeId
      ),
      isSaving: select(coreDataStore).isSavingEntityRecord(
        "postType",
        "product-upgrade",
        upgradeId
      ),
      hasEdits: select(coreDataStore).hasEditsForEntityRecord(
        "postType",
        "product-upgrade",
        upgradeId
      ),
    }),
    [upgradeId]
  );

  const handleEdit = () => {
    console.log("Edited upgrade:", upgrade);
  };
  return (
    <>
      <Button variant="primary" onClick={openModal}>
        Edit
      </Button>
      {isOpen && (
        <Modal onRequestClose={closeModal} title="Edit upgrade">
          <p>Editing upgrade {upgradeId}</p>
          <Button onClick={handleEdit}>Save</Button>
        </Modal>
      )}
    </>
  );
}
