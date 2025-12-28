import { redirect } from 'next/navigation'

export default function Home() {
  // Redireciona para a página de login ou dashboard
  redirect('/auth/login')
}
