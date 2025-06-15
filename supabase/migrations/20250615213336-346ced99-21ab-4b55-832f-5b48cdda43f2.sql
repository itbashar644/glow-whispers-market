
-- Включаем Row Level Security для таблицы профилей
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Политика: Пользователи могут просматривать свой собственный профиль.
CREATE POLICY "Users can view their own profile"
ON public.profiles FOR SELECT
USING (auth.uid() = id);

-- Политика: Пользователи могут обновлять свой собственный профиль.
CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = id);
