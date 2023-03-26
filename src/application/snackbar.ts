import { useSnackbarStorage } from "../services/storageAdapter";
import { SnackbarStorageService } from "./ports";

export function useSnackbar() {
  const storage: SnackbarStorageService = useSnackbarStorage();

  async function displayMsg(msg: string) {
    storage.displayMsg(msg);
  }

  return {
    displayMsg,
  };
}
