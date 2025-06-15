
import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { ProfileSkeleton } from "@/components/profile/ProfileSkeleton";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileTabs } from "@/components/profile/ProfileTabs";
import { SignOutButton } from "@/components/profile/SignOutButton";
import { useProfileData } from "@/hooks/useProfileData";

const Profile = () => {
  const { user, loading } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const { userInfo, setUserInfo, orders, isSaving, handleSaveProfile, allProducts } = useProfileData();

  // Redirect to auth if not logged in
  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  const handleSignOut = async () => {
    try {
      // Clear localStorage
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
          localStorage.removeItem(key);
        }
      });
      
      // Sign out from Supabase
      await supabase.auth.signOut({ scope: 'global' });
      
      // Navigate to home page
      window.location.href = '/';
    } catch (error) {
      console.error('Error signing out:', error);
      // Force navigation even if signOut fails
      window.location.href = '/';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-warm-gradient">
        <Header cartItemsCount={totalItems} products={[]} />
        <ProfileSkeleton />
        <Footer />
      </div>
    );
  }

  // If not authenticated, don't render profile content
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-warm-gradient">
      <Header cartItemsCount={totalItems} products={allProducts} />
      
      <div className="container mx-auto px-4 py-8">
        <ProfileHeader userName={userInfo.name} />

        <ProfileTabs
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          handleSaveProfile={handleSaveProfile}
          isSaving={isSaving}
          orders={orders}
        />

        <SignOutButton onSignOut={handleSignOut} />
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
