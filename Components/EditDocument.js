"use client"

import { Document, Page, pdfjs } from "react-pdf";
import {useEffect, useState} from "react";
import { Button } from "./ui/button";
import { MoveRight, MoveLeft } from "lucide-react";
import SideBar from "./Sidebar";
import Loading from "./Loading";
import {fabric} from "fabric";
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { useOptions } from "@/Context/CanvasContext";
import { useSearchParams } from "next/navigation";



const EditDocument = () => {
  const searchParams = useSearchParams();
  const fileUrl = searchParams.get("fileUrl");

  const contextValues = useOptions();

  const[isDocLoading,setIsDocLoading] = useState(true);

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@4.4.168/build/pdf.worker.min.mjs';
  }, []);


  const onDocumentLoadSuccess = ({numPages}) => {
    contextValues.setEdits({});
    contextValues.setNumPages(numPages);
    contextValues.setCurrentPage(1);
    contextValues.setCanvas(createCanvas());
    setTimeout(()=> {setIsDocLoading(false)},2000);
  }


  const createCanvas = () => {
    return (new fabric.Canvas('canvas',{
      height: 842,
      width: 595,
      backgroundColor: 'rgba(0,0,0,0)'
    }
    ))
  }

  function changePage(direction) {
    
    const currentPage = contextValues.currentPage;
    contextValues.edits[currentPage] = contextValues.canvas.toObject();
    contextValues.setEdits({...contextValues.edits});

    const newPage = currentPage + direction;

    if (newPage >= 1 && newPage <= contextValues.numPages) {
        contextValues.setCurrentPage(newPage);
    }

    contextValues.canvas.clear();
    
    contextValues.canvas.loadFromJSON(contextValues.edits[newPage])
    contextValues.canvas.renderAll();
console.log(contextValues.edits)
}


  return (

    <div className="flex w-full h-full items-center justify-center flex-col gap-2 pt-10">
      {isDocLoading && <div className="z-[20] bg-black bg-opacity-40 backdrop-blur-sm fixed inset-0 text-white flex items-center justify-center"><Loading/></div>}
      {!isDocLoading && <SideBar fileUrl={fileUrl}/>}
      {(contextValues.numPages > 1) && <p className="text-sm text-purple-800 mb-2">Please navigate between pages to save the changes</p>}
      <div id = "singlePage" className="flex justify-center items-center">
      <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess} loading="">
      <div className="z-[8] absolute">
          <canvas id="canvas"/>
      </div>
      <div id="pdf-doc" className="shadow-lg z-[7]">
      <Page pageNumber={contextValues.currentPage} width={595} height={842} loading=""/>
      </div>
      </Document>
      </div>
      <div className="p-2 z-[9]">
        <Button disabled={contextValues.currentPage === 1} onClick = {()=>changePage(-1)} className="bg-purple-800 w-8 h-8 rounded-full text-white mr-2">
          <MoveLeft/>
        </Button>
        <span>Page {contextValues.currentPage} of {contextValues.numPages} </span>
        <Button disabled={contextValues.currentPage === contextValues.numPages} onClick = {()=>changePage(1)} className="bg-purple-800 w-8 h-8 rounded-full text-white ml-2">
          <MoveRight />
        </Button>
      </div>
      
    </div>
  );
};

export default EditDocument;
