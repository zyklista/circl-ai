import { useState, useRef } from "react";
import { uploadFiles, type UploadedFile } from "@/lib/uploadthing";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, FileImage, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FileUploadProps {
  onUploadComplete?: (files: UploadedFile[]) => void;
  maxFiles?: number;
  accept?: string;
  className?: string;
}

export function FileUpload({ 
  onUploadComplete, 
  maxFiles = 5, 
  accept = "image/*",
  className = "" 
}: FileUploadProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    const remainingSlots = maxFiles - uploadedFiles.length;
    
    if (fileArray.length > remainingSlots) {
      toast({
        title: "Too many files",
        description: `You can only upload ${remainingSlots} more file(s).`,
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    
    try {
      const newFiles = await uploadFiles(fileArray);
      setUploadedFiles(prev => [...prev, ...newFiles]);
      onUploadComplete?.(newFiles);
      
      toast({
        title: "Upload Complete",
        description: `${newFiles.length} file(s) uploaded successfully.`,
      });
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: error instanceof Error ? error.message : "Failed to upload files. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const removeFile = (keyToRemove: string) => {
    setUploadedFiles(prev => prev.filter(file => file.key !== keyToRemove));
  };

  const remainingSlots = maxFiles - uploadedFiles.length;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Area */}
      {remainingSlots > 0 && (
        <Card className="border-dashed border-2 border-muted-foreground/25">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
              <div>
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept={accept}
                  multiple={maxFiles > 1}
                  onChange={(e) => handleFileSelect(e.target.files)}
                  className="hidden"
                />
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {isUploading ? "Uploading..." : "Choose Files"}
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Upload up to {remainingSlots} more file(s)
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Uploaded Files Display */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Uploaded Files ({uploadedFiles.length}/{maxFiles})</h4>
          <div className="grid grid-cols-1 gap-2">
            {uploadedFiles.map((file) => (
              <Card key={file.key} className="p-3">
                <div className="flex items-center gap-3">
                  <FileImage className="h-8 w-8 text-muted-foreground" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      <a 
                        href={file.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        View file
                      </a>
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(file.key)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Upload Status */}
      {isUploading && (
        <div className="text-center py-4">
          <div className="animate-pulse text-sm text-muted-foreground">
            Uploading files...
          </div>
        </div>
      )}

      {/* Max Files Reached */}
      {remainingSlots === 0 && (
        <div className="text-center py-4 text-sm text-muted-foreground">
          Maximum files reached ({maxFiles}/{maxFiles})
        </div>
      )}
    </div>
  );
}