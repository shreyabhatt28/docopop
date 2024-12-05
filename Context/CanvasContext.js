"use client"

import { createContext, useContext, useEffect, useState } from "react";
import {fabric} from "fabric";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const editOptions = createContext();

export const useOptions = () =>{
    return useContext(editOptions);
}
    

const CanvasProvider = ({children}) =>{

    const [pdfUrl,setPdfUrl] = useState(null);
    const [numPages,setNumPages] = useState(null);
    const [currentPage,setCurrentPage] = useState(1);
    const [canvas,setCanvas] = useState('');
    const [edits,setEdits] = useState({});
    const [exportPages,setExportPages] = useState([]);

    const downloadPage = () => {
        const doc = document.querySelector("#singlePage");
        if (!doc) {
        console.error("The document element is not available yet.");
        return;
        }

        setTimeout(() => {
            html2canvas(doc,{scale:2}).then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const imgWidth = canvas.width;
                const imgHeight = canvas.height;

                const pdfWidth = 595; 
                const pdfHeight = 842;

                const scaleX = pdfWidth / imgWidth;
                const scaleY = pdfHeight / imgHeight;
                const scale = Math.min(scaleX, scaleY);

                const scaledWidth = imgWidth * scale;
                const scaledHeight = imgHeight * scale;

                const pdf = new jsPDF('p', 'pt', 'a4');
                
                pdf.addImage(imgData, 'PNG', 0, 0, scaledWidth, scaledHeight);

                pdf.save("edited_document.pdf");
            });
        }, 100);
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
    
    return(
        <editOptions.Provider value={{canvas,setCanvas,numPages,setNumPages,currentPage,setCurrentPage,pdfUrl,setPdfUrl,deleteBtn,addText,addBlurEffect,edits,setEdits,downloadPage,addHighlight,addEraser}}>
            {children}
        </editOptions.Provider>
    )

}

export default CanvasProvider;