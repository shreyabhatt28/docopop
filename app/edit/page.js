"use client"

import { useSearchParams } from 'next/navigation'; 
import EditDocument from '@/Components/EditDocument';

const MyPdfViewer = () => {
    const searchParams = useSearchParams();
    const fileUrl = searchParams.get("fileUrl");

    return(
        <div className='w-full h-full flex justify-center'>
            <EditDocument fileUrl={fileUrl}/>
        </div>
    )
};

export default MyPdfViewer;

