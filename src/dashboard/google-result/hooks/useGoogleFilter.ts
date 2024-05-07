import { useToast } from "@/website/features/toast/use-toast";
import {
  createFilter,
  CreateGoogleFilterInput,
  getFiltersByWebsiteId,
} from "../actions/google-result-filter";
import { useWebsiteDetailsStore } from "@/lib/zustand/website-details-store";
import { useGoogleFilterStore } from "@/lib/zustand/google-results-filter-store";
import { GoogleResultFilterWithUrls } from "@/dashboard/types";

export function useGoogleFilter() {
  const { toast } = useToast();
  const currentWebsite = useWebsiteDetailsStore((state) => state.WebsiteDetails);

  const googleResultFilter = useGoogleFilterStore((state) => state.googleResultFilter);
  const setGoogleResultFilter = useGoogleFilterStore((state) => state.setGoogleResultFilter);

  /**
   * Creates a filter and displays a toast notification based on the result.
   * @param {CreateGoogleFilterInput} options - The options for creating the filter.
   * @param {any} options.data - The data for creating the filter.
   * @param {string} options.userDomain - The user domain.
   * @param {string} options.websiteId - The website ID.
   * @returns {Promise<{ success: boolean }>} A promise that resolves to an object indicating the success status.
   */
  const createFilterAndToast = async ({
    data,
    userDomain,
    websiteId,
  }: CreateGoogleFilterInput) => {
    const res = await createFilter({ data: data, userDomain, websiteId });
    console.log("res", res);

    if (res.success?.name) {
      toast({
        description: `Filter ${res.success?.name} added`,
        variant: "success",
        icon: "success",
        duration: 3000,
      });

      return { success: true };
    }

    toast({
      description: res.error,
      variant: "destructive",
      icon: "destructive",
      duration: 3000,
    });

    return { success: false };
  };

  const fetchFilters = async () => {

    if (!currentWebsite?.id) {
      return
    }

    const res = await getFiltersByWebsiteId(currentWebsite?.id);
    console.log("res", res);

    if (res.length) {
      setGoogleResultFilter(res as GoogleResultFilterWithUrls[])
    }
  };

  return { createFilterAndToast, fetchFilters };
}
