import { SnackbarList } from "@wordpress/components";
import { useDispatch, useSelect } from "@wordpress/data";
import { store as noticesStore } from "@wordpress/notices";

export default function Notifications() {
  const notices = useSelect((select) => select(noticesStore).getNotices(), []);
  const { removeNotice } = useDispatch(noticesStore);
  const snackbarNotices = notices.filter(({ type }) => type === "snackbar");

  return (
    <SnackbarList
      className="components-editor-notices__snackbar"
      notices={snackbarNotices}
      onRemove={removeNotice}
    />
  );
}
