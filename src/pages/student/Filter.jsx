import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { useGetCourseCategoriesQuery } from "@/features/api/courseApi";

const Filter = ({ onChange }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");

  const { data, isLoading } = useGetCourseCategoriesQuery();

  const categories = data?.categories || [];

  const handleCategoryChange = (category, checked) => {
    setSelectedCategories((prev) => {
      const updated = checked
        ? [...prev, category]
        : prev.filter((c) => c !== category);

      onChange(updated, sortByPrice);
      return updated;
    });
  };

  const selectByPriceHandler = (value) => {
    setSortByPrice(value);
    onChange(selectedCategories, value);
  };

  return (
    <div className="w-full md:w-[20%]">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-lg md:text-xl">Filter Options</h1>

        <Select value={sortByPrice} onValueChange={selectByPriceHandler}>
          <SelectTrigger>
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort By Price</SelectLabel>
              <SelectItem value="low">Low to High</SelectItem>
              <SelectItem value="high">High to Low</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Separator className="my-4" />

      <div>
        <h1 className="font-semibold mb-2">CATEGORY</h1>

        {isLoading ? (
          <p className="text-sm text-gray-500">Loading categories...</p>
        ) : (
          categories.map((category) => (
            <div key={category} className="flex items-center space-x-2 my-2">
              <Checkbox
                id={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={(checked) =>
                  handleCategoryChange(category, checked)
                }
              />
              <Label htmlFor={category}>{category}</Label>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Filter;
