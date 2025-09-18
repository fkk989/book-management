import { useBooks } from '@/hooks/useBook'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { BookOpen } from 'lucide-react'

export const BookStats = () => {
    const { data: books } = useBooks()

    return (

        <div className="w-full flex items-center justify-between gap-[50px]">
            <Card className='flex-1'>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-[18px] font-medium">Total Books</CardTitle>
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{books?.length || 0}</div>
                </CardContent>
            </Card>

            <Card className='flex-1'>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-[18px] font-medium">Available</CardTitle>
                    <div className="h-4 w-4 bg-green-500 rounded-full" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">

                        {books?.filter((book) => book.status === "available").length || 0}
                    </div>
                </CardContent>
            </Card>

            <Card className='flex-1'>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-[18px] font-medium">Issued</CardTitle>
                    <div className="h-4 w-4 bg-yellow-500 rounded-full" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {books?.filter((book) => book.status === "issued").length || 0}
                    </div>
                </CardContent>
            </Card>
        </div >
    )
}
