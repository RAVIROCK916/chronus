"use client";

import Setting from "@/components/shared/setting";
import ThemeSelect from "@/components/shared/theme-select";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "@apollo/client";
import { GET_USER } from "@/lib/apollo/client/user";
import { UserContext, useUserContext } from "@/state/context";

const tabs = [
  { name: "Personal", href: "#personal" },
  { name: "Account", href: "#account" },
  { name: "Billing", href: "#billing" },
  { name: "Integrations", href: "#integrations" },
  { name: "Appearance", href: "#appearance" },
  { name: "Accessibility", href: "#accessibility" },
];

export default function SettingsPage() {
  const { data } = useQuery(GET_USER);
  return (
    <div className="-ml-8 -mt-4">
      <UserContext.Provider value={data?.currentUser}>
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
          <TabsContent value="Personal" className="px-10">
            <PersonalSettingsTab />
          </TabsContent>
          <TabsContent value="Account" className="px-10">
            <p className="p-4 text-center text-xs text-muted-foreground">
              Content for Tab 3
            </p>
          </TabsContent>
          <TabsContent value="Billing" className="px-10">
            <p className="p-4 text-center text-xs text-muted-foreground">
              Content for Tab 4
            </p>
          </TabsContent>
          <TabsContent value="Integrations" className="px-10">
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
      </UserContext.Provider>
    </div>
  );
}

function PersonalSettingsTab() {
  const user = useUserContext();
  return (
    <div>
      <Setting.Root>
        <Setting.Header>
          <Setting.Title>Profile Picture</Setting.Title>
          <Setting.Description>
            Update your profile picture.
          </Setting.Description>
        </Setting.Header>
        <Setting.Content>
          <Avatar className="h-24 w-24">
            <AvatarImage src={user.profile_picture} />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </Setting.Content>
      </Setting.Root>
      <Setting.Root>
        <Setting.Header>
          <Setting.Title>Profile</Setting.Title>
          <Setting.Description>
            Manage your profile information and settings.
          </Setting.Description>
        </Setting.Header>
        <Setting.Content>
          <div className="flex items-center gap-2">
            <div>
              <Label htmlFor="name" className="text-sm font-medium">
                Name
              </Label>
              <Setting.Input
                id="name"
                value={user.name}
                onBlur={() => console.log("blur")}
              />
            </div>
            <div className="flex flex-col">
              <div className="text-sm font-semibold">John Doe</div>
              <div className="text-xs text-muted-foreground">
                john@example.com
              </div>
            </div>
          </div>
        </Setting.Content>
      </Setting.Root>
      <Setting.Root>
        <Setting.Header>
          <Setting.Title>Profile</Setting.Title>
          <Setting.Description>
            Manage your profile information and settings.
          </Setting.Description>
        </Setting.Header>
        <Setting.Content>
          <div className="">
            <div className="flex flex-col">
              <div className="text-sm font-semibold">John Doe</div>
              <div className="text-xs text-muted-foreground">
                john@example.com
              </div>
            </div>
          </div>
        </Setting.Content>
      </Setting.Root>
    </div>
  );
}
