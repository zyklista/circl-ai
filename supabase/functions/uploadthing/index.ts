import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Simple file upload handler for now
const handleFileUpload = async (req: Request) => {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      throw new Error('No file provided');
    }

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");

    // Create Supabase client for auth
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    const user = userData.user;
    if (!user) throw new Error("User not authenticated");

    // Upload to UploadThing
    const uploadthingSecret = Deno.env.get("UPLOADTHING_SECRET");
    const uploadthingAppId = Deno.env.get("UPLOADTHING_APP_ID");
    
    if (!uploadthingSecret || !uploadthingAppId) {
      throw new Error("UploadThing credentials not configured");
    }

    // Convert file to buffer for UploadThing API
    const buffer = await file.arrayBuffer();
    const formData = new FormData();
    formData.append('files', new Blob([buffer], { type: file.type }), file.name);

    // Upload to UploadThing API
    const uploadResponse = await fetch('https://api.uploadthing.com/api/uploadFiles', {
      method: 'POST',
      headers: {
        'X-Uploadthing-Api-Key': uploadthingSecret,
        'X-Uploadthing-Version': '6.4.0',
      },
      body: formData,
    });

    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text();
      throw new Error(`UploadThing upload failed: ${errorText}`);
    }

    const uploadResult = await uploadResponse.json();
    const uploadedFile = uploadResult.data?.[0];
    
    if (!uploadedFile) {
      throw new Error('No file returned from UploadThing');
    }

    // Store file info in Supabase using service role
    const supabaseService = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const { data, error } = await supabaseService.from("uploaded_files").insert({
      user_id: user.id,
      file_name: file.name,
      file_url: uploadedFile.url,
      file_size: file.size,
      file_type: file.type,
      uploadthing_key: uploadedFile.key,
    }).select().single();

    if (error) throw error;

    return {
      url: uploadedFile.url,
      name: file.name,
      key: uploadedFile.key,
      size: file.size,
      type: file.type
    };
  } catch (error) {
    throw error;
  }
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (req.method === "POST") {
      const result = await handleFileUpload(req);
      return new Response(JSON.stringify(result), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});