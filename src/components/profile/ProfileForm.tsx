
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

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
            <Input id="name" value={userInfo.name} onChange={(e) => setUserInfo(prev => ({ ...prev, name: e.target.value }))} />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={userInfo.email} disabled />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Телефон</Label>
          <Input id="phone" value={userInfo.phone} onChange={(e) => setUserInfo(prev => ({ ...prev, phone: e.target.value }))} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="address">Адрес</Label>
          <Input id="address" value={userInfo.address} onChange={(e) => setUserInfo(prev => ({ ...prev, address: e.target.value }))} />
        </div>
        <Button onClick={handleSaveProfile} disabled={isSaving} className="w-full md:w-auto">
          {isSaving ? 'Сохранение...' : 'Сохранить изменения'}
        </Button>
      </CardContent>
    </Card>
  );
};
