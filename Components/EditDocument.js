import { Document, Page, pdfjs } from "react-pdf";
import {useEffect, useState} from "react";
import { Button } from "./ui/button";
import { MoveRight, MoveLeft } from "lucide-react";
import SideBar from "./Sidebar";

import {fabric} from "fabric";
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { useOptions } from "@/Context/CanvasContext";

const EditDocument = ({ fileUrl }) => {
  const contextValues = useOptions();

  const[isDocLoading,setIsDocLoading] = useState(true);

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc =
      "https://unpkg.com/pdfjs-dist@4.4.168/build/pdf.worker.min.mjs";
  }, []);


  const onDocumentLoadSuccess = ({numPages}) => {
    contextValues.setNumPages(numPages);
    contextValues.setCurrentPage(1);
    contextValues.setCanvas(createCanvas());
    setIsDocLoading(false);
  }

  const createCanvas = () => {
    return (new fabric.Canvas('canvas',{
      height: 842,
      width: 595,
      backgroundColor: 'rgba(0,0,0,0)'
    }
    ))
  }

  function changePage() {
    const page = contextValues.currentPage;
    contextValues.edits[page] = contextValues.canvas.toObject();
    contextValues.setEdits(contextValues.edits);
    let offset;
    if (contextValues.numPages > page){
      offset = 1;
    }
    if(page > 1){
      offset = -1;
    }

    contextValues.setCurrentPage(page => page + offset);

    contextValues.canvas.clear();
    contextValues.edits[page + offset] && contextValues.canvas.loadFromJSON(contextValues.edits[page + offset]);
    contextValues.canvas.renderAll();
}

  return (

    <div className="flex w-full h-screen items-center justify-center flex-col gap-2 pt-36">
      {isDocLoading && <div className="z-[20] bg-black bg-opacity-10 backdrop-blur-sm fixed inset-0 text-white"></div>}
      {!isDocLoading && <SideBar/>}
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
        <Button disabled={contextValues.currentPage === 1} onClick = {changePage} className="bg-purple-400 w-8 h-8 rounded-full text-white mr-2">
          <MoveLeft/>
        </Button>
        <span>Page {contextValues.currentPage} of {contextValues.numPages} </span>
        <Button disabled={contextValues.currentPage === contextValues.numPages} onClick = {changePage} className="bg-purple-400 w-8 h-8 rounded-full text-white ml-2">
          <MoveRight />
        </Button>
      </div>
    </div>
  );
};

export default EditDocument;
