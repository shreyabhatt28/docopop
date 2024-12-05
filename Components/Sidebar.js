import { Edit, Eraser, Highlighter,Pen,Save,Trash } from "lucide-react";
import { Button } from "./ui/button";
import { useOptions } from "@/Context/CanvasContext";

const SideBar = () => {
    const contextValues = useOptions();

return (
    <div className="z-[10] left-0 top-0 absolute h-full w-[200px] p-4 flex justify-center items-center">
        <div className=" w-[150px] shadow-md rounded-md p-2 flex flex-col justify-between bg-purple-400">
        <Button className="shadow-none hover:text-white" onClick = { () => contextValues.addText(contextValues.canvas)}><Edit/></Button>
        <Button className="shadow-none hover:text-white" onClick = {() => contextValues.addBlurEffect(contextValues.canvas)}><Highlighter/></Button>
        <Button className="shadow-none hover:text-white" onClick= {() => contextValues.addHighlight(contextValues.canvas)}><Pen/></Button>
        <Button className="shadow-none hover:text-white" onClick = {() => contextValues.addEraser(contextValues.canvas)}><Eraser/></Button>
        <Button className="shadow-none hover:text-white" onClick = {() => contextValues.deleteBtn()}><Trash/></Button>
        <Button className="shadow-none hover:text-white" onClick= {() => contextValues.downloadPage()}><Save/></Button>
        </div>
        
    </div>
)
}

export default SideBar;