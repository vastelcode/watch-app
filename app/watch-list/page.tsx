import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import EditWatch from "../components/EditWatch";
import WatchForm from "../components/WatchForm";

import { deleteWatch } from "../server-actions/deleteWatch";

import { cookies } from "next/headers";

export interface WatchI {
  brand: string;
  id: string;
  model: string;
  reference_number: string;
}

export default async function WatchList() {

  const cookiesStore = await cookies();
  const supabase = createServerComponentClient({
    cookies: () => cookiesStore
  });

  const {data: { session }} = await supabase.auth.getSession();

  const user = session?.user;

  const { data: watches, error } = await supabase
  .from('watches')
  .select('*')
  .eq('user_id', user?.id)
  .order('brand', { ascending: true }) as {data: WatchI[] | null, error: any};

  if ( error ) {
    console.error('Error fetching watches');
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-8 px-4 text-gray-700">
  <div className="max-w-4xl mx-auto">
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      {/* Header section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">My Watch List</h1>
        <form action="/auth/signout" method="post">
          <button 
            type="submit"
            className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Sign Out
          </button>
        </form>
      </div>

      {/* Watch form */}
      <div className="mb-8">
        <WatchForm/>
      </div>

      {/* Watches list */}
      <div className="space-y-4">
        {watches?.map((watch) => (
          <div 
            key={watch.id} 
            className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-800 mb-1">
                  {watch.brand} - {watch.model}
                </h2>
              </div>
              <div className="flex space-x-2 ml-4">
                <form action={deleteWatch} className="inline">
                  <input type="hidden" name="id" value={watch.id}/>
                  <button 
                    type="submit"
                    className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors duration-200"
                  >
                    Delete
                  </button>
                </form>
                <EditWatch watch={watch}/>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {watches?.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">
            Your watch list is empty. Add your first watch to get started!
          </p>
        </div>
      )}
    </div>
  </div>
</div>
  )
} 