interface TextFieldProps {
    type: string,
    value: any,
    required: boolean,
    id: string,
    name: string,
    placeholder: string,
    className?: string,
    aria: string,
    onChange: any,
}

function TextField ({
    type,
    value,
    required = true,
    id,
    name,
    placeholder = "",
    className = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
    aria,
    onChange
}: TextFieldProps) {
    return (
        <input
            type={type}
            id={id}
            name={name}
            placeholder={placeholder}
            className={className}
            onChange={onChange}
            aria-describedby={aria}
            value={value}
        />
    )
}

export default TextField;