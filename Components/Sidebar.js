import { Type,EyeClosed, Eraser, Highlighter,Pen,Save,Trash } from "lucide-react";
import { useOptions } from "@/Context/CanvasContext";
import TooltipButton from "./TooltipButton";


const SideBar = ({fileUrl}) => {
    const contextValues = useOptions();
return (
    <div className="z-[10] pl-2 top-0 left-0 absolute h-full w-[180px] flex items-center justify-start md:justify-end">
            <div className="fixed bg-purple-300 w-[50px] md:w-[80px] shadow-md rounded-full p-2 flex flex-col items-center justify-between gap-6 py-4">

                <TooltipButton
                    icon={<Type/>}
                    onClick={() => contextValues.addText(contextValues.canvas)}
                    tooltipText="Add Text"
                />
                <TooltipButton
                    icon={<Pen/>}
                    onClick={() => contextValues.addBlurEffect(contextValues.canvas)}
                    tooltipText="Add Blur"
                />
                <TooltipButton
                    icon={<Highlighter />}
                    onClick={() => contextValues.addHighlight(contextValues.canvas)}
                    tooltipText="Add Highlight"
                />
                <TooltipButton
                    icon={<EyeClosed/>}
                    onClick={() => contextValues.addBlackout(contextValues.canvas)}
                    tooltipText="Blackout"
                />
                <TooltipButton
                    icon={<Eraser />}
                    onClick={() => contextValues.addEraser(contextValues.canvas)}
                    tooltipText="Erase"
                />
                <TooltipButton
                    icon={<Trash />}
                    onClick={() => contextValues.deleteBtn()}
                    tooltipText="Delete"
                />
                
                <TooltipButton
                    icon={<Save />}
                    onClick={() => contextValues.exportDocument(fileUrl)}
                    tooltipText="Download"
                />

            </div>
        </div>
);
}

export default SideBar;