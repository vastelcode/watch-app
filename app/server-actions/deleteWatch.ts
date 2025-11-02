'use server';

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";



export async function deleteWatch(formData: FormData) {
  const watchID = formData.get('id');

  const cookiesStore = await cookies();
  const supabase = createServerComponentClient({cookies: () => cookiesStore});
  const { data: { session } } = await supabase.auth.getSession();
  const user = session?.user;

  if(!user ) {
    console.error('User is not authhenticated within deleteWatch server action');
    return;
  }

  const { error } = await supabase
  .from('watches')
  .delete()
  .match({id: watchID, user_id: user.id})

  if( error ) {
    console.error('Error delete data', error);
    return;
  }

  revalidatePath('/watch-list');

  return { message: 'Success' };
}