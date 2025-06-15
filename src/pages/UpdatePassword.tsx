
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
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
import { Session } from '@supabase/supabase-js';

const updatePasswordSchema = z.object({
  password: z.string().min(6, { message: 'Пароль должен быть не менее 6 символов' }),
});

const UpdatePassword = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { totalItems } = useCart();
  const [session, setSession] = useState<Session | null>(null);

  const form = useForm<z.infer<typeof updatePasswordSchema>>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: { password: '' },
  });

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        setSession(session);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleUpdatePassword = async (values: z.infer<typeof updatePasswordSchema>) => {
    setLoading(true);
    const { error } = await supabase.auth.updateUser({
      password: values.password,
    });
    setLoading(false);
    if (error) {
      toast({ title: 'Ошибка', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Пароль успешно обновлен!', description: 'Теперь вы можете войти с новым паролем.' });
      await supabase.auth.signOut();
      navigate('/auth');
    }
  };

  return (
    <div className="min-h-screen bg-warm-gradient flex flex-col">
      <Header cartItemsCount={totalItems} />
      <main className="flex-grow flex items-center justify-center container mx-auto px-4 py-8">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Обновление пароля</CardTitle>
            <CardDescription>Введите ваш новый пароль.</CardDescription>
          </CardHeader>
          <CardContent>
            {session ? (
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
              <p className="text-center text-muted-foreground">Пожалуйста, подождите. Проверяем вашу ссылку для сброса пароля...</p>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default UpdatePassword;
