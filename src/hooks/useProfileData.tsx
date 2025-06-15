import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@/pages/Index";

type OrderItem = {
  name: string;
  price: number;
  quantity: number;
}

type Order = {
  id: string;
  created_at: string;
  status: string;
  total: number;
  items: OrderItem[];
  order_number: number;
};

export const useProfileData = () => {
  const { toast } = useToast();
  const { user, profile, setProfile } = useAuth();

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  const [orders, setOrders] = useState<Order[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  // All products data for search functionality
  const allProducts: Product[] = [
    {
      id: 1,
      name: "Лавандовые Сны",
      price: 2800,
      originalPrice: 3200,
      image: "https://images.unsplash.com/photo-1602874801006-2b21dc4fcc48?w=400&h=500&fit=crop",
      category: "Ароматические",
      rating: 4.8,
      reviews: 124,
      scent: "Лаванда и ваниль",
      burnTime: "45-50 часов",
      description: "Успокаивающая свеча с натуральной лавандой для идеального расслабления.",
      isOnSale: true
    },
    {
      id: 2,
      name: "Цитрусовая Свежесть",
      price: 3100,
      image: "https://images.unsplash.com/photo-1615887023516-0e3d60982f11?w=400&h=500&fit=crop",
      category: "Цитрусовые",
      rating: 4.9,
      reviews: 89,
      scent: "Лимон и грейпфрут",
      burnTime: "40-45 часов",
      description: "Бодрящий аромат цитрусовых для энергии и хорошего настроения.",
      isNew: true
    },
    {
      id: 3,
      name: "Древесные Нотки",
      price: 3500,
      image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=500&fit=crop",
      category: "Древесные",
      rating: 4.7,
      reviews: 156,
      scent: "Сандал и кедр",
      burnTime: "50-55 часов",
      description: "Теплый древесный аромат создает атмосферу уюта и комфорта.",
      isNew: true
    },
    {
      id: 4,
      name: "Морской Бриз",
      price: 2900,
      image: "https://images.unsplash.com/photo-1544705259-d3d395b8bdc3?w=400&h=500&fit=crop",
      category: "Свежие",
      rating: 4.6,
      reviews: 67,
      scent: "Морская соль",
      burnTime: "42-48 часов",
      description: "Освежающий аромат океана для создания летнего настроения."
    },
    {
      id: 5,
      name: "Розовый Сад",
      price: 3300,
      originalPrice: 3800,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop",
      category: "Цветочные",
      rating: 4.9,
      reviews: 203,
      scent: "Роза и пион",
      burnTime: "48-52 часов",
      description: "Нежный цветочный аромат для романтической атмосферы.",
      isOnSale: true
    },
    {
      id: 6,
      name: "Пряные Специи",
      price: 2700,
      image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=500&fit=crop",
      category: "Пряные",
      rating: 4.5,
      reviews: 92,
      scent: "Корица и гвоздика",
      burnTime: "38-44 часов",
      description: "Согревающий пряный аромат для холодных вечеров."
    }
  ];

  useEffect(() => {
    if (user && profile) {
      setUserInfo({
        name: profile.name || "",
        email: user.email || "",
        phone: profile.phone || "",
        address: profile.address || "",
      });
    } else if (user) {
      setUserInfo(prev => ({ ...prev, email: user.email || '' }));
    }

    if (user) {
      supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .then(({ data }) => {
          if (data) {
            setOrders(data as unknown as Order[]);
          }
        });
    }
  }, [user, profile]);

  const handleSaveProfile = async () => {
    if (!user) return;
    
    setIsSaving(true);
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({
          name: userInfo.name,
          phone: userInfo.phone,
          address: userInfo.address,
        })
        .eq('id', user.id)
        .select()
        .single();

      if (error) {
        console.error('Profile update error:', error);
        toast({ 
          title: "Ошибка", 
          description: "Не удалось сохранить данные. Попробуйте еще раз.", 
          variant: "destructive" 
        });
      } else {
        if (data) setProfile(data);
        toast({ 
          title: "Успешно!", 
          description: "Ваши данные успешно сохранены",
          duration: 3000
        });
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({ 
        title: "Ошибка", 
        description: "Произошла непредвиденная ошибка", 
        variant: "destructive" 
      });
    } finally {
      setIsSaving(false);
    }
  };

  return {
    userInfo,
    setUserInfo,
    orders,
    isSaving,
    handleSaveProfile,
    allProducts
  };
};
