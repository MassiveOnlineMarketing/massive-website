'use client';

// State
import { useWebsiteDetailsStore } from "@/lib/zustand/website-details-store";
import { useGoogleFilterStore } from "@/lib/zustand/google-results-filter-store";

// Actions
import { createFilterA, CreateGoogleFilterInput, deleteFilterA } from "../actions/google-result-filter";
import { getFiltersByWebsiteId } from "../data/google-result-filter";

// Types
import { GoogleResultFilterWithUrls } from "@/dashboard/types";

// Components
import { useToast } from "@/website/features/toast/use-toast";

export function useGoogleFilter() {
  const { toast } = useToast();
  const currentWebsite = useWebsiteDetailsStore((state) => state.WebsiteDetails);

  const googleResultFilter = useGoogleFilterStore((state) => state.googleResultFilter);
  const addNewResultFilter = useGoogleFilterStore((state) => state.addGoogleResultFilter)
  const removeResultFilter = useGoogleFilterStore((state) => state.removeGoogleResultFilter)
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
    const res = await createFilterA({ data: data, userDomain, websiteId });
    console.log("res", res);

    if (res.success?.name) {
      toast({
        description: `Filter ${res.success?.name} added`,
        variant: "success",
        icon: "success",
        duration: 3000,
      });

      addNewResultFilter(res.success)

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

  /**
   * Deletes a filter and displays a toast notification.
   * @param filter - The filter to be deleted.
   * @returns An object indicating the success of the operation.
   */
  const deleteFilterAndToast = async (filter: GoogleResultFilterWithUrls) => {
    const filterId = filter.id

    const res = await deleteFilterA({filterId})

    if (res.success){
      toast({
        description: `Filter ${res.success.name} deleted`,
        variant: 'success',
        icon: 'success',
        duration: 3000
      })

      removeResultFilter(res.success)

      return { success: true}
    }

    toast({
      description: res.error,
      variant: 'destructive',
      icon: 'destructive',
      duration: 30000
    })
  }

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

  return { createFilterAndToast, deleteFilterAndToast, fetchFilters };
}
