'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '../../../utils/supabase/server'
import { RegisterForm } from './register/page'


export async function login(state: any, formData: FormData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {

    console.log(error.message);
    
    return {error:error.message}
  }
  return {data:"Sign in successful"}

  if (error) {
    redirect('/errorauth')
  }

  revalidatePath('/', 'layout')
  redirect('/profile')
}

// /signup
export async function signup( payload: RegisterForm) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs


  const { error } = await supabase.auth.signUp(payload)


  if (error) {
    return {error:error.message}
  }
  return {data:"Sign up successful"}
  
  revalidatePath('/', 'layout')
  redirect('/')
}