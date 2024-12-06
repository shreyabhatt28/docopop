"use client"

import EditDocument from '@/Components/EditDocument';
import { useSearchParams } from 'next/navigation';

const MyPdfViewer = () => {
    const searchParams = useSearchParams();
    const pdfUrl = searchParams.get("fileUrl");

    return(
        <div className='w-full h-full flex justify-center'>
            <EditDocument fileUrl = {pdfUrl}/>
        </div>
    )
};

export default MyPdfViewer;

