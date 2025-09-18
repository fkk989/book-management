import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { BookForm } from "./BookForm";
import { ConfirmDialog } from "./ConfirmModal";
import { useDeleteBook, useUpdateBook } from "@/hooks/useBook";
import type { Book } from "@/lib/type";

interface BookTableProps {
    books: Book[];
    isLoading: boolean;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    bookesPerPage: number;
}

const BookTableSkeleton = () => (
    <TableBody>
        {Array.from({ length: 5 }).map((_, index) => (
            <TableRow key={index}>
                <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                <TableCell><Skeleton className="h-6 w-20" /></TableCell>
                <TableCell>
                    <div className="flex gap-2">
                        <Skeleton className="h-8 w-8" />
                        <Skeleton className="h-8 w-8" />
                    </div>
                </TableCell>
            </TableRow>
        ))}
    </TableBody>
);

const BookRow = ({
    book,
    onEdit,
    onDelete,
}: {
    book: Book;
    onEdit: () => void;
    onDelete: () => void;
}) => {
    const getStatusBadgeVariant = (status: Book["status"]) => (
        status === "available" ? "default" : "secondary");

    return (
        <TableRow key={book._id} className="border-b border-gray-200">
            <TableCell className="font-medium">{book.title}</TableCell>
            <TableCell>{book.author}</TableCell>
            <TableCell>{book.genre}</TableCell>
            <TableCell>{book.publishedYear}</TableCell>
            <TableCell>
                <Badge variant={getStatusBadgeVariant(book.status)}>
                    {book.status}
                </Badge>
            </TableCell>
            <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                    <Button size="sm" onClick={onEdit}>
                        <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={onDelete}>
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </TableCell>
        </TableRow>
    )
};

const PaginationFooter = ({
    currentPage,
    totalPages,
    onPrev,
    onNext,
}: {
    currentPage: number;
    totalPages: number;
    onPrev: () => void;
    onNext: () => void;
}) =>
    totalPages > 0 && (
        <div className="flex items-center justify-between px-4 py-2 border-t border-gray-200">
            <p className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
            </p>
            <div className="flex gap-2">
                <Button size="sm" variant="outline" disabled={currentPage === 1} onClick={onPrev}>
                    Previous
                </Button>
                <Button
                    size="sm"
                    variant="outline"
                    disabled={currentPage === totalPages}
                    onClick={onNext}
                >
                    Next
                </Button>
            </div>
        </div>
    );

export const BookTable = ({
    books,
    isLoading,
    currentPage,
    setCurrentPage,
    bookesPerPage,
}: BookTableProps) => {
    const [selectedBook, setSelectedBook] = useState<Book>();
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const { mutate: deleteBook, isPending: isDeleting } = useDeleteBook();
    const { mutate: editBook, isPending: isEditing } = useUpdateBook({ setOpenEditModal });

    const totalPages = Math.ceil(books.length / bookesPerPage);
    const paginatedBooks = books.slice(
        (currentPage - 1) * bookesPerPage,
        currentPage * bookesPerPage
    );

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>Genre</TableHead>
                        <TableHead>Year</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>

                {isLoading ? (
                    <BookTableSkeleton />
                ) : (
                    <TableBody>
                        {paginatedBooks.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center">
                                    No books found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            paginatedBooks.map((book) => (
                                <BookRow
                                    key={book._id}
                                    book={book}
                                    onEdit={() => {
                                        setOpenEditModal(true);
                                        setSelectedBook(book);
                                    }}
                                    onDelete={() => {
                                        setOpenDeleteModal(true);
                                        setSelectedBook(book);
                                    }}
                                />
                            ))
                        )}
                    </TableBody>
                )}
            </Table>

            <PaginationFooter
                currentPage={currentPage}
                totalPages={totalPages}
                onPrev={() => setCurrentPage((p) => p - 1)}
                onNext={() => setCurrentPage((p) => p + 1)}
            />

            {/* Edit Modal */}
            <BookForm
                open={openEditModal}
                onOpenChange={setOpenEditModal}
                onSubmit={(data) => editBook({ id: selectedBook?._id!, data })}
                isLoading={isEditing}
                book={selectedBook}
            />

            {/* Delete Modal */}
            <ConfirmDialog
                open={openDeleteModal}
                onOpenChange={setOpenDeleteModal}
                title="Do you want to delete the book?"
                description="This will permanently delete the book."
                onConfirm={() => deleteBook(selectedBook!._id)}
                isLoading={isDeleting}
            />
        </div>
    );
};
