'use client';

import { useState, useMemo } from 'react';
import { BMAccount } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Trash2, Edit, PlusCircle, Search } from 'lucide-react';
import { BMForm } from './BMForm';
import { useToast } from '@/components/ui/use-toast';
import useSWR from 'swr';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  return Array.isArray(data) ? data : data?.items ?? []; // aceita paginado
};

// Prisma enum -> label humano
const statusMap: Record<string, string> = {
  ONE_10K: '1-10k',
  TENK_30K: '10k-30k',
  THIRTYK_70K: '30k-70k',
  SEVENTYK_100K: '70k-100k',
  HUNDREDK_500K: '100k-500k',
  FIVEHUNDREDK_PLUS: '500k+',
};
// Também aceita já vir como label humano; função util
function toStatusLabel(v: string) {
  return statusMap[v] ?? v;
}

interface BMTableProps {
  onEdit: (account: BMAccount) => void;
  onDelete: (id: string) => void;
  onCreate: (data: Omit<BMAccount, 'id' | 'createdAt' | 'updatedAt'>) => void;
  isLoading: boolean;
}

export function BMTable({ onEdit, onDelete, onCreate, isLoading }: BMTableProps) {
  const { data: bmAccounts = [], error, isLoading: isSWRLoading, mutate } = useSWR<BMAccount[]>('/api/bm', fetcher);
  const { toast } = useToast();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const statusOptions = ['all', '1-10k', '10k-30k', '30k-70k', '70k-100k', '100k-500k', '500k+'];

  const filteredAccounts = useMemo(() => {
    let items = bmAccounts;

    // busca por título
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      items = items.filter((a) => a.title.toLowerCase().includes(q));
    }

    // filtro por status (com label)
    if (filterStatus !== 'all') {
      items = items.filter((a) => toStatusLabel((a as any).status) === filterStatus);
    }

    return items;
  }, [bmAccounts, filterStatus, searchTerm]);

  const handleCreateSubmit = async (data: Omit<BMAccount, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      await onCreate(data);
      toast({ title: 'Success', description: 'BM Account created successfully.' });
      setIsCreateModalOpen(false);
      mutate(); // revalida
    } catch {
      toast({ title: 'Error', description: 'Failed to create BM Account.', variant: 'destructive' });
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirmId) return;
    try {
      await onDelete(deleteConfirmId);
      toast({ title: 'Success', description: 'BM Account deleted successfully.' });
      mutate();
    } catch {
      toast({ title: 'Error', description: 'Failed to delete BM Account.', variant: 'destructive' });
    } finally {
      setDeleteConfirmId(null);
    }
  };

  if (error) return <div className="text-red-500">Failed to load BM accounts.</div>;
  if (isSWRLoading) return <div className="text-white/60">Loading accounts...</div>;

  return (
    <Card className="bg-white/[0.02] border border-white/[0.05] rounded-2xl backdrop-blur-sm shadow-card text-white">
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-semibold text-white/95">BM Accounts</CardTitle>

          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-green-500 hover:bg-green-600 text-white rounded-xl flex items-center gap-2">
                <PlusCircle className="h-4 w-4" /> New BM
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-black/90 border-white/10 text-white max-w-2xl backdrop-blur-xl rounded-3xl">
              <DialogHeader>
                <DialogTitle className="text-xl font-medium text-white/95">Create New BM Account</DialogTitle>
              </DialogHeader>
              <BMForm onSubmit={handleCreateSubmit} isLoading={isLoading} />
            </DialogContent>
          </Dialog>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-white/[0.02] border border-white/[0.05] rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Accounts</CardTitle>
            </CardHeader>
            <CardContent><div className="text-2xl font-bold">{bmAccounts?.length || 0}</div></CardContent>
          </Card>
          <Card className="bg-white/[0.02] border border-white/[0.05] rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Meta Accounts</CardTitle>
            </CardHeader>
            <CardContent><div className="text-2xl font-bold">{bmAccounts?.filter(acc => acc.platform === 'meta').length || 0}</div></CardContent>
          </Card>
          <Card className="bg-white/[0.02] border border-white/[0.05] rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Google Accounts</CardTitle>
            </CardHeader>
            <CardContent><div className="text-2xl font-bold">{bmAccounts?.filter(acc => acc.platform === 'google').length || 0}</div></CardContent>
          </Card>
          <Card className="bg-white/[0.02] border border-white/[0.05] rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Sold Accounts</CardTitle>
            </CardHeader>
            <CardContent><div className="text-2xl font-bold">{bmAccounts?.filter(acc => acc.saleStatus === 'sold').length || 0}</div></CardContent>
          </Card>
        </div>
      </CardHeader>

      <CardContent>
        {/* Filtros */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/60" />
            <Input
              placeholder="Search by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-white/[0.02] border-white/[0.08] focus:ring-2 focus:ring-violet-500/50 text-white"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {statusOptions.map((status) => (
              <Badge
                key={status}
                variant={filterStatus === status ? 'default' : 'outline'}
                className={`cursor-pointer rounded-full border px-3 py-1 text-xs whitespace-nowrap ${filterStatus === status
                  ? 'bg-white/10 border-white/20 text-white'
                  : 'border-white/10 text-white/80 hover:bg-white/[0.05]'
                  }`}
                onClick={() => setFilterStatus(status)}
              >
                {status === 'all' ? 'All Statuses' : status}
              </Badge>
            ))}
          </div>
        </div>

        {/* Tabela */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="border-b border-white/[0.05]">
                <th className="px-4 py-2 text-left text-white/60 text-sm font-medium">Title</th>
                <th className="px-4 py-2 text-left text-white/60 text-sm font-medium">Price</th>
                <th className="px-4 py-2 text-left text-white/60 text-sm font-medium">Status (range)</th>
                <th className="px-4 py-2 text-left text-white/60 text-sm font-medium">Platform</th>
                <th className="px-4 py-2 text-left text-white/60 text-sm font-medium">Sale Status</th>
                <th className="px-4 py-2 text-left text-white/60 text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAccounts.map((account) => (
                <tr key={account.id} className="border-b border-white/[0.02] hover:bg-white/[0.01] transition-colors duration-200">
                  <td className="px-4 py-3 text-white/90 text-sm font-medium">{account.title}</td>
                  <td className="px-4 py-3 text-white/80 text-sm">
                    {account.priceBRL.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </td>
                  <td className="px-4 py-3">
                    <Badge className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/80">
                      {toStatusLabel((account as any).status)}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Badge className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/80">
                      {account.platform}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      className={`rounded-full border px-3 py-1 text-xs ${account.saleStatus === 'sold'
                        ? 'bg-red-500/20 border-red-500/30 text-red-300'
                        : 'bg-green-500/20 border-green-500/30 text-green-300'
                        }`}
                    >
                      {account.saleStatus === 'sold' ? 'Sold' : 'Available'}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-white/20 text-white/90 hover:bg-white/5 hover:border-white/30"
                      onClick={() => onEdit(account)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-white/20 text-white/90 hover:bg-white/5 hover:border-white/30"
                      onClick={() => setDeleteConfirmId(account.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </td>
                </tr>
              ))}

              {filteredAccounts.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-white/60">
                    No BM accounts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Delete Confirmation Dialog */}
        <Dialog open={!!deleteConfirmId} onOpenChange={() => setDeleteConfirmId(null)}>
          <DialogContent className="bg-black/90 border-white/10 text-white max-w-md backdrop-blur-xl rounded-3xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-medium text-white/95">Confirm Deletion</DialogTitle>
            </DialogHeader>
            <div className="py-4 text-white/80">Are you sure you want to delete this BM account?</div>
            <DialogFooter>
              <Button
                variant="outline"
                className="border-white/20 text-white/90 hover:bg-white/5 hover:border-white/30"
                onClick={() => setDeleteConfirmId(null)}
              >
                Cancel
              </Button>
              <Button
                className="bg-red-500 hover:bg-red-600 text-white rounded-xl"
                onClick={handleDeleteConfirm}
                disabled={isLoading}
              >
                {isLoading ? 'Deleting...' : 'Delete'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
