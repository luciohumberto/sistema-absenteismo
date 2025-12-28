import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

export function formatDateTime(date: Date | string): string {
  return new Date(date).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('pt-BR').format(num)
}

export function formatPercent(value: number, total: number): string {
  if (total === 0) return '0%'
  return ((value / total) * 100).toFixed(1) + '%'
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}

export function calculateAge(birthDate: Date): number {
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
}

export function getAgeGroup(age: number): string {
  if (age < 20) return '< 20'
  if (age < 30) return '20-29'
  if (age < 40) return '30-39'
  if (age < 50) return '40-49'
  if (age < 60) return '50-59'
  return '60+'
}

export function getDayOfWeek(date: Date): string {
  const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
  return days[date.getDay()]
}

export function isMonday(date: Date): boolean {
  return date.getDay() === 1
}

export function getCIDChapter(cid: string): string {
  return cid.charAt(0).toUpperCase()
}

export function getCIDGroup(cid: string): string {
  const match = cid.match(/^[A-Z]\d{2}/)
  return match ? match[0] : ''
}

export function getDiseaseCategory(cidChapter: string): string {
  const categories: Record<string, string> = {
    'A': 'Infecciosas e Parasitárias',
    'B': 'Infecciosas e Parasitárias',
    'C': 'Neoplasias',
    'D': 'Doenças do Sangue',
    'E': 'Doenças Endócrinas',
    'F': 'Transtornos Mentais',
    'G': 'Doenças do Sistema Nervoso',
    'H': 'Doenças dos Olhos e Ouvidos',
    'I': 'Doenças do Aparelho Circulatório',
    'J': 'Doenças do Aparelho Respiratório',
    'K': 'Doenças do Aparelho Digestivo',
    'L': 'Doenças da Pele',
    'M': 'Doenças Musculoesqueléticas',
    'N': 'Doenças do Aparelho Geniturinário',
    'O': 'Gravidez e Parto',
    'P': 'Afecções Perinatais',
    'Q': 'Malformações Congênitas',
    'R': 'Sintomas e Sinais Anormais',
    'S': 'Lesões e Envenenamentos',
    'T': 'Lesões e Envenenamentos',
    'V': 'Causas Externas',
    'W': 'Causas Externas',
    'X': 'Causas Externas',
    'Y': 'Causas Externas',
    'Z': 'Fatores que Influenciam o Estado de Saúde',
  }
  return categories[cidChapter] || 'Outros'
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}
