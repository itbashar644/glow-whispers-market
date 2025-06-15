
interface ProfileHeaderProps {
  userName: string;
}

export const ProfileHeader = ({ userName }: ProfileHeaderProps) => {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-playfair font-bold text-primary mb-2 text-center md:text-left">
        Личный кабинет
      </h1>
      <p className="text-muted-foreground text-center md:text-left">
        Добро пожаловать, {userName || 'Гость'}!
      </p>
    </div>
  );
};
