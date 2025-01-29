import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { ModeToggle } from "./mode-toggle";
import { Separator } from "./separator";
import { SidebarTrigger } from "./sidebar";

export default function TopNavBar() {
  return (
    <header className="sticky flex h-14 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex w-full items-center justify-between gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <div className="flex space-x-3">
          <ModeToggle />
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
