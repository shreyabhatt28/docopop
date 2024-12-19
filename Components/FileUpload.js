"use client";
import { useState } from "react";
import {useDropzone} from "react-dropzone";
import { Button } from "./ui/button";
import { Edit, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useOptions } from "@/Context/CanvasContext";


export default function FileUpload() {
  const contextValues = useOptions();

  const [uploading,setUploading] = useState(false);
  const router = useRouter();
  
  const onDrop = (acceptedFiles) => {
    contextValues.setFile(acceptedFiles[0]);
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: '.pdf',
    multiple: false, 
});

  const handleUpload = () => {
    if(!contextValues.file){
      return;
    }
    setUploading(true);
    const fileUrl = URL.createObjectURL(contextValues.file);
    contextValues.setFileUrl(fileUrl);

    setTimeout(()=>{
      setUploading(false);
    }
    ,2100);

    setTimeout(()=>{
      router.push('/edit');
    }
    ,2000);
    
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
        {contextValues.file ? `selected file: ${contextValues.file.name}` : "no file selected"}
      </p>
    </div>

      {contextValues.file && (
        <Button
          onClick = {handleUpload}
          className="mt-4 bg-purple-800 hover:bg-puple-400 text-white transition ease rounded-full"
        >
          { uploading ? <div className="w-2 h-2 border-2 border-t-transparent border-b-transparent border-l-transparent border-r-white-400 rounded-full animate-spin"></div> : <>Edit <Edit /></>}
        </Button>
      )}
      </div>
  );
}
