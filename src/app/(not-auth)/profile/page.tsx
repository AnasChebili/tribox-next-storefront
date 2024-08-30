import { redirect } from 'next/navigation'
import { createClient } from '../../../../utils/supabase/server'
import { logout } from '@/app/(auth)/logout/actions'



export default async function PrivatePage() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }
  console.log(data.user);
  

  return( <div>

  <p>Hello {data.user.email}</p>
    <form action={logout}>
  <button type="submit">log out</button>
  </form>
  
  </div>)


}