"use client";
import { useState } from "react";
import {useDropzone} from "react-dropzone";
import { Button } from "./ui/button";
import { Edit, Upload } from "lucide-react";
import { useRouter } from "next/navigation";

const cloud_name = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const cloud_preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;


export default function FileUpload() {
  const [file, setFile] = useState(null);
  const [fileUrl,setFileUrl] = useState(null);
  const [uploading,setUploading] = useState(false);
  const [error,setError] = useState(null);
  const router = useRouter();
  
  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
    console.log(acceptedFiles[0]);
    setError(null);
    setUploading(false);
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: '.pdf',
    multiple: false, 
});

  const handleUpload = async () => {
    if(!file){
      return;
    }

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file',file);
    formData.append('upload_preset',cloud_preset);
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

      router.push(`/edit/?fileUrl=${encodeURIComponent(data.secure_url)}`);

      setUploading(false);
    }catch(err){
      setError(err.message);
  }
}


  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white w-[90vw] h-[400px] sm:w-[500px] rounded-[50px] shadow-xl">

    <div {...getRootProps()} className="flex flex-col justify-center p-10 items-center border-dashed border-purple-800 border-2 rounded-xl cursor-pointer">
      <input {...getInputProps()}/>
      <div className="mb-4">
      <Upload/>
      <h3 className="italic text-xs text-gray-500">pdf</h3>
      </div>
      <h1 className="font-bold">Drag and Drop the file here</h1>
      <p>or <span className="text-purple-800">browse file </span>from your device</p>
      <p className="text-gray-500 mt-2 text-sm">
        {file ? `selected file: ${file.name}` : "no file selected"}
      </p>
      <p className={error ? 'block text-red-500 text-xs mt-2' : 'hidden'}>Failed! Try uploading again</p>
    </div>

      {file && !error && (
        <Button
          onClick = {handleUpload}
          className="mt-4 bg-purple-800 hover:bg-puple-400 text-white transition ease rounded-full"
        >
          { uploading && !error ? 'Getting Ready...' : 'Edit'}
          <Edit />
        </Button>
      )}
      </div>
  );
}
