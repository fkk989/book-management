import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useForm, Controller } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod'; import type { Book } from "@/lib/type";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Dropdown } from "./custom/Dropdown";
import { bookGenres } from "@/lib/constants";
import { useEffect } from "react";
;

const bookSchema = z.object({
    title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
    author: z.string().min(1, 'Author is required').max(100, 'Author must be less than 100 characters'),
    genre: z.string({
        error: 'Genre is required'
    }).min(1, 'Genre is required'),
    publishedYear: z
        .number()
        .min(1000, 'Year must be at least 1000')
        .max(new Date().getFullYear(), `Year cannot be in the future`),
    status: z.enum(['available', 'issued'], {
        error: "Must be Available | Issued"
    }),
});

type BookFormData = z.infer<typeof bookSchema>;

interface BookFormModalProps {
    open: boolean;
    onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
    onSubmit: SubmitHandler<BookFormData>;
    book?: Book | null;
    isLoading: boolean;
    triggerComponent: React.ReactNode
}

export const BookForm: React.FC<BookFormModalProps> = (props) => {

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<BookFormData>({
        resolver: zodResolver(bookSchema),
        mode: "onChange"
    })


    useEffect(() => {
        if (props.open) {
            if (props.book) {
                reset({
                    title: props.book.title,
                    author: props.book.author,
                    genre: props.book.genre,
                    publishedYear: props.book.publishedYear,
                    status: props.book.status,
                });
            } else {
                reset({
                    title: '',
                    author: '',
                    genre: '',
                    publishedYear: new Date().getFullYear(),
                    status: 'available',
                });
            }
        }
    }, [props.book, props.open, reset]);


    const isEditMode = !!props.book;

    return (
        <Dialog open={props.open} onOpenChange={props.onOpenChange}>
            <DialogTrigger>{props.triggerComponent}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{isEditMode ? "Edit book details." : "Add a new book"}</DialogTitle>
                    <DialogDescription>{isEditMode ? "Update your book details." : "Fill in details to add a new book."}</DialogDescription>
                    <DialogDescription>
                        <form onSubmit={handleSubmit(props.onSubmit)} className="w-full flex flex-col gap-[15px]">

                            <div className="flex flex-col gap-[10px]">
                                <Label className="text-black font-medium" htmlFor="title">Title</Label>
                                <Input id={"title"} {...register("title")} className="text-black" />
                                {<p className="text-[tomato]">{errors.title?.message}</p>}
                            </div>

                            <div className="flex flex-col gap-[10px]">
                                <Label className="text-black font-medium" htmlFor="author">Author</Label>
                                <Input id={"author"} {...register("author")} className="text-black" />
                                {<p className="text-[tomato]">{errors.author?.message}</p>}
                            </div>

                            <div className="flex flex-col gap-[10px]">
                                <Label htmlFor="genre" className="text-black font-medium">Genre</Label>
                                <Controller
                                    name="genre"
                                    control={control}
                                    rules={{ required: "Please select a genre" }}
                                    render={({ field }) => (
                                        <Dropdown placeholder='Select a genre'
                                            value={field.value}
                                            options={bookGenres}
                                            onChange={field.onChange}
                                            className='w-full  text-black'
                                        />
                                    )}
                                />
                                {<p className="text-[tomato]">{errors.genre?.message}</p>}
                            </div>

                            <div className="flex flex-col gap-[10px]">
                                <Label className="text-black font-medium" htmlFor="publishedYear">Published Year</Label>
                                <Input className="text-black" type={"number"} id={"publishedYear"} {...register("publishedYear")} />
                                {<p className="text-[tomato]">{errors.publishedYear?.message}</p>}
                            </div>

                            <div className="flex flex-col gap-[10px]">
                                <Label htmlFor="status" className="text-black font-medium">Status</Label>
                                <Controller
                                    name={"status"}
                                    control={control}
                                    rules={{ required: "Please select a genre" }}
                                    render={({ field }) => (
                                        <Dropdown placeholder='Select a genre'
                                            value={field.value}
                                            options={[
                                                {
                                                    value: "available",
                                                    label: "Available"
                                                },
                                                {
                                                    value: "issued",
                                                    label: "Issued"
                                                }
                                            ]}
                                            onChange={field.onChange}
                                            className='w-full text-black'
                                        />
                                    )}
                                />
                                {<p className="text-[tomato]">{errors.status?.message}</p>}
                            </div>

                            <div className="w-full flex justify-end items-center gap-[10px]">
                                <Button type="button" onClick={() => {
                                    props.onOpenChange(false)
                                }} disabled={props.isLoading} variant={"outline"} className="text-black cursor-pointer">Cancel</Button>

                                <Button disabled={props.isLoading} type={"submit"} className="cursor-pointer">{props.isLoading ? 'Saving...' : isEditMode ? 'Update Book' : 'Add Book'}</Button>
                            </div>
                        </form>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
