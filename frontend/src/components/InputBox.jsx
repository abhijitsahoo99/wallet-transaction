/* eslint-disable react/prop-types */
export const InputBox = ({label , placeholder , onChange}) => {
    return <div>
        <div className="py-2 text-sm font-medium text-left">
            {label}
        </div>
        <input onChange={onChange} placeholder={placeholder} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
</div>
}