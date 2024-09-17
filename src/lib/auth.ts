import { createClient } from "../../utils/supabase/server";

export const getAuthUser = async (access_token: string) => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser(access_token);
  if (error) throw error;
  return data.user;
};
