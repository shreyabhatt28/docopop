"use client"

import { createContext, useContext, useState } from "react";
import {fabric} from "fabric";
import { PDFDocument } from "pdf-lib";

const editOptions = createContext();

export const useOptions = () =>{
    return useContext(editOptions);
}
    

const CanvasProvider = ({children}) =>{
    const [numPages,setNumPages] = useState(null);
    const [currentPage,setCurrentPage] = useState(0);
    const [canvas,setCanvas] = useState('');
    const [edits,setEdits] = useState({});


    const tempCanvasElement = document.createElement('canvas');
    tempCanvasElement.width = 595;
    tempCanvasElement.height = 842;
    tempCanvasElement.style.backgroundColor = 'rgba(0, 0, 0, 0)';

    const tempCanvas = new fabric.Canvas(tempCanvasElement);

    const exportDocument = async (fileUrl) => {
        try {
            const existingPdfBytes = await fetch(fileUrl).then(res => res.arrayBuffer());
            const pdfDoc = await PDFDocument.load(existingPdfBytes);

            const pages = pdfDoc.getPages();

            console.log(pages.length);

            if (pages.length === 1){
                const singlePage = pages[0];

                const canvasOverlayUrl = canvas.toDataURL('image/png');
                const canvasOverlayBytes = await fetch(canvasOverlayUrl).then(res => res.arrayBuffer());
                const canvasOverlay = await pdfDoc.embedPng(canvasOverlayBytes);

                const { width, height } = canvasOverlay;
    
                    console.log('Image Dimensions:', width, height);
        
                    singlePage.drawImage(canvasOverlay, {
                        x: 0,
                        y: singlePage.getHeight() - height,
                        width,
                        height,
                    });

            }
            else {
                for (let i = 0; i < pages.length; i++){

                    const page = pages[i];
                    
                    tempCanvas.loadFromJSON(edits[i+1]);
                    tempCanvas.renderAll();

                    const canvasOverlayUrl = tempCanvas.toDataURL('image/png');
                    const canvasOverlayBytes = await fetch(canvasOverlayUrl).then(res => res.arrayBuffer());
                    const canvasOverlay = await pdfDoc.embedPng(canvasOverlayBytes);
    
                    const { width, height } = canvasOverlay;
    
                    console.log('Image Dimensions:', width, height);
        
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
        text.set({fill : "black", fontFamily: "Arial"});
        canvi.add(text);
        canvi.renderAll();
    }

    const addBlurEffect = (canvi) => {

        const imgElement = new Image();
        imgElement.src = '/pixel.jpg';

        imgElement.onload = () => {
            const pattern = new fabric.Pattern({
                source: imgElement,
                repeat:'repeat',
            })

        const blur = new fabric.Rect({
            left: 100,
            top: 100,
            width: 200,
            height: 16,
            fill: pattern,
            selectable: true,
            hasControls: true,
            evented: true,
        });

        canvi.add(blur);
        canvi.renderAll();
        }
    }

    const addHighlight = (canvi) => {
        const highlighter = new fabric.Rect({
            left:150,
            top:150,
            width:200,
            height:16,
            fill: 'rgba(247, 215, 52,0.2)',
        });
        canvi.add(highlighter);
        canvi.renderAll();
    }

    const addEraser = (canvi) => {
        const eraser = new fabric.Rect({
            left:150,
            top:150,
            width:200,
            height:30,
            fill: 'white',
        });
        canvi.add(eraser);
        canvi.renderAll();
    }
    
    const addBlackout = (canvi) => {
        const blackOut = new fabric.Rect({
            left:200,
            top:150,
            width:200,
            height:30,
            fill: 'black',
        });
        canvi.add(blackOut);
        canvi.renderAll();
    }
    return(
        <editOptions.Provider value={{canvas,setCanvas,numPages,setNumPages,currentPage,setCurrentPage,deleteBtn,addText,addBlurEffect,edits,setEdits,addHighlight,addEraser,addBlackout,exportDocument}}>
            {children}
        </editOptions.Provider>
    )

}

export default CanvasProvider;