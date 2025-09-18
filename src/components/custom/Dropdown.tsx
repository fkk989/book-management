import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

type Option = {
    value: string
    label: string
}

interface SelectDemoProps {
    placeholder?: string
    label?: string
    options: Option[]
    value?: string
    onChange?: (value: string) => void
    className?: string
}

export function Dropdown({
    placeholder = "Select an option",
    label,
    options,
    value,
    onChange,
    className,
}: SelectDemoProps) {
    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className={className}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent side="bottom" avoidCollisions={false} >
                <SelectGroup>
                    {label && <SelectLabel>{label}</SelectLabel>}
                    {options.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
