import { RootState } from "@/state/store";
import { useSelector } from "react-redux";

export const useNotification = () => {
  const currentNotification = useSelector(
    (state: RootState) => state.notification.currentNotification,
  );

  return {
    selected: currentNotification,
  };
};
