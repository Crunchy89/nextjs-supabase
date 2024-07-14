"use client"
import { useEffect } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '@/services/supabase'
import { useDispatch } from 'react-redux'
import { setAuthState } from '@/redux/lib/authSlice'
import { useAppSelector } from "@/redux/index";
import { useRouter } from 'next/navigation'

const page = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const isLoggedIn = useAppSelector((state) =>state.auth.isLoggedIn)
    if (isLoggedIn) {
      router.push('/')
    }

    useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        dispatch(setAuthState(true))
      })

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        if(session){
            dispatch(setAuthState(true))
        }else{
            dispatch(setAuthState(false))
        }
      })
      return () => subscription.unsubscribe()
    }, [])

    if (!isLoggedIn) {
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