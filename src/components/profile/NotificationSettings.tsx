
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const NotificationSettings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    promotionalEmails: true
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleToggle = async (setting: keyof typeof settings) => {
    setIsSaving(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
    
    setIsSaving(false);
    
    toast({
      title: "Настройки обновлены",
      description: "Ваши настройки уведомлений успешно сохранены"
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Настройки уведомлений</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Email уведомления</h4>
            <p className="text-sm text-muted-foreground">
              Получать уведомления о статусе заказов
            </p>
          </div>
          <Switch
            checked={settings.emailNotifications}
            onCheckedChange={() => handleToggle('emailNotifications')}
            disabled={isSaving}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">SMS уведомления</h4>
            <p className="text-sm text-muted-foreground">
              Получать SMS о доставке заказов
            </p>
          </div>
          <Switch
            checked={settings.smsNotifications}
            onCheckedChange={() => handleToggle('smsNotifications')}
            disabled={isSaving}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Рекламные рассылки</h4>
            <p className="text-sm text-muted-foreground">
              Получать информацию о скидках и новинках
            </p>
          </div>
          <Switch
            checked={settings.promotionalEmails}
            onCheckedChange={() => handleToggle('promotionalEmails')}
            disabled={isSaving}
          />
        </div>
      </CardContent>
    </Card>
  );
};
