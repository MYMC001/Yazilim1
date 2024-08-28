"use client"

import * as React from "react"
import { Check, ChevronsUpDown, PlusCircle, Layers } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useSectorModal } from "@/hooks/use-sector-modal"
import { useParams, useRouter } from "next/navigation"

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface SectorSwitcherProps extends PopoverTriggerProps {
  items: Record<string, any>[];
}

export default function SectorSwitcher({ className, items = [] }: SectorSwitcherProps) {
  const sectorModal = useSectorModal();
  const params = useParams();
  const router = useRouter();

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id
  }));

  const currentsector = formattedItems.find((item) => item.value === params.sectorId);

  const [open, setOpen] = React.useState(false)

  const onSectorSelect = (sector: { value: string, label: string }) => {
    setOpen(false);
    router.push(`/${sector.value}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a sector"
          className={cn("w-[200px] justify-between", className)}
        >
          <Layers className="mr-2 h-4 w-4" />
          {currentsector?.label}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search sector..." />
            <CommandEmpty>No sector found.</CommandEmpty>
            <CommandGroup heading="sectors">
              {formattedItems.map((sector) => (
                <CommandItem
                  key={sector.value}
                  onSelect={() => onSectorSelect(sector)}
                  className="text-sm"
                >
                  <Layers className="mr-2 h-4 w-4" />
                  {sector.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      currentsector?.value === sector.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false)
                  sectorModal.onOpen()
                }}
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                Create Sector
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
