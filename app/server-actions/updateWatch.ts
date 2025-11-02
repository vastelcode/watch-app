'use server';

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export default async function updateWatch(formData: FormData) {

  const brand = formData.get('brand');
  const model = formData.get('model');
  const referenceNumber = formData.get('referenceNumber');
  const id = formData.get('id');

  console.log(formData)


  const cookiesStore = await cookies();
  const supabase = createServerComponentClient({cookies: () => cookiesStore});

  const { data: { session } } = await supabase.auth.getSession();
  const user = session?.user;

  if(!user ) {
    console.error('User is not authhenticated withing updateWatch server action');
    return;
  }

  const { data, error } = await supabase
  .from('watches')
  .update({
    brand,
    model,
    reference_number: referenceNumber
  })
  .match({id, user_id: user.id})

  if( error ) {
    console.error('Error update data', error);
    return;
  };

  revalidatePath('/watch-list');

  return { message: 'Success' };
}