"use client"

import { createContext, useContext, useState,useEffect } from "react";
import {fabric} from "fabric";
import { PDFDocument } from "pdf-lib";
import {Montserrat} from "next/font/google";

const editOptions = createContext();

export const useOptions = () =>{
    return useContext(editOptions);
}

const montserrat = Montserrat({
    subsets: ['latin'],
    weights: ['300', '400', '500', '600', '700'],
    style: 'normal', 
  });

    

const CanvasProvider = ({children}) =>{
    const [numPages,setNumPages] = useState(null);
    const [currentPage,setCurrentPage] = useState(0);
    const [canvas,setCanvas] = useState('');
    const [color,setColor] =useState("#000000");
    const [docWidth,setDocWidth] = useState(null);
    const [docHeight,setDocHeight] = useState(null);
    const [edits,setEdits] = useState({});
    const [tempCanvas,setTempCanvas] = useState('');
    const [isClient, setIsClient] = useState(false);


    useEffect(() => {
        setIsClient(true); 
    }, []);


    const exportDocument = async (fileUrl) => {
        try {
            const existingPdfBytes = await fetch(fileUrl).then(res => res.arrayBuffer());
            const pdfDoc = await PDFDocument.load(existingPdfBytes);
            const pages = pdfDoc.getPages();

            const tempCanvasElement = document.createElement('canvas');
            tempCanvasElement.width = docWidth; 
            tempCanvasElement.height = docHeight;
            tempCanvasElement.style.backgroundColor = 'rgba(0, 0, 0, 0)';
            
            const tempCanvas = new fabric.Canvas(tempCanvasElement, {
            height: docHeight,
            width: docWidth,
            backgroundColor: 'rgba(0,0,0,0)'
            });

            if (pages.length === 1){
                const singlePage = pages[0];

                const canvasOverlayUrl = canvas.toDataURL('image/png');
                const canvasOverlayBytes = await fetch(canvasOverlayUrl).then(res => res.arrayBuffer());
                const canvasOverlay = await pdfDoc.embedPng(canvasOverlayBytes);

                const { width, height } = canvasOverlay;
        
                    singlePage.drawImage(canvasOverlay, {
                        x: 0,
                        y: singlePage.getHeight()-height,
                        width,
                        height,
                    });

            }
            else {
                for (let i = 0; i < pages.length; i++){

                    const page = pages[i];

                    if(!edits[i+1]){
                        continue;
                    }

                    tempCanvas.clear();
                    tempCanvas.loadFromJSON(edits[i+1]);

                    await new Promise((resolve) => {
                        tempCanvas.renderAll();
                        setTimeout(resolve, 0);
                    });


                    const canvasOverlayUrl = tempCanvas.toDataURL('image/png');
                    const canvasOverlayBytes = await fetch(canvasOverlayUrl).then(res => res.arrayBuffer());
                    const canvasOverlay = await pdfDoc.embedPng(canvasOverlayBytes);
    
                    const { width, height } = canvasOverlay;
        
                    page.drawImage(canvasOverlay, {
                        x: 0,
                        y: page.getHeight() - height,
                        width,
                        height,
                    });
                }
                
            }

            const modifiedPdfBytes = await pdfDoc.save();

            const blob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
            const exportUrl = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = exportUrl;
            link.download = 'modified_page.pdf';
            link.click();
    
            URL.revokeObjectURL(exportUrl);
    
        } catch (error) {
            console.error('Error exporting single page:', error);
        }
    }

    const saveChanges = () => {
        setEdits((prevEdits) => ({
          ...prevEdits,
          [currentPage]: canvas.toObject(),
        }));
      };

    const deleteBtn = () => {
        let activeObject = canvas.getActiveObject();
        if(activeObject){
            canvas.remove(activeObject);
        }
    }

    const addText = (canvi) => {
        const text = new fabric.Textbox("Type...",{
            editable: true,
        });
        text.set({fill : color, fontFamily: montserrat.style.fontFamily});
        canvi.add(text);
        canvi.renderAll();
    }

    const addHighlight = (canvi) => {
        const highlighter = new fabric.Rect({
            left:150,
            top:150,
            width:200,
            height:16,
            fill: color,
            opacity:0.3,
        });
        canvi.add(highlighter);
        canvi.renderAll();
    }

    
    const addRectangle = (canvi) => {
        const rectangle = new fabric.Rect({
            left:200,
            top:150,
            width:200,
            height:30,
            fill: color,
        });
        canvi.add(rectangle);
        canvi.renderAll();
    }
    return(
        <editOptions.Provider value={{canvas,setCanvas,numPages,setNumPages,currentPage,color,setColor,docWidth,setDocWidth,docHeight,setDocHeight,setCurrentPage,deleteBtn,addText,edits,setEdits,addHighlight,addRectangle,exportDocument,saveChanges}}>
            {children}
        </editOptions.Provider>
    )

}

export default CanvasProvider;