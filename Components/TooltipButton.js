
import { TooltipProvider , Tooltip, TooltipContent, TooltipTrigger } from "../Components/ui/tooltip"

const TooltipButton = ({ icon, onClick, tooltipText }) => {
  return (
    <TooltipProvider delayDuration={50}>
      <Tooltip>
        <TooltipTrigger>
          <div className=" h-10 w-10 hover:shadow-md rounded-full transition-all ease hover:text-white hover:bg-purple-900 flex items-center justify-center text-purple-800" onClick={onClick}>
            {icon}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <div className="p-2 text-white bg-black mb-[-6px] text-xs rounded-md">
            {tooltipText}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipButton;
