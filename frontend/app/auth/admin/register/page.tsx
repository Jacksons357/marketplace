'use client'
import { z } from 'zod'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import Link from 'next/link'
import { Spinner } from '@/components/ui/spinner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PhoneInput } from '@/components/ui/phone-input'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'

const registerSchema = z.object({
  name: z.string().min(3, 'Deve ter pelo menos 3 caracteres'),
  organizationName: z.string().min(3, 'Deve ter pelo menos 3 caracteres'),
  organizationDescription: z.string().min(3, 'Deve ter pelo menos 3 caracteres'),
  email: z.email('Email inválido'),
  phone: z.string()
    .min(14, 'Telefone deve ter pelo menos 10 dígitos')
    .transform((val) => val.replace(/\D/g, '')),
  password: z.string().min(6, 'Deve ter pelo menos 6 caracteres'),
})

type RegisterFormData = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [generalError, setGeneralError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true)
    setGeneralError('')

    try {
      const response = await fetch('/api/auth/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || 'Registration failed')
      }

      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      if (result?.error) {
        toast.error('Erro ao registrar.')
        return
      }
      toast.success('Registro realizado com sucesso!')

      router.push('/')
      router.refresh()
    } catch (error) {
      setGeneralError(error instanceof Error ? error.message : 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-[400px] p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Criar Conta</h1>
          <p className="mt-2 text-sm text-gray-600">
            Já tem uma conta?{' '}
            <Link href="/auth/user/login" className="text-primary hover:underline">
              Entrar
            </Link>
          </p>
        </div>

        {generalError && (
          <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
            {generalError}
          </div>
        )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Nome
          </label>
          <Input
            id="name"
            {...register('name')}
            placeholder="Maria José"
            required
            disabled={loading}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <Input
            id="email"
            {...register('email')}
            placeholder="maria.jose@example.com"
            required
            disabled={loading}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Telefone
          </label>
          <PhoneInput
            register={register}
            name="phone"
            error={errors.phone?.message}
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Senha
          </label>
          <Input
            type="password"
            id="password"
            placeholder="Mínimo 6 caracteres"
            {...register('password')}
            required
            disabled={loading}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <h3 className="text-lg font-semibold text-gray-700 mb-2">Organização</h3>

        <div>
          <label htmlFor="organizationName" className="block text-sm font-medium text-gray-700">
            Nome
          </label>
          <Input
            id="organizationName"
            {...register('organizationName')}
            placeholder="Nome da Organização"
            required
            disabled={loading}
          />
          {errors.organizationName && (
            <p className="mt-1 text-sm text-red-500">{errors.organizationName.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="organizationDescription" className="block text-sm font-medium text-gray-700">
            Descrição
          </label>
          <Input
            id="organizationDescription"
            {...register('organizationDescription')}
            placeholder="Descrição da Organização"
            required
            disabled={loading}
          />
          {errors.organizationDescription && (
            <p className="mt-1 text-sm text-red-500">{errors.organizationDescription.message}</p>
          )}
        </div>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? <Spinner /> : 'Criar Conta'}
        </Button>
      </form>

      </div>
    </div>
  )
}