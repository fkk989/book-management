import { Plus } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader } from "./ui/card"
import { BookFilters } from "./BookFilters"
import { useCallback, useMemo, useState } from "react"
import type { BookFilters as BookFiltersType } from "@/lib/type"
import { BookTable } from "./BookTable"
import { BookForm } from "./BookForm"
import { useBooks, useCreateBook } from "@/hooks/useBook"

export const Books = () => {

    const [filters, setFilters] = useState<BookFiltersType>({
        search: '',
        genre: 'all-genres',
        status: 'all-status',
    });
    const [openAddBookModal, setOpenAddBookModal] = useState(false)

    // pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const bookesPerPage = 10;

    const handleFiltersChange = useCallback((newFilters: BookFiltersType) => {
        setFilters(newFilters);
        setCurrentPage(1); // Reset to first page when filters change
    }, []);

    const { data: books, isLoading: isBooksLoading } = useBooks()
    const { mutate: CreateBook, isPending: AddingBook } = useCreateBook({ setOpenAddBookModal })

    const filteredBooks = useMemo(() => {
        return books?.filter((book) => {
            const matchesSearch =
                !filters.search ||
                book.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                book.author.toLowerCase().includes(filters.search.toLowerCase());

            const matchesGenre = !filters.genre || filters.genre === "all-genres" || book.genre === filters.genre;

            const matchesStatus = !filters.status || filters.status === "all-status" || book.status === filters.status;

            return matchesSearch && matchesGenre && matchesStatus;
        }) || [];
    }, [books, filters]);

    return (
        <Card className="w-full mt-[50px]">
            <CardHeader className="w-full max-sm:px-[10px]">
                <div className="w-full flex items-center justify-between">
                    <div className="flex flex-col justify-center gap-[5px]">
                        <h1 className="text-xl md:text-2xl font-bold">Book Collection</h1>
                        <p className="max-md:text-[12px] text-muted-foreground">
                            A complete list of all books in your collection.
                        </p>
                    </div>
                    <Button onClick={() => {
                        setOpenAddBookModal(true)
                    }} className="max-sm:w-[50px]  md:p-[20px] cursor-pointer" >
                        <Plus className="w-[12px] h-[12px]" />
                        <span className="max-sm:hidden">Add Book</span>
                    </Button>
                    <BookForm
                        open={openAddBookModal}
                        onOpenChange={setOpenAddBookModal}

                        onSubmit={async (data) => {
                            CreateBook(data)
                        }}
                        isLoading={AddingBook}
                    />
                </div>
            </CardHeader>

            <CardContent className="flex flex-col gap-[30px] w-full max-sm:px-[10px]">

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
                    <BookTable
                        books={filteredBooks || []}
                        isLoading={isBooksLoading}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        bookesPerPage={bookesPerPage}
                    />
                </div>
            </CardContent>

        </Card>
    )
}
