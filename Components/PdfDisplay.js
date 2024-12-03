import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist';
import { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { MoveRight, MoveLeft } from 'lucide-react';


GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@4.9.124/build/pdf.worker.min.mjs';

const PdfDisplay = ({ fileUrl }) => {
const canvasRef = useRef(null);
const [pdf, setPdf] = useState(null);
const [pageNumber, setPageNumber] = useState(1);  
const [numPages, setNumPages] = useState(0); 
const [isRendering, setIsRendering] = useState(false);

useEffect(() => {

    const loadPdf = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const loadingTask = getDocument(fileUrl);
    const pdfDoc = await loadingTask.promise;
    setPdf(pdfDoc);
    setNumPages(pdfDoc.numPages);

    renderPage(pageNumber, pdfDoc, context);
    };


    loadPdf();
}, [fileUrl]);


const renderPage = async (pageNum, pdfDoc, context) => {
    if (isRendering) return;

    setIsRendering(true);

    try {
    const page = await pdfDoc.getPage(pageNum);
    const viewport = page.getViewport({ scale: 0.75 });

    const canvas = canvasRef.current;

    canvasRef.current.width = viewport.width;
    canvasRef.current.height = viewport.height;

    const renderContext = {
        canvasContext: context,
        viewport: viewport,
    };


    await page.render(renderContext).promise;
    } catch (error) {
    console.error('Error rendering PDF page:', error);
    } finally {
    setIsRendering(false);  
    }
};


    const nextPage = () => {
    if (pageNumber < numPages) {
    setPageNumber(pageNumber + 1);
    }
    };


    const prevPage = () => {
    if (pageNumber > 1) {
    setPageNumber(pageNumber - 1);
    }
    };


    useEffect(() => {
    if (pdf) {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    renderPage(pageNumber, pdf, context);
    }
}, [pageNumber, pdf]);

return (
    <div className="flex justify-center items-center flex-col h-screen w-full">
        <canvas ref={canvasRef} />

        <div className="mt-4">
        <Button
        onClick={prevPage}
        disabled={pageNumber === 1}
        className="bg-blue-600 w-8 h-8 rounded-full text-white mr-2"
        >
        <MoveLeft />
        </Button>
        <span>
        Page {pageNumber} of {numPages}
        </span>
        <Button
        onClick={nextPage}
        disabled={pageNumber === numPages}
        className="bg-blue-600 w-8 h-8 rounded-full text-white ml-2"
        >
        <MoveRight />
        </Button>
        </div>
    </div>
);
};

export default PdfDisplay;
