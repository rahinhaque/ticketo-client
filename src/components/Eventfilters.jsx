"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";
import { Search, X } from "lucide-react";

const CATEGORIES = [
  "Music",
  "Tech",
  "Sports",
  "Arts",
  "Business",
  "Food",
  "Other",
];
const LOCATIONS = [
  "New York",
  "San Francisco",
  "London",
  "Dhaka",
  "Tokyo",
  "Berlin",
  "Online",
];

const EventFilters = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateParam = useCallback(
    (key, value) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams],
  );

  const clearAll = () => {
    router.push(pathname);
  };

  const hasFilters =
    searchParams.get("search") ||
    searchParams.get("category") ||
    searchParams.get("location") ||
    searchParams.get("sort");

  return (
    <div className="flex flex-col gap-3 mb-8">
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search events..."
            defaultValue={searchParams.get("search") || ""}
            onChange={(e) => updateParam("search", e.target.value)}
            className="w-full h-11 pl-9 pr-4 rounded-xl bg-slate-900/60 border border-white/10 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-pink-500/50 transition-colors"
          />
        </div>

        {/* Category */}
        <select
          value={searchParams.get("category") || ""}
          onChange={(e) => updateParam("category", e.target.value)}
          className="h-11 px-3 rounded-xl bg-slate-900/60 border border-white/10 text-sm text-white focus:outline-none focus:border-pink-500/50 transition-colors cursor-pointer min-w-[150px]"
        >
          <option value="" className="bg-slate-900">
            All Categories
          </option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat} className="bg-slate-900">
              {cat}
            </option>
          ))}
        </select>

        {/* Location */}
        <select
          value={searchParams.get("location") || ""}
          onChange={(e) => updateParam("location", e.target.value)}
          className="h-11 px-3 rounded-xl bg-slate-900/60 border border-white/10 text-sm text-white focus:outline-none focus:border-pink-500/50 transition-colors cursor-pointer min-w-[150px]"
        >
          <option value="" className="bg-slate-900">
            All Locations
          </option>
          {LOCATIONS.map((loc) => (
            <option key={loc} value={loc} className="bg-slate-900">
              {loc}
            </option>
          ))}
        </select>

        {/* Sort */}
        <select
          value={searchParams.get("sort") || ""}
          onChange={(e) => updateParam("sort", e.target.value)}
          className="h-11 px-3 rounded-xl bg-slate-900/60 border border-white/10 text-sm text-white focus:outline-none focus:border-pink-500/50 transition-colors cursor-pointer min-w-[150px]"
        >
          <option value="" className="bg-slate-900">
            Sort By
          </option>
          <option value="price-asc" className="bg-slate-900">
            Price: Low to High
          </option>
          <option value="price-desc" className="bg-slate-900">
            Price: High to Low
          </option>
          <option value="date-asc" className="bg-slate-900">
            Date: Earliest First
          </option>
          <option value="date-desc" className="bg-slate-900">
            Date: Latest First
          </option>
        </select>
      </div>

      {/* Active filters + clear */}
      {hasFilters && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-slate-500">Active filters:</span>
          {searchParams.get("search") && (
            <span className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400">
              "{searchParams.get("search")}"
              <button onClick={() => updateParam("search", "")}>
                <X size={11} />
              </button>
            </span>
          )}
          {searchParams.get("category") && (
            <span className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              {searchParams.get("category")}
              <button onClick={() => updateParam("category", "")}>
                <X size={11} />
              </button>
            </span>
          )}
          {searchParams.get("location") && (
            <span className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              {searchParams.get("location")}
              <button onClick={() => updateParam("location", "")}>
                <X size={11} />
              </button>
            </span>
          )}
          {searchParams.get("sort") && (
            <span className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              {searchParams.get("sort").replace("-", " ")}
              <button onClick={() => updateParam("sort", "")}>
                <X size={11} />
              </button>
            </span>
          )}
          <button
            onClick={clearAll}
            className="text-xs text-slate-500 hover:text-white underline underline-offset-2 transition-colors ml-1"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
};

export default EventFilters;
