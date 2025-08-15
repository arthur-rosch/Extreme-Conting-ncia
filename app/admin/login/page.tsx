'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log('Login successful:', responseData);
        
        // Salvar token no localStorage
        localStorage.setItem("token", responseData.token);
        localStorage.setItem("user", JSON.stringify(responseData.user));

        toast({
          title: 'Login realizado com sucesso',
          description: 'Redirecionando para o painel administrativo.',
        });
        
        console.log('Redirecting to /admin...');
        
        console.log('Redirecting to /admin...');
        router.push('/admin');
      } else {
        toast({
          title: 'Falha no login',
          description: responseData.message || 'Credenciais inválidas.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#010B18' }}>
      <Card className="w-full max-w-md bg-white/[0.02] border border-white/[0.05] rounded-2xl backdrop-blur-sm shadow-card text-white">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-white/95">Admin Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-white/80">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="bg-white/[0.02] border-white/[0.08] focus:ring-2 focus:ring-violet-500/50 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white/80">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-white/[0.02] border-white/[0.08] focus:ring-2 focus:ring-violet-500/50 text-white"
              />
            </div>
            <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-xl" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}