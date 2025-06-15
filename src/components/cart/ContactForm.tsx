
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ContactInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  comment: string;
}

interface ContactFormProps {
  contactInfo: ContactInfo;
  onContactChange: (field: keyof ContactInfo, value: string) => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({ contactInfo, onContactChange }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Контактная информация</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">Имя *</Label>
            <Input
              id="firstName"
              value={contactInfo.firstName}
              onChange={(e) => onContactChange('firstName', e.target.value)}
              placeholder="Введите имя"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Фамилия *</Label>
            <Input
              id="lastName"
              value={contactInfo.lastName}
              onChange={(e) => onContactChange('lastName', e.target.value)}
              placeholder="Введите фамилию"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={contactInfo.email}
            onChange={(e) => onContactChange('email', e.target.value)}
            placeholder="Введите email"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Телефон *</Label>
          <Input
            id="phone"
            value={contactInfo.phone}
            onChange={(e) => onContactChange('phone', e.target.value)}
            placeholder="Введите номер телефона"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="address">Адрес доставки *</Label>
          <Textarea
            id="address"
            value={contactInfo.address}
            onChange={(e) => onContactChange('address', e.target.value)}
            placeholder="Введите полный адрес доставки"
            rows={3}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="comment">Комментарий к заказу</Label>
          <Textarea
            id="comment"
            value={contactInfo.comment}
            onChange={(e) => onContactChange('comment', e.target.value)}
            placeholder="Дополнительные пожелания или комментарии"
            rows={3}
          />
        </div>
        
        <p className="text-sm text-muted-foreground">
          * Обязательные поля для заполнения
        </p>
      </CardContent>
    </Card>
  );
};
