import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlignStartHorizontal,
  BoxIcon,
  ChartLine,
  HouseIcon,
  List,
  PanelsTopLeftIcon,
  SettingsIcon,
  UsersRoundIcon,
} from "lucide-react";
import ClientKanbanBoard from "./client-kanban-board";
import ProjectOverview from "./project-overview";
import { useProjectContext } from "./kanban-board";
import TasksTable from "./tasks-table";

export default function ProjectHeader() {
  const { project } = useProjectContext();
  return (
    <Tabs defaultValue="List">
      <TabsList className="mb-3 h-auto w-full justify-start gap-2 rounded-none border-b bg-transparent px-0 py-1 text-foreground">
        <TabsTrigger
          value="Overview"
          className="relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 hover:bg-background-tertiary hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary data-[state=active]:hover:bg-background-secondary"
        >
          <a href="#overview" className="flex items-center">
            <HouseIcon
              className="-ms-0.5 me-1.5 opacity-60"
              size={16}
              aria-hidden="true"
            />
            Overview
          </a>
        </TabsTrigger>
        <TabsTrigger
          value="Board"
          className="relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 hover:bg-background-tertiary hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary data-[state=active]:hover:bg-background-secondary"
        >
          <a href="#board" className="flex items-center">
            <AlignStartHorizontal
              className="-ms-0.5 me-2.5 opacity-60"
              size={16}
              aria-hidden="true"
            />
            Board
          </a>
        </TabsTrigger>
        <TabsTrigger
          value="List"
          className="relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 hover:bg-background-tertiary hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary data-[state=active]:hover:bg-background-secondary"
        >
          <a href="#list" className="flex items-center">
            <List
              className="-ms-0.5 me-2.5 opacity-60"
              size={16}
              aria-hidden="true"
            />
            List
          </a>
        </TabsTrigger>
        <TabsTrigger
          value="tab-3"
          className="relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 hover:bg-background-tertiary hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary data-[state=active]:hover:bg-background-secondary"
        >
          <BoxIcon
            className="-ms-0.5 me-1.5 opacity-60"
            size={16}
            aria-hidden="true"
          />
          Packages
          <Badge className="ms-1.5">New</Badge>
        </TabsTrigger>
        <TabsTrigger
          value="tab-4"
          className="relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 hover:bg-background-tertiary hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary data-[state=active]:hover:bg-background-secondary"
        >
          <UsersRoundIcon
            className="-ms-0.5 me-1.5 opacity-60"
            size={16}
            aria-hidden="true"
          />
          Team
        </TabsTrigger>
        <TabsTrigger
          value="tab-5"
          className="relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 hover:bg-background-tertiary hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary data-[state=active]:hover:bg-background-secondary"
        >
          <ChartLine
            className="-ms-0.5 me-1.5 opacity-60"
            size={16}
            aria-hidden="true"
          />
          Insights
        </TabsTrigger>
        <TabsTrigger
          value="tab-6"
          className="relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 hover:bg-background-tertiary hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary data-[state=active]:hover:bg-background-secondary"
        >
          <SettingsIcon
            className="-ms-0.5 me-1.5 opacity-60"
            size={16}
            aria-hidden="true"
          />
          Settings
        </TabsTrigger>
      </TabsList>
      <TabsContent value="Overview">{/* <ProjectOverview /> */}</TabsContent>
      <TabsContent value="Board">
        <ClientKanbanBoard />
      </TabsContent>
      <TabsContent value="List">
        <div className="pr-6">
          <TasksTable tasks={project.tasks} />
        </div>
      </TabsContent>
      <TabsContent value="tab-3">
        <p className="pt-1 text-center text-xs text-muted-foreground">
          Content for Tab 3
        </p>
      </TabsContent>
      <TabsContent value="tab-4">
        <p className="pt-1 text-center text-xs text-muted-foreground">
          Content for Tab 4
        </p>
      </TabsContent>
      <TabsContent value="tab-5">
        <p className="pt-1 text-center text-xs text-muted-foreground">
          Content for Tab 5
        </p>
      </TabsContent>
      <TabsContent value="tab-6">
        <p className="pt-1 text-center text-xs text-muted-foreground">
          Content for Tab 6
        </p>
      </TabsContent>
    </Tabs>
  );
}
