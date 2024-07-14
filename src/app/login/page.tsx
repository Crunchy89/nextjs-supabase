"use client"
import { useState, useEffect } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '@/services/supabase'
import { Session } from '@supabase/supabase-js';

const page = () => {
    const [session, setSession] = useState<Session|null>(null)

    useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
      })

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      })

      return () => subscription.unsubscribe()
    }, [])

    if (!session) {
      return (
        <div className='container p-5 mx-auto'>
            <div className="flex items-center justify-center border shadow-m rounded-md w-full h-screen">
            <Auth supabaseClient={supabase} redirectTo='/' providers={['github','google']} appearance={{ theme: ThemeSupa }} />
            </div>
        </div>
    )
    }
    else {
      return (<div>Logged in!</div>)
    }
};

export default page;