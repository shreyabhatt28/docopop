"use client"
import {useDropzone} from "react-dropzone";

const DropFileInput = () => {
const onDrop = (acceptedFile) => {
    console.log(acceptedFile);
}

const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: '.jpg,.jpeg,.png,.pdf',
    multiple: true, 
});

return (
    <div className=""  {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag & drop your files here, or click to select files</p>
    </div>
)

}

export default DropFileInput;