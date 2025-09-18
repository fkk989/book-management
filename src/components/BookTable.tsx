import type { Book } from '@/lib/type';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Edit, Trash2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { BookForm } from './BookForm';
import { useState } from 'react';
import { ConfirmDialog } from './ConfirmModal';
import { useDeleteBook, useUpdateBook } from '@/hooks/useBook';

interface BookTableProps {
    books: Book[];
    isLoading: boolean;
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

export const BookTable = ({ books, isLoading }: BookTableProps) => {

    const getStatusBadgeVariant = (status: Book["status"]) => {
        return status === "available" ? "default" : "secondary";
    };


    const [selectedBook, setSelectedBook] = useState<Book>()
    const [openEditModal, setOpenEditModal] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)

    const { mutate: DeleteBook, isPending: isDeletingTodo } = useDeleteBook()
    const { mutate: EditBook, isPending: isEditingBook } = useUpdateBook({ setOpenEditModal })

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
                        <TableHead >Actions</TableHead>
                    </TableRow>
                </TableHeader>
                {isLoading ? (
                    <BookTableSkeleton />
                ) : (
                    <TableBody>
                        {books.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center">
                                    No books found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            books.map((book) => (
                                <TableRow key={book._id}>
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
                                            <Button
                                                onClick={() => {
                                                    setOpenEditModal(true)
                                                    setSelectedBook(book)
                                                }}
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => {
                                                    setOpenDeleteModal(true)
                                                    setSelectedBook(book)
                                                }}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                )}
            </Table>

            {/* modals */}
            <BookForm
                open={openEditModal}
                onOpenChange={setOpenEditModal}

                onSubmit={(data) => {
                    EditBook({ id: selectedBook?._id!, data })
                }}
                isLoading={isEditingBook}
                book={selectedBook}
            />

            <ConfirmDialog
                open={openDeleteModal}
                onOpenChange={setOpenDeleteModal}
                title='Do you want to delete the book?'
                description={"This will permanantly delete the book."}
                onConfirm={() => DeleteBook(selectedBook!._id)}
                isLoading={isDeletingTodo}
            />
        </div>
    );
};