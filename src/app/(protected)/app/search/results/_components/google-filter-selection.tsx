"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// Utils
import { GoogleResultFilterWithUrls } from "@/dashboard/types";
import { useGoogleFilter } from "@/dashboard/google-result/hooks/useGoogleFilter";
import { useGoogleFilterStore } from "@/lib/zustand/google-results-filter-store";

// Components
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { OutlinedButton } from "@/components/ui/button";

// Assets
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";


const FilterSelection = () => {
  const googleResultFilters = useGoogleFilterStore(state => state.googleResultFilter);

  const selectedResultsFilter = useGoogleFilterStore(state => state.selectedResultsFilter);
  const setSelectedResultsFilter = useGoogleFilterStore(state => state.setSelectedResultsFilter);

  const [tagPopoverOpen, setTagPopoverOpen] = useState(false);

  const { fetchFilters } = useGoogleFilter();

  useEffect(() => {
    fetchFilters();
  }, []);

  const clearTags = () => setSelectedResultsFilter([]);

  const toggleTag = (tag: GoogleResultFilterWithUrls) => {
    const newSelectedTags = selectedResultsFilter.includes(tag)
      ? selectedResultsFilter.filter((t) => t !== tag)
      : [...selectedResultsFilter, tag];
    setSelectedResultsFilter(newSelectedTags);
  };

  let tagString = selectedResultsFilter.map(filter => filter.name).join(", ");
  if (tagString.length > 24) {
    tagString = tagString.slice(0, 24) + "...";
  }

  return (
    <Popover open={tagPopoverOpen} onOpenChange={setTagPopoverOpen}>
      <PopoverTrigger asChild>
        <OutlinedButton
          role="combobox"
          aria-expanded={tagPopoverOpen}
          size="smD"
          buttonClassName="w-[250px]  text-sm text-left"
        >
          <span className="text-gray-400 ">Filters:</span>
          {tagString ? (
            <span className="text-gray-800">{tagString}</span>
          ) : (
            <span className="text-gray-800">Whole Site</span>
          )}
          <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </OutlinedButton>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandInput
            placeholder={
              googleResultFilters.length > 0 ? "Search tag..." : "No existing tags"
            }
            className="h-9"
          />
          {googleResultFilters.length > 0 && (
            <CommandGroup>
              <CommandItem onSelect={() => clearTags()}>
                Whole Site
              </CommandItem>
              {googleResultFilters.map((tag) => (
                <CommandItem
                  key={tag.id}
                  value={tag.name}
                  onSelect={(currentValue) => {
                    toggleTag(tag);
                  }}
                >
                  {tag.name}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      selectedResultsFilter.includes(tag)
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
};


export default FilterSelection