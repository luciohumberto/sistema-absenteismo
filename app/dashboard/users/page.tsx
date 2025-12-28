'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type UserRole = 'ADMIN' | 'MANAGER' | 'ANALYST' | 'VIEWER'

interface User {
  id: string
  name: string
  email: string
  role: UserRole
  department?: string
  status: 'active' | 'inactive'
  lastLogin?: Date
  createdAt: Date
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Administrador Sistema',
    email: 'admin@sistema.com',
    role: 'ADMIN',
    status: 'active',
    lastLogin: new Date('2024-01-20T09:30:00'),
    createdAt: new Date('2023-01-01')
  },
  {
    id: '2',
    name: 'Maria Silva',
    email: 'gestor@sistema.com',
    role: 'MANAGER',
    department: 'Recursos Humanos',
    status: 'active',
    lastLogin: new Date('2024-01-20T10:15:00'),
    createdAt: new Date('2023-03-15')
  },
  {
    id: '3',
    name: 'João Santos',
    email: 'analista@sistema.com',
    role: 'ANALYST',
    department: 'Gestão de Pessoas',
    status: 'active',
    lastLogin: new Date('2024-01-19T16:45:00'),
    createdAt: new Date('2023-06-10')
  },
  {
    id: '4',
    name: 'Ana Costa',
    email: 'viewer@sistema.com',
    role: 'VIEWER',
    department: 'Controladoria',
    status: 'active',
    lastLogin: new Date('2024-01-18T14:20:00'),
    createdAt: new Date('2023-09-22')
  },
  {
    id: '5',
    name: 'Pedro Oliveira',
    email: 'pedro.oliveira@sistema.com',
    role: 'ANALYST',
    department: 'Recursos Humanos',
    status: 'active',
    createdAt: new Date('2023-11-05')
  },
  {
    id: '6',
    name: 'Carla Mendes',
    email: 'carla.mendes@sistema.com',
    role: 'VIEWER',
    department: 'Saúde',
    status: 'inactive',
    lastLogin: new Date('2023-12-15T11:30:00'),
    createdAt: new Date('2023-07-18')
  }
]

const roleLabels: Record<UserRole, string> = {
  ADMIN: 'Administrador',
  MANAGER: 'Gestor',
  ANALYST: 'Analista',
  VIEWER: 'Visualizador'
}

const roleColors: Record<UserRole, string> = {
  ADMIN: 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300',
  MANAGER: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
  ANALYST: 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300',
  VIEWER: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState<UserRole | 'ALL'>('ALL')
  const [showModal, setShowModal] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesRole = filterRole === 'ALL' || user.role === filterRole

    return matchesSearch && matchesRole
  })

  const userStats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    byRole: {
      ADMIN: users.filter(u => u.role === 'ADMIN').length,
      MANAGER: users.filter(u => u.role === 'MANAGER').length,
      ANALYST: users.filter(u => u.role === 'ANALYST').length,
      VIEWER: users.filter(u => u.role === 'VIEWER').length
    }
  }

  const handleToggleStatus = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ))
  }

  const handleDeleteUser = (userId: string) => {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      setUsers(users.filter(user => user.id !== userId))
    }
  }

  const formatDate = (date?: Date) => {
    if (!date) return 'Nunca'
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Gerenciamento de Usuários</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie acessos e permissões do sistema
          </p>
        </div>
        
        <Button onClick={() => { setEditingUser(null); setShowModal(true); }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
          </svg>
          Novo Usuário
        </Button>
      </div>

      {/* Estatísticas */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.total}</div>
            <p className="text-xs text-muted-foreground">usuários cadastrados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{userStats.active}</div>
            <p className="text-xs text-muted-foreground">
              {((userStats.active / userStats.total) * 100).toFixed(0)}% do total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Admins</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.byRole.ADMIN}</div>
            <p className="text-xs text-muted-foreground">administradores</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gestores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.byRole.MANAGER}</div>
            <p className="text-xs text-muted-foreground">gestores</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Analistas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.byRole.ANALYST}</div>
            <p className="text-xs text-muted-foreground">analistas</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle>Usuários</CardTitle>
          <CardDescription>Lista de todos os usuários do sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Buscar por nome, email ou departamento..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={filterRole === 'ALL' ? 'default' : 'outline'}
                onClick={() => setFilterRole('ALL')}
                size="sm"
              >
                Todos
              </Button>
              <Button
                variant={filterRole === 'ADMIN' ? 'default' : 'outline'}
                onClick={() => setFilterRole('ADMIN')}
                size="sm"
              >
                Admins
              </Button>
              <Button
                variant={filterRole === 'MANAGER' ? 'default' : 'outline'}
                onClick={() => setFilterRole('MANAGER')}
                size="sm"
              >
                Gestores
              </Button>
              <Button
                variant={filterRole === 'ANALYST' ? 'default' : 'outline'}
                onClick={() => setFilterRole('ANALYST')}
                size="sm"
              >
                Analistas
              </Button>
            </div>
          </div>

          {/* Tabela de Usuários */}
          <div className="rounded-md border">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="h-12 px-4 text-left align-middle font-medium">Usuário</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Perfil</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Departamento</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Último Acesso</th>
                  <th className="h-12 px-4 text-right align-middle font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-muted/50">
                    <td className="p-4">
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${roleColors[user.role]}`}>
                        {roleLabels[user.role]}
                      </span>
                    </td>
                    <td className="p-4 text-sm">
                      {user.department || '-'}
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          user.status === 'active'
                            ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300'
                            : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                        }`}
                      >
                        {user.status === 'active' ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">
                      {formatDate(user.lastLogin)}
                    </td>
                    <td className="p-4">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => { setEditingUser(user); setShowModal(true); }}
                        >
                          Editar
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleStatus(user.id)}
                        >
                          {user.status === 'active' ? 'Desativar' : 'Ativar'}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          Excluir
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              Nenhum usuário encontrado com os filtros aplicados
            </div>
          )}
        </CardContent>
      </Card>

      {/* Informações de Permissões */}
      <Card>
        <CardHeader>
          <CardTitle>Níveis de Acesso</CardTitle>
          <CardDescription>Entenda as permissões de cada perfil</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-3 p-4 border rounded-lg">
              <div className="flex-shrink-0">
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${roleColors.ADMIN}`}>
                  {roleLabels.ADMIN}
                </span>
              </div>
              <div>
                <h4 className="font-medium mb-1">Administrador</h4>
                <p className="text-sm text-muted-foreground">
                  Acesso total: gerenciar usuários, upload de dados, configurações do sistema, 
                  visualizar todos os relatórios e dashboards
                </p>
              </div>
            </div>

            <div className="flex gap-3 p-4 border rounded-lg">
              <div className="flex-shrink-0">
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${roleColors.MANAGER}`}>
                  {roleLabels.MANAGER}
                </span>
              </div>
              <div>
                <h4 className="font-medium mb-1">Gestor</h4>
                <p className="text-sm text-muted-foreground">
                  Upload de dados, gerar relatórios, visualizar dashboards completos, 
                  exportar dados, usar assistente de IA
                </p>
              </div>
            </div>

            <div className="flex gap-3 p-4 border rounded-lg">
              <div className="flex-shrink-0">
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${roleColors.ANALYST}`}>
                  {roleLabels.ANALYST}
                </span>
              </div>
              <div>
                <h4 className="font-medium mb-1">Analista</h4>
                <p className="text-sm text-muted-foreground">
                  Visualizar dashboards, gerar relatórios básicos, usar assistente de IA, 
                  exportar visualizações
                </p>
              </div>
            </div>

            <div className="flex gap-3 p-4 border rounded-lg">
              <div className="flex-shrink-0">
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${roleColors.VIEWER}`}>
                  {roleLabels.VIEWER}
                </span>
              </div>
              <div>
                <h4 className="font-medium mb-1">Visualizador</h4>
                <p className="text-sm text-muted-foreground">
                  Apenas visualização: dashboards públicos, relatórios compartilhados, 
                  sem permissão para exportar ou modificar dados
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modal de Criação/Edição (simplified placeholder) */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>{editingUser ? 'Editar Usuário' : 'Novo Usuário'}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Funcionalidade de criação/edição será implementada com API completa
              </p>
              <Button onClick={() => setShowModal(false)} className="w-full">
                Fechar
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
