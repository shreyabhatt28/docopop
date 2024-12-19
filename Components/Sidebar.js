import {RectangleHorizontal,Download, Type, Highlighter,Save,Trash, Circle } from "lucide-react";
import { useOptions } from "@/Context/CanvasContext";
import TooltipButton from "./TooltipButton";


const SideBar = ({fileUrl}) => {
    const contextValues = useOptions();

    const handleColorChange = (event) => {
        const selectedColor = event.target.value;
        contextValues.setColor(selectedColor); 
    };

return (
    <div className="z-[10] pl-2 top-0 left-0 absolute h-full w-[180px] flex items-center justify-start md:justify-end">
            <div className="fixed bg-purple-300 w-[50px] md:w-[80px] shadow-md rounded-full p-2 flex flex-col items-center justify-between gap-6 py-4">

                <TooltipButton
                    icon={<Type/>}
                    onClick={() => contextValues.addText(contextValues.canvas)}
                    tooltipText="Add Text"
                />
                
                <TooltipButton
                    icon={<Highlighter />}
                    onClick={() => contextValues.addHighlight(contextValues.canvas)}
                    tooltipText="Add Highlight"
                />
                <TooltipButton
                    icon={<RectangleHorizontal/>}
                    onClick={() => contextValues.addRectangle(contextValues.canvas)}
                    tooltipText="Draw Rectangle"
                />

                <TooltipButton
                    icon={<Circle/>}
                    onClick={() => contextValues.addCircle(contextValues.canvas)}
                    tooltipText="Draw Circle"
                />

<TooltipButton
                    icon={
                        <div className="relative">
                            <input 
                                type="color" 
                                onChange={handleColorChange} 
                                className="absolute w-8 h-8 p-0 border-0 cursor-pointer opacity-0 z-10" 
                                title="Select Color"
                            />
                                <div
                                    className="w-6 h-6 rounded-full shadow-sm shadow-black"
                                    style={{ backgroundColor: contextValues.color || "#000000" }}  // Use the current color from context
                                ></div>
                        </div>
                    }
                    tooltipText="Select Color"
                />

                <TooltipButton
                    icon={<Trash />}
                    onClick={() => contextValues.deleteBtn()}
                    tooltipText="Delete"
                />

                <TooltipButton
                    icon={<Save />}
                    onClick={() => contextValues.saveChanges()}
                    tooltipText="Save Changes"
                />
                
                <TooltipButton
                    icon={<Download />}
                    onClick={() => contextValues.exportDocument(fileUrl)}
                    tooltipText="Export"
                />

            </div>
        </div>
);
}

export default SideBar;