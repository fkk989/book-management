import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { BookFilters as BookFiltersType } from '@/lib/type';
import { Search } from 'lucide-react';
import { Dropdown } from './custom/Dropdown';
import { bookGenres } from '@/lib/constants';

interface BookFiltersProps {
    filters: BookFiltersType;
    onFiltersChange: (filters: BookFiltersType) => void;

}

export const BookFilters = ({ filters, onFiltersChange }: BookFiltersProps) => {
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onFiltersChange({ ...filters, search: e.target.value });
    };

    const handleGenreChange = (genre: string) => {
        const actualGenre = genre === 'all-genres' ? '' : genre;
        onFiltersChange({ ...filters, genre: actualGenre });
    };

    const handleStatusChange = (status: string) => {
        const actualStatus = status === 'all-status' ? '' : status;
        onFiltersChange({ ...filters, status: actualStatus });
    };

    return (
        <div className="w-full h-[60px] flex items-center justify-between gap-[20px]">
            <div className="w-[70%]">
                <Label htmlFor="search" className='mb-2'>Search by title or author</Label>
                <div className="relative ">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        id="search"
                        placeholder="Search books..."
                        value={filters.search}
                        onChange={handleSearchChange}
                        className="pl-9 h-[40px]"
                    />
                </div>
            </div>

            <div className="w-[30%] flex items-center justify-center gap-[20px]">
                <div className='w-[50%]'>
                    <Label htmlFor="genre" className='mb-2'>Genre</Label>
                    <Dropdown placeholder='Select a genre'
                        value={filters.genre}
                        options={[{ value: "all-genres", label: "All Genre" }, ...bookGenres]}
                        onChange={handleGenreChange}
                        className='w-full'
                    />
                </div>
                <div className='w-[50%]'>
                    <Label htmlFor="status" className='mb-2'>Status</Label>
                    <Dropdown
                        placeholder='Select a status'
                        value={filters.status}
                        options={[
                            {
                                value: "all-status",
                                label: "All Status"
                            },
                            {
                                value: "available",
                                label: "Available"
                            },
                            {
                                value: "issued",
                                label: "Issued"
                            }
                        ]}
                        onChange={handleStatusChange}
                        className='w-full'
                    />
                </div>
            </div>

        </div>
    );
};