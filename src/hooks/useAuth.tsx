
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';

type Profile = Database['public']['Tables']['profiles']['Row'];

export const useAuth = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error fetching session:', error);
          setLoading(false);
          return;
        }

        if (mounted) {
          setSession(session);
          setUser(session?.user ?? null);
          
          if (session?.user) {
            const { data: profileData } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();
            
            if (mounted) {
              setProfile(profileData);
            }
          }
          setLoading(false);
        }
      } catch (error) {
        console.error('Error in fetchInitialSession:', error);
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchInitialSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session);
      
      if (mounted) {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user && event !== 'SIGNED_OUT') {
          // Defer profile fetching to prevent potential deadlocks
          setTimeout(async () => {
            if (mounted) {
              const { data: profileData } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single();
              
              if (mounted) {
                setProfile(profileData);
              }
            }
          }, 0);
        } else {
          setProfile(null);
        }
        
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    try {
      // Clear localStorage
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
          localStorage.removeItem(key);
        }
      });
      
      // Sign out from Supabase
      await supabase.auth.signOut({ scope: 'global' });
      
      // Clear state
      setSession(null);
      setUser(null);
      setProfile(null);
    } catch (error) {
      console.error('Error in signOut:', error);
      // Clear state even if signOut fails
      setSession(null);
      setUser(null);
      setProfile(null);
    }
  };

  return { session, user, profile, loading, signOut, setProfile };
};
