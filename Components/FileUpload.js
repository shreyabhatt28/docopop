"use client";
import { useState, useEffect } from "react";
import { FileUploader } from "react-drag-drop-files";
import { Button } from "./ui/button";
import { Edit } from "lucide-react";
import { useRouter } from "next/navigation";

const cloud_name = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const fileTypes = ["pdf"];

export default function FileUpload() {
  const [file, setFile] = useState(null);
  const [uploading,setUploading] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);
  const [error,setError] = useState(null);
  const router = useRouter();
  

  const handleChange = (file) => {
    setFile(file);
  };

  const handleUpload = async () => {
    if(!file){
      return;
    }

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file',file);
    formData.append('upload_preset','pdf-editor');
    formData.append('resource_type', 'auto');


    try{
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/upload`,{
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if(data.error){
        throw new Error(data.error.message);
      }

      setFileUrl(data.secure_url);
      router.push(`/edit?fileUrl=${encodeURIComponent(data.secure_url)}`);

    }catch(err){
      setError(err.message);
    }finally{
      setUploading(false);
    }
  }



  return (
    <div className="flex flex-col items-center gap-6 bg-blue-200 p-20 rounded-md shadow-md">
      <h1 className="text-[40px] font-bold text-blue-900">Upload your PDF</h1>
      
      <FileUploader
        multiple={false}
        handleChange={handleChange}
        name="file"
        types={fileTypes}
        label="Upload or drop it here"
        
      />
      
      <p className="text-gray-500">
        {file ? `File name: ${file.name}` : "No files uploaded yet"}
      </p>

      {file && (
        <Button
          onClick = {handleUpload}
          className="bg-blue-600 hover:bg-blue-400 text-white transition ease"
        >
          { uploading ? 'Getting Ready....' : 'Start Editing'}
          <Edit />
        </Button>
      )}
      <p className={error ? 'block text-red-500 text-xs' : 'hidden'}>Failed! try uploading again</p>
    </div>
  );
}
