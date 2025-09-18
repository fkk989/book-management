import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as bookApi from "@/lib/api/bookApi";
import type { Book } from "@/lib/type";
import toast from "react-hot-toast";

export const useBooks = () => {
  return useQuery({
    queryKey: ["books"],
    queryFn: bookApi.getBooks,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreateBook = ({
  setOpenAddBookModal,
}: {
  setOpenAddBookModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (book: Omit<Book, "_id">) => bookApi.createBook(book),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      toast.success("Book created successfully", { id: "creating-book" });
      setOpenAddBookModal(false);
    },
    onError: (error) => {
      toast.error("Failed to create book", { id: "creating-book" });
      console.error("Create book error:", error);
    },
  });
};

export const useUpdateBook = ({
  setOpenEditModal,
}: {
  setOpenEditModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Omit<Book, "_id"> }) =>
      bookApi.updateBook(id, data),
    onSuccess: () => {
      setOpenEditModal(false);
      queryClient.invalidateQueries({ queryKey: ["books"] });
      toast.success("Book updated successfully", { id: "updating-book" });
    },
    onError: (error) => {
      toast.error("Failed to update book", { id: "updating-book" });
      console.error("Update book error:", error);
    },
  });
};

export const useDeleteBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => bookApi.deleteBook(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      toast.success("Book deleted successfully", { id: "deleting-book" });
    },
    onError: (error) => {
      toast.error("Failed to delete book", { id: "deleting-book" });
      console.error("Delete book error:", error);
    },
  });
};
