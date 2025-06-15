import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';

const signInSchema = z.object({
  email: z.string().email({ message: 'Неверный формат email' }),
  password: z.string().min(6, { message: 'Пароль должен быть не менее 6 символов' }),
});

const signUpSchema = z.object({
  name: z.string().min(2, { message: 'Имя должно быть не менее 2 символов' }),
  email: z.string().email({ message: 'Неверный формат email' }),
  password: z.string().min(6, { message: 'Пароль должен быть не менее 6 символов' }),
});

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const signInForm = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: '', password: '' },
  });

  const signUpForm = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { name: '', email: '', password: '' },
  });

  const handleSignIn = async (values: z.infer<typeof signInSchema>) => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });
    if (error) {
      toast({ title: 'Ошибка входа', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Вход выполнен успешно', description: 'Добро пожаловать!' });
      navigate('/profile');
    }
    setLoading(false);
  };

  const handleSignUp = async (values: z.infer<typeof signUpSchema>) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: {
          name: values.name,
        },
      },
    });

    if (error) {
      toast({ title: 'Ошибка регистрации', description: error.message, variant: 'destructive' });
    } else if (data.user) {
        toast({ title: 'Регистрация почти завершена!', description: 'Пожалуйста, подтвердите ваш email.' });
        // The handle_new_user trigger will create the profile.
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-warm-gradient flex flex-col">
      <Header cartItemsCount={0} />
      <main className="flex-grow flex items-center justify-center container mx-auto px-4 py-8">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Личный кабинет</CardTitle>
            <CardDescription>Войдите или создайте аккаунт</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Вход</TabsTrigger>
                <TabsTrigger value="signup">Регистрация</TabsTrigger>
              </TabsList>
              <TabsContent value="signin">
                <Form {...signInForm}>
                  <form onSubmit={signInForm.handleSubmit(handleSignIn)} className="space-y-4 pt-4">
                    <FormField control={signInForm.control} name="email" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl><Input placeholder="you@example.com" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={signInForm.control} name="password" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Пароль</FormLabel>
                        <FormControl><Input type="password" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? 'Вход...' : 'Войти'}
                    </Button>
                  </form>
                </Form>
              </TabsContent>
              <TabsContent value="signup">
                <Form {...signUpForm}>
                  <form onSubmit={signUpForm.handleSubmit(handleSignUp)} className="space-y-4 pt-4">
                    <FormField control={signUpForm.control} name="name" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Имя</FormLabel>
                        <FormControl><Input placeholder="Анна Иванова" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={signUpForm.control} name="email" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl><Input placeholder="you@example.com" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={signUpForm.control} name="password" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Пароль</FormLabel>
                        <FormControl><Input type="password" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? 'Регистрация...' : 'Зарегистрироваться'}
                    </Button>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Auth;
