
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Package, Settings } from "lucide-react";
import { ProfileForm } from "./ProfileForm";
import { OrderHistory } from "./OrderHistory";
import { NotificationSettings } from "./NotificationSettings";

interface UserInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface Order {
  id: string;
  created_at: string;
  status: string;
  total: number;
  items: { name: string; price: number; quantity: number }[];
  order_number: number;
}

interface ProfileTabsProps {
  userInfo: UserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
  handleSaveProfile: () => void;
  isSaving: boolean;
  orders: Order[];
}

export const ProfileTabs = ({ userInfo, setUserInfo, handleSaveProfile, isSaving, orders }: ProfileTabsProps) => {
  return (
    <Tabs defaultValue="profile" className="space-y-6">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="profile" className="flex items-center gap-2">
          <User className="h-4 w-4" />Профиль
        </TabsTrigger>
        <TabsTrigger value="orders" className="flex items-center gap-2">
          <Package className="h-4 w-4" />Заказы
        </TabsTrigger>
        <TabsTrigger value="settings" className="flex items-center gap-2">
          <Settings className="h-4 w-4" />Настройки
        </TabsTrigger>
      </TabsList>

      <TabsContent value="profile">
        <ProfileForm 
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          handleSaveProfile={handleSaveProfile}
          isSaving={isSaving}
        />
      </TabsContent>

      <TabsContent value="orders">
        <OrderHistory orders={orders} />
      </TabsContent>

      <TabsContent value="settings">
        <NotificationSettings />
      </TabsContent>
    </Tabs>
  );
};
