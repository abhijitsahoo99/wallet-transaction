export const InputBox = ({label , placeholder}) => {
    return <div>
        <div className="py-2 text-sm font-medium text-left">
            {label}
        </div>
        <input placeholder={placeholder} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
</div>
}