"use client"

import { useSearchParams } from 'next/navigation'; 
import PdfDisplay from '@/Components/PdfDisplay';

const MyPdfViewer = () => {
    const searchParams = useSearchParams();
    const fileUrl = searchParams.get("fileUrl");

    return(
        <div className='w-[400px]'>
            <PdfDisplay fileUrl={fileUrl}/>
        </div>
    )
};

export default MyPdfViewer;

