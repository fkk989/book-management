import { BookOpen } from 'lucide-react'

export const Header = () => {
    return (
        <div className="w-full flex flex-col justify-center gap-[5px]">
            <div className="flex items-center gap-3">
                <BookOpen className="h-8 w-8 text-primary" />
                <h1 className="text-xl md:text-3xl font-bold">Book Management Dashboard</h1>
            </div>
            <p className="text-sm text-muted-foreground">
                Manage your book collection with ease.
            </p>
        </div>
    )
}
