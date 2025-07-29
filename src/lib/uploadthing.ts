import { supabase } from "@/integrations/supabase/client";

export interface UploadedFile {
  url: string;
  name: string;
  key: string;
  size: number;
  type: string;
}

export const uploadFiles = async (files: File[]): Promise<UploadedFile[]> => {
  const uploadPromises = files.map(async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const { data, error } = await supabase.functions.invoke('uploadthing', {
      body: formData,
    });

    if (error) throw error;
    return data as UploadedFile;
  });

  return Promise.all(uploadPromises);
};