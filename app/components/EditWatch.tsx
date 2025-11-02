'use client';

import { WatchI } from "../watch-list/page";
import { ChangeEvent, useState } from "react";

import updateWatch from "../server-actions/updateWatch";

export default function EditWatch({ watch } : { watch: WatchI }) {

  const [showModal, setShowModal] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    brand: watch.brand,
    model: watch.model,
    referenceNumber: watch.reference_number
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name] : e.target.value})
  };

  return (
    <div>
      <button 
        onClick={() => setShowModal(true)}
        className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors duration-200"
      >
        Edit
      </button>
      {
        showModal && (
          <div className="fixed inset-0  flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative">
              <button 
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-light"
              >
                &times;
              </button>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Edit Watch</h2>
              <form action={updateWatch} onSubmit={() => setShowModal(false)} className="space-y-4">
                <input type="hidden" name="id" id={watch.id} value={watch.id} />
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
                    value={formData.brand}
                    onChange={handleChange}
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
                    value={formData.model}
                    onChange={handleChange}
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
                    value={formData.referenceNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 mt-4"
                  onClick={() => console.log(formData)}
                >
                  Update Watch
                </button>
              </form>
            </div>
          </div>
        )
      }
    </div>
  );
}