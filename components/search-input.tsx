"use client";

import qs from "query-string";
import { useDebounce } from "@/hooks/use-debounce";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";

export const SearchInput = () => {
    const [value, setValue] = useState("");
    const debounceValue = useDebounce(value); 
    
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const currentCategortId = searchParams.get("categortId");

    useEffect(() => {
        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                categoryId: currentCategortId,
                title: debounceValue
            }
        }, { skipEmptyString: true, skipNull: true });

        router.push(url)
    }, [debounceValue, currentCategortId, router, pathname]);
    

    return (
        <div className="relative">
            <Search
                className="h-4 w-4 absolute top-3 left-3 text-slate-600"
            />
            <Input
                onChange={(e) => setValue(e.target.value)}
                value={value}
                className="w-full md:w-[300] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200"
                placeholder="Seach for a course..."
            />
        </div>
    );
}