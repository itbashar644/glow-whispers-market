
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface UserInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface ProfileFormProps {
  userInfo: UserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
  handleSaveProfile: () => void;
  isSaving: boolean;
}

export const ProfileForm = ({ userInfo, setUserInfo, handleSaveProfile, isSaving }: ProfileFormProps) => {
  return (
    <Card>
      <CardHeader><CardTitle>Личная информация</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Имя</Label>
            <Input 
              id="name" 
              value={userInfo.name} 
              onChange={(e) => setUserInfo(prev => ({ ...prev, name: e.target.value }))} 
              disabled={isSaving}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            type="email" 
            value={userInfo.email} 
            disabled 
            className="bg-muted"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Телефон</Label>
          <Input 
            id="phone" 
            value={userInfo.phone} 
            onChange={(e) => setUserInfo(prev => ({ ...prev, phone: e.target.value }))} 
            disabled={isSaving}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="address">Адрес</Label>
          <Input 
            id="address" 
            value={userInfo.address} 
            onChange={(e) => setUserInfo(prev => ({ ...prev, address: e.target.value }))} 
            disabled={isSaving}
          />
        </div>
        <Button 
          onClick={handleSaveProfile} 
          disabled={isSaving} 
          className="w-full md:w-auto"
        >
          {isSaving ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Сохранение...
            </>
          ) : (
            'Сохранить изменения'
          )}
        </Button>
      </CardContent>
    </Card>
  );
};
