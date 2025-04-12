import ThemeSelect from "@/components/shared/theme-select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const tabs = [
  { name: "Personal", href: "#personal" },
  { name: "Account", href: "#account" },
  { name: "Billing", href: "#billing" },
  { name: "Integrations", href: "#integrations" },
  { name: "Appearance", href: "#appearance" },
  { name: "Accessibility", href: "#accessibility" },
];

export default function SettingsPage() {
  return (
    <div className="-ml-8 -mt-4">
      <Tabs defaultValue="Personal" className="items-center bg-transparent">
        <div className="space-y-8">
          <div className="px-10 pt-10">
            <h1 className="text-4xl">Settings</h1>
          </div>
          <TabsList className="h-auto w-full justify-start gap-4 rounded-none border-b bg-transparent py-1 pl-10 pr-0 text-foreground">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.name}
                value={tab.name}
                className="relative font-normal text-text-tertiary after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
              >
                {tab.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <TabsContent value="Personal" className="p-10">
          <p className="p-4 text-center text-xs text-muted-foreground">
            Content for Tab 2
          </p>
        </TabsContent>
        <TabsContent value="Account" className="p-10">
          <p className="p-4 text-center text-xs text-muted-foreground">
            Content for Tab 3
          </p>
        </TabsContent>
        <TabsContent value="Billing" className="p-10">
          <p className="p-4 text-center text-xs text-muted-foreground">
            Content for Tab 4
          </p>
        </TabsContent>
        <TabsContent value="Integrations" className="p-10">
          <p className="p-4 text-center text-xs text-muted-foreground">
            Content for Tab 5
          </p>
        </TabsContent>
        <TabsContent value="Appearance" className="p-10">
          <ThemeSelect />
        </TabsContent>
        <TabsContent value="Accessibility" className="p-10">
          <p className="p-4 text-center text-xs text-muted-foreground">
            Content for Tab 7
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
