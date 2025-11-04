import { supabase } from "@/lib/supabase/client";

export async function uploadImage(file: File, productId: string) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${productId}.${fileExt}`;
  const { data, error } = await supabase.storage
    .from('products')
    .upload(fileName, file, { cacheControl: '3600', upsert: true });

  if (error) throw error;

  const { data: publicUrlData } = supabase.storage
    .from('products')
    .getPublicUrl(fileName);

  return publicUrlData.publicUrl;
}
