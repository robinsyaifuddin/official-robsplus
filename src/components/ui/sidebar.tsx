
import * as React from "react";
import { cva } from "class-variance-authority";
import { ChevronLeft, ChevronRight, Menu } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------------------------------
 * Sidebar Provider
 * -----------------------------------------------------------------------------------------------*/

interface SidebarContextValue {
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
  toggleExpanded: () => void;
}

const SidebarContext = React.createContext<SidebarContextValue>({
  expanded: true,
  setExpanded: () => {},
  toggleExpanded: () => {},
});

interface SidebarProviderProps {
  children?: React.ReactNode;
  defaultExpanded?: boolean;
}

const SidebarProvider = ({
  children,
  defaultExpanded = true,
}: SidebarProviderProps) => {
  const [expanded, setExpanded] = React.useState(defaultExpanded);
  const toggleExpanded = React.useCallback(
    () => setExpanded((prev) => !prev),
    []
  );

  const value = React.useMemo(
    () => ({ expanded, setExpanded, toggleExpanded }),
    [expanded, toggleExpanded]
  );

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Sidebar Trigger
 * -----------------------------------------------------------------------------------------------*/

const SidebarTrigger = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Button>) => {
  const { toggleExpanded } = React.useContext(SidebarContext);

  return (
    <Button
      onClick={toggleExpanded}
      size="icon"
      variant="ghost"
      className={cn(className)}
      {...props}
    >
      <Menu className="h-4 w-4" />
    </Button>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Sidebar
 * -----------------------------------------------------------------------------------------------*/

const sidebarVariants = cva(
  "h-screen min-h-screen relative top-0 left-0 z-20 flex w-fit flex-col border-r bg-background transition-all duration-300 ease-in-out",
  {
    variants: {
      expanded: {
        true: "w-64",
        false: "w-[56px]",
      },
    },
    defaultVariants: {
      expanded: true,
    },
  }
);

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

const Sidebar = ({ className, ...props }: SidebarProps) => {
  const { expanded } = React.useContext(SidebarContext);

  return (
    <aside
      className={cn(sidebarVariants({ expanded }), className)}
      {...props}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * Sidebar Header
 * -----------------------------------------------------------------------------------------------*/

interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const SidebarHeader = ({ className, ...props }: SidebarHeaderProps) => {
  return (
    <header
      className={cn(
        "sticky top-0 flex min-h-[56px] items-center border-b px-3",
        className
      )}
      {...props}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * Sidebar Collapser
 * -----------------------------------------------------------------------------------------------*/

interface SidebarCollapserProps
  extends React.ComponentPropsWithoutRef<typeof Button> {}

const SidebarCollapser = ({ className, ...props }: SidebarCollapserProps) => {
  const { expanded, toggleExpanded } = React.useContext(SidebarContext);

  return (
    <Button
      onClick={toggleExpanded}
      size="icon"
      variant="ghost"
      className={cn("absolute -right-3 top-10 h-6 w-6", className)}
      {...props}
    >
      {expanded ? (
        <ChevronLeft className="h-3 w-3" />
      ) : (
        <ChevronRight className="h-3 w-3" />
      )}
    </Button>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Sidebar Content
 * -----------------------------------------------------------------------------------------------*/

interface SidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const SidebarContent = ({ className, ...props }: SidebarContentProps) => {
  return (
    <div
      className={cn("flex flex-1 flex-col gap-2 overflow-auto", className)}
      {...props}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * Sidebar Group
 * -----------------------------------------------------------------------------------------------*/

interface SidebarGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

const SidebarGroup = ({ className, ...props }: SidebarGroupProps) => {
  return (
    <div
      className={cn("flex flex-col gap-1 px-2 py-1.5", className)}
      {...props}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * Sidebar Group Label
 * -----------------------------------------------------------------------------------------------*/

interface SidebarGroupLabelProps
  extends React.HTMLAttributes<HTMLHeadingElement> {}

const SidebarGroupLabel = ({
  className,
  ...props
}: SidebarGroupLabelProps) => {
  return (
    <h3
      className={cn(
        "px-2 text-xs font-medium uppercase text-foreground/60",
        className
      )}
      {...props}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * Sidebar Group Content
 * -----------------------------------------------------------------------------------------------*/

interface SidebarGroupContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const SidebarGroupContent = ({
  className,
  ...props
}: SidebarGroupContentProps) => {
  return <div className={cn("mt-1", className)} {...props} />;
};

/* -------------------------------------------------------------------------------------------------
 * Sidebar Menu
 * -----------------------------------------------------------------------------------------------*/

interface SidebarMenuProps extends React.HTMLAttributes<HTMLUListElement> {}

const SidebarMenu = ({ className, ...props }: SidebarMenuProps) => {
  return (
    <ul className={cn("flex flex-col gap-0.5", className)} {...props} />
  );
};

/* -------------------------------------------------------------------------------------------------
 * Sidebar Menu Item
 * -----------------------------------------------------------------------------------------------*/

interface SidebarMenuItemProps extends React.HTMLAttributes<HTMLLIElement> {}

const SidebarMenuItem = ({ className, ...props }: SidebarMenuItemProps) => {
  return <li className={cn("list-none", className)} {...props} />;
};

/* -------------------------------------------------------------------------------------------------
 * Sidebar Menu Button
 * -----------------------------------------------------------------------------------------------*/

const sidebarMenuButtonVariants = cva(
  "flex items-center gap-2 px-2 py-1.5 text-sm font-medium rounded-md transition-colors",
  {
    variants: {
      variant: {
        default: "bg-transparent hover:bg-accent text-foreground",
        active:
          "bg-accent hover:opacity-80 text-accent-foreground shadow-inner",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface SidebarMenuButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "active";
  asChild?: boolean;
}

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  SidebarMenuButtonProps
>(({ className, variant, asChild = false, ...props }, ref) => {
  const { expanded } = React.useContext(SidebarContext);
  const Comp = asChild ? "span" : "button";

  const content = (
    <Comp
      className={cn(
        sidebarMenuButtonVariants({ variant }),
        expanded ? "justify-start" : "justify-center",
        className
      )}
      ref={ref}
      {...props}
    />
  );

  return expanded ? content : <TooltipMenu>{content}</TooltipMenu>;
});
SidebarMenuButton.displayName = "SidebarMenuButton";

/* -------------------------------------------------------------------------------------------------
 * Sidebar Footer
 * -----------------------------------------------------------------------------------------------*/

interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const SidebarFooter = ({ className, ...props }: SidebarFooterProps) => {
  return (
    <footer
      className={cn(
        "sticky bottom-0 mt-auto flex items-center p-2 border-t",
        className
      )}
      {...props}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * Tooltip Menu
 * -----------------------------------------------------------------------------------------------*/
const TooltipMenu = ({
  children,
  content,
}: {
  children: React.ReactNode;
  content?: React.ReactNode;
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      {isHovered && (
        <div className="absolute left-12 top-1/2 z-50 -translate-y-1/2 rounded-md bg-popover px-3 py-1.5 text-sm font-medium text-popover-foreground shadow-md animate-in fade-in-0 slide-in-from-left-5">
          {content || children}
        </div>
      )}
    </div>
  );
};

export {
  SidebarProvider,
  SidebarTrigger,
  Sidebar,
  SidebarHeader,
  SidebarCollapser,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
};
