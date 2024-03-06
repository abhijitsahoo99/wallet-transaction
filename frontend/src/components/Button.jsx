/* eslint-disable react/prop-types */
export const Button = ({placeholder , onClick}) => {
    return <button onClick = {onClick} className="mt-4 w-full text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
        {placeholder}
    </button>
}