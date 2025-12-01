import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CATEGORIES, PLATFORMS } from "@/lib/mock-data";
import { Globe, User } from "lucide-react";

const VISIBILITY_OPTIONS = [
  { value: "public", label: "Public", icon: Globe },
  { value: "boys-only", label: "Boys Only", icon: User },
  { value: "girls-only", label: "Girls Only", icon: User },
];

export function Filters() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest text-[#FFC400] mb-5 flex items-center before:w-2 before:h-2 before:bg-[#FFC400] before:mr-2">Visibility</h3>
        <div className="space-y-3 pl-2">
          {VISIBILITY_OPTIONS.map((option) => {
            const Icon = option.icon;
            return (
              <div key={option.value} className="flex items-center space-x-3 group cursor-pointer">
                <Checkbox id={`visibility-${option.value}`} className="border-[#333] data-[state=checked]:bg-[#FFC400] data-[state=checked]:text-black data-[state=checked]:border-[#FFC400] rounded h-4 w-4" />
                <Label htmlFor={`visibility-${option.value}`} className="text-sm font-bold uppercase tracking-wide peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-400 group-hover:text-white transition-colors cursor-pointer flex items-center gap-2">
                  <Icon className="h-3.5 w-3.5" />
                  {option.label}
                </Label>
              </div>
            );
          })}
        </div>
      </div>

      <Separator className="bg-[#222]" />

      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest text-[#FFC400] mb-5 flex items-center before:w-2 before:h-2 before:bg-[#FFC400] before:mr-2">Platform</h3>
        <div className="space-y-3 pl-2">
          {PLATFORMS.map((platform) => (
            <div key={platform} className="flex items-center space-x-3 group cursor-pointer">
              <Checkbox id={`platform-${platform}`} className="border-[#333] data-[state=checked]:bg-[#FFC400] data-[state=checked]:text-black data-[state=checked]:border-[#FFC400] rounded h-4 w-4" />
              <Label htmlFor={`platform-${platform}`} className="text-sm font-bold uppercase tracking-wide peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-400 group-hover:text-white transition-colors cursor-pointer">
                {platform}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator className="bg-[#222]" />

      <Accordion type="single" collapsible defaultValue="categories" className="w-full">
        <AccordionItem value="categories" className="border-0">
          <AccordionTrigger className="text-xs font-bold uppercase tracking-widest text-[#FFC400] py-2 hover:no-underline hover:text-white flex items-center before:w-2 before:h-2 before:bg-[#FFC400] before:mr-2">
            Categories
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-4 pl-2">
              {CATEGORIES.map((category) => (
                <div key={category} className="flex items-center space-x-3 group cursor-pointer">
                  <Checkbox id={`category-${category}`} className="border-[#333] data-[state=checked]:bg-[#FFC400] data-[state=checked]:text-black data-[state=checked]:border-[#FFC400] rounded h-4 w-4" />
                  <Label htmlFor={`category-${category}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-400 group-hover:text-white transition-colors cursor-pointer">
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <Separator className="bg-[#222]" />

      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest text-[#FFC400] mb-5 flex items-center before:w-2 before:h-2 before:bg-[#FFC400] before:mr-2">Campus</h3>
        <div className="space-y-3 pl-2">
           <div className="flex items-center space-x-3 group">
              <Checkbox id="campus-ktr" defaultChecked className="border-[#333] data-[state=checked]:bg-[#FFC400] data-[state=checked]:text-black data-[state=checked]:border-[#FFC400] rounded h-4 w-4" />
              <Label htmlFor="campus-ktr" className="text-sm font-bold uppercase tracking-wide text-gray-400 group-hover:text-white transition-colors">SRM KTR</Label>
           </div>
           <div className="flex items-center space-x-3 group">
              <Checkbox id="campus-rmp" className="border-[#333] data-[state=checked]:bg-[#FFC400] data-[state=checked]:text-black data-[state=checked]:border-[#FFC400] rounded h-4 w-4" />
              <Label htmlFor="campus-rmp" className="text-sm font-bold uppercase tracking-wide text-gray-400 group-hover:text-white transition-colors">SRM RMP</Label>
           </div>
           <div className="flex items-center space-x-3 group">
              <Checkbox id="campus-vdp" className="border-[#333] data-[state=checked]:bg-[#FFC400] data-[state=checked]:text-black data-[state=checked]:border-[#FFC400] rounded h-4 w-4" />
              <Label htmlFor="campus-vdp" className="text-sm font-bold uppercase tracking-wide text-gray-400 group-hover:text-white transition-colors">SRM VDP</Label>
           </div>
        </div>
      </div>
    </div>
  );
}
