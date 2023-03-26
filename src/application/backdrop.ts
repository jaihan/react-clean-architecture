import { useBackdropStorage } from "../services/storageAdapter";
import { BackdropStorageService } from "./ports";

export function useBackdrop() {
  const storage: BackdropStorageService = useBackdropStorage();

  async function addLoading(loading: boolean) {
    storage.updateLoading(loading);
  }

  return {
    addLoading,
  };
}
