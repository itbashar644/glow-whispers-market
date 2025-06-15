
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const updatePasswordSchema = z.object({
  password: z.string().min(6, { message: 'Пароль должен быть не менее 6 символов' }),
});

const UpdatePassword = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { totalItems } = useCart();
  const [searchParams] = useSearchParams();
  const [canUpdatePassword, setCanUpdatePassword] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  const form = useForm<z.infer<typeof updatePasswordSchema>>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: { password: '' },
  });

  useEffect(() => {
    const checkSession = async () => {
      console.log("Checking session and recovery state...");
      
      // Проверяем URL параметры
      const accessToken = searchParams.get('access_token');
      const refreshToken = searchParams.get('refresh_token');
      const type = searchParams.get('type');
      
      console.log("URL params:", { accessToken: !!accessToken, refreshToken: !!refreshToken, type });
      
      if (type === 'recovery' && accessToken && refreshToken) {
        console.log("Recovery URL detected, setting session...");
        try {
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken
          });
          
          if (error) {
            console.error("Error setting session:", error);
            toast({ 
              title: 'Ошибка', 
              description: 'Ссылка недействительна или истекла', 
              variant: 'destructive' 
            });
            navigate('/auth');
            return;
          }
          
          console.log("Session set successfully");
          setCanUpdatePassword(true);
        } catch (error) {
          console.error("Exception setting session:", error);
          toast({ 
            title: 'Ошибка', 
            description: 'Ссылка недействительна или истекла', 
            variant: 'destructive' 
          });
          navigate('/auth');
        }
      } else {
        // Проверяем текущую сессию
        const { data: { session } } = await supabase.auth.getSession();
        console.log("Current session:", !!session);
        
        if (session) {
          setCanUpdatePassword(true);
        } else {
          toast({ 
            title: 'Ошибка', 
            description: 'Сессия не найдена. Запросите новую ссылку для сброса пароля.', 
            variant: 'destructive' 
          });
          navigate('/auth');
        }
      }
      
      setIsCheckingSession(false);
    };

    checkSession();
  }, [searchParams, navigate, toast]);

  const handleUpdatePassword = async (values: z.infer<typeof updatePasswordSchema>) => {
    setLoading(true);
    console.log("Updating password...");
    
    try {
      const { error } = await supabase.auth.updateUser({
        password: values.password,
      });
      
      if (error) {
        console.error("Error updating password:", error);
        toast({ title: 'Ошибка', description: error.message, variant: 'destructive' });
      } else {
        console.log("Password updated successfully");
        toast({ title: 'Пароль успешно обновлен!', description: 'Теперь вы можете войти с новым паролем.' });
        await supabase.auth.signOut();
        navigate('/auth');
      }
    } catch (error) {
      console.error("Exception updating password:", error);
      toast({ title: 'Ошибка', description: 'Произошла ошибка при обновлении пароля', variant: 'destructive' });
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-warm-gradient flex flex-col">
      <Header cartItemsCount={totalItems} />
      <main className="flex-grow flex items-center justify-center container mx-auto px-4 py-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Обновление пароля</CardTitle>
            <CardDescription>Введите ваш новый пароль.</CardDescription>
          </CardHeader>
          <CardContent>
            {isCheckingSession ? (
              <p className="text-center text-muted-foreground">Проверяем ссылку для сброса пароля...</p>
            ) : canUpdatePassword ? (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleUpdatePassword)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Новый пароль</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Обновление...' : 'Обновить пароль'}
                  </Button>
                </form>
              </Form>
            ) : (
              <div className="text-center">
                <p className="text-muted-foreground mb-4">
                  Ссылка недействительна или истекла.
                </p>
                <Button onClick={() => navigate('/auth')}>
                  Вернуться к авторизации
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default UpdatePassword;
