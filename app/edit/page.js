"use client"
import { Suspense } from 'react';
import EditDocument from '@/Components/EditDocument';

import Loading from '@/Components/Loading';

const MyPdfViewer = () => {

    return(
    <Suspense fallback={<div className="z-[20] bg-black bg-opacity-40 backdrop-blur-sm fixed inset-0 text-white flex items-center justify-center"><Loading/></div>}>
    <div className='w-full h-full flex justify-center'>
            <EditDocument />
    </div>
    </Suspense>
    )
};

export default MyPdfViewer;

