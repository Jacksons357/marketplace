'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { toast } from 'sonner'

const loginSchema = z.object({
  email: z.email('Deve ser um email válido'),
  password: z.string().min(1, 'A senha é obrigatória'),
})

type LoginFormData = z.infer<typeof loginSchema>


export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [generalError, setGeneralError] = useState<string | null>(
    searchParams.get('error') ? 'Email ou senha inválidos. Por favor, tente novamente.' : null
  )
  const [loading, setLoading] = useState(false)
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setGeneralError(null)
    setLoading(true)

    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      if (result?.error) {
        toast.error('Email ou senha inválidos.')
        return
      }
      toast.success('Login realizado com sucesso!')

      router.push(callbackUrl)
      router.refresh()
    } catch (error) {
      console.error('Login error:', error)
      setGeneralError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-[400px] p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800">Login</h1>
        
        {generalError && (
          <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
            {generalError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Input
              {...register('email')}
              id="email"
              required
              disabled={loading}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <Input
              {...register('password')}
              id="password"
              type='password'
              
              required
              disabled={loading}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={loading}
            className='w-full'
          >
            {loading ? <Spinner /> : 'Entrar'}
          </Button>

          <div>
            <p className="text-sm text-gray-600">
              Não tem uma conta?{' '}
              <Link href={`/auth/user/register?callbackUrl=${callbackUrl}`} className="text-primary font-medium hover:underline">
                Cadastrar
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}