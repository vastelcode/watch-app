import { addWatch } from "../server-actions/addWatch";


export default function WatchForm() {
  return (
    <form action={addWatch} className="bg-white rounded-xl shadow-md p-6 mb-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add New Watch</h2>
      
      <div className="space-y-4">
        <div>
          <label 
            htmlFor="brand" 
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Brand
          </label>
          <input 
            type="text" 
            id="brand" 
            name="brand" 
            required 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
          />
        </div>
        
        <div>
          <label 
            htmlFor="model" 
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Model
          </label>
          <input 
            type="text" 
            id="model" 
            name="model" 
            required 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
          />
        </div>
        
        <div>
          <label 
            htmlFor="referenceNumber" 
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Reference Number
          </label>
          <input 
            type="text" 
            id="referenceNumber" 
            name="referenceNumber" 
            required 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
          />
        </div>
        
        <button 
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 mt-4"
        >
          Add Watch
        </button>
      </div>
    </form>
  );
}