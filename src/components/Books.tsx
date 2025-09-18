import { Plus } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader } from "./ui/card"
import { BookFilters } from "./BookFilters"
import { useState } from "react"
import type { BookFilters as BookFiltersType } from "@/lib/type"
import { BookTable } from "./BookTable"
import { BookForm } from "./BookForm"
export const Books = () => {
    const [filters, setFilters] = useState<BookFiltersType>({
        search: '',
        genre: 'all-genres',
        status: 'all-status',
    });
    const [openBookForm, setOpenBookForm] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const handleFiltersChange = (newFilters: BookFiltersType) => {
        setFilters(newFilters);
        setCurrentPage(1); // Reset to first page when filters change
    };

    return (
        <Card className="w-full mt-[50px]">
            <CardHeader>
                <div className="w-full flex items-center justify-between">
                    <div className="flex flex-col justify-center gap-[5px]">
                        <h1 className="text-2xl font-bold">Book Collection</h1>
                        <p className="text-muted-foreground">
                            A complete list of all books in your collection.
                        </p>
                    </div>

                    <BookForm
                        open={openBookForm}
                        onOpenChange={setOpenBookForm}
                        triggerComponent={
                            <Button className="p-[20px] cursor-pointer" >
                                <Plus className="w-[12px] h-[12px]" />
                                <span>Add Book</span>
                            </Button>
                        }
                        onSubmit={() => { }}
                        isLoading={false}
                    />
                </div>
            </CardHeader>

            <CardContent className="flex flex-col gap-[30px]">

                {/* filter */}
                <div>
                    {/* Filters */}
                    <BookFilters
                        filters={filters}
                        onFiltersChange={handleFiltersChange}
                    />
                </div>
                {/* table */}
                <div>
                    <BookTable books={[]} onEdit={() => { }} onDelete={() => { }} isLoading={false} />
                </div>
            </CardContent>

        </Card>
    )
}
