'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { BMTable } from './_components/BMTable';
import { BMAccount } from '@/lib/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { BMForm } from './_components/BMForm';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import useSWR from 'swr';

const fetcher = (url: string) => {
  const token = localStorage.getItem("token");
  return fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }).then(res => res.json());
};

export default function AdminPage() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [editingAccount, setEditingAccount] = useState<BMAccount | null>(null);

  const { mutate } = useSWR<BMAccount[]>('/api/bm', fetcher);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      // Limpar localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      
      toast({
        title: 'Logged out',
        description: 'You have been successfully logged out.',
      });
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: 'Error',
        description: 'An unexpected error occurred during logout.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateBM = async (data: Omit<BMAccount, 'id' | 'createdAt' | 'updatedAt'>) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast({
          title: 'Error',
          description: 'Token não encontrado. Faça login novamente.',
          variant: 'destructive',
        });
        router.push('/admin/login');
        return;
      }

      const response = await fetch('/api/bm', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create BM account');
      toast({
        title: 'Success',
        description: 'BM Account created successfully.',
      });
      mutate();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create BM Account.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditBM = async (data: Omit<BMAccount, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!editingAccount) return;
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast({
          title: 'Error',
          description: 'Token não encontrado. Faça login novamente.',
          variant: 'destructive',
        });
        router.push('/admin/login');
        return;
      }

      const response = await fetch(`/api/bm/${editingAccount.id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to update BM account');
      toast({
        title: 'Success',
        description: 'BM Account updated successfully.',
      });
      setEditingAccount(null);
      mutate();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update BM Account.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteBM = async (id: string) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast({
          title: 'Error',
          description: 'Token não encontrado. Faça login novamente.',
          variant: 'destructive',
        });
        router.push('/admin/login');
        return;
      }

      const response = await fetch(`/api/bm/${id}`, {
        method: 'DELETE',
        headers: { 
          'Authorization': `Bearer ${token}`
        },
      });
      if (!response.ok) throw new Error('Failed to delete BM account');
      toast({
        title: 'Success',
        description: 'BM Account deleted successfully.',
      });
      mutate();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete BM Account.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProtectedRoute requireAdmin={true} redirectTo="/admin/login">
      <div className="min-h-screen p-8" style={{ backgroundColor: '#010B18' }}>
        <div className="max-w-7xl mx-auto pt-24">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-semibold text-white/95">Admin Dashboard</h1>
            <Button
              variant="outline"
              className="border-white/20 text-white/90 hover:bg-white/5 hover:border-white/30"
              onClick={handleLogout}
              disabled={isLoading}
            >
              {isLoading ? 'Logging out...' : 'Logout'}
            </Button>
          </div>

          <BMTable
            onEdit={setEditingAccount}
            onDelete={handleDeleteBM}
            onCreate={handleCreateBM}
            isLoading={isLoading}
          />

          <Dialog open={!!editingAccount} onOpenChange={() => setEditingAccount(null)}>
            <DialogContent className="bg-black/90 border-white/10 text-white max-w-2xl backdrop-blur-xl rounded-3xl">
              <DialogHeader>
                <DialogTitle className="text-xl font-medium text-white/95">Edit BM Account</DialogTitle>
              </DialogHeader>
              <BMForm initialData={editingAccount || undefined} onSubmit={handleEditBM} isLoading={isLoading} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </ProtectedRoute>
  );
}