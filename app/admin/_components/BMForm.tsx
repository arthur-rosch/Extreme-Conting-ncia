'use client';

import { useEffect, useMemo, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronDown, ChevronUp, Copy } from 'lucide-react';

const bmStatusSchema = z.enum(['1-10k', '10k-30k', '30k-70k', '70k-100k', '100k-500k', '500k+']);
const bmTypeSchema = z.enum(['meta', 'google']);
const saleStatusSchema = z.enum(['available', 'sold']);
const platformSchema = z.enum(['meta', 'google']);

const formSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  description: z.string().min(1, 'Descrição é obrigatória'),
  priceBRL: z.number().nonnegative('Preço inválido'),
  status: bmStatusSchema,
  type: bmTypeSchema,
  platform: platformSchema,
  saleStatus: saleStatusSchema,
  hash: z.string().optional(),
});

type BMFormValues = z.infer<typeof formSchema>;

interface BMFormProps {
  initialData?: Partial<BMFormValues>;
  onSubmit: (data: BMFormValues) => void;
  isLoading: boolean;
}

/* helpers zap */
function escapeHtml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
function parseWhatsFormatting(text: string) {
  const safe = escapeHtml(text ?? '');
  return safe
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/\*(.+?)\*/g, '<strong>$1</strong>')
    .replace(/_(.+?)_/g, '<em>$1</em>')
    .replace(/~(.+?)~/g, '<s>$1</s>')
    .replace(/\n/g, '<br/>');
}

export function BMForm({ initialData, onSubmit, isLoading }: BMFormProps) {
  const {
    register, handleSubmit, reset, control, watch,
    formState: { errors },
  } = useForm<BMFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hash: '', title: '', description: '', priceBRL: 0,
      status: '1-10k', type: 'meta', platform: 'meta', saleStatus: 'available',
      ...initialData,
    },
  });

  useEffect(() => { if (initialData) reset(getValuesWithSafeDefaults(initialData)); }, [initialData, reset]);
  function getValuesWithSafeDefaults(v?: Partial<BMFormValues>): BMFormValues {
    return {
      hash: v?.hash ?? '', title: v?.title ?? '', description: v?.description ?? '',
      priceBRL: v?.priceBRL ?? 0, status: v?.status ?? '1-10k',
      type: v?.type ?? 'meta', platform: v?.platform ?? 'meta',
      saleStatus: v?.saleStatus ?? 'available',
    };
  }

  const titleValue = watch('title') ?? '';
  const titlePreviewHtml = useMemo(() => parseWhatsFormatting(titleValue), [titleValue]);

  const descriptionValue = watch('description') ?? '';
  const descriptionPreviewHtml = useMemo(() => parseWhatsFormatting(descriptionValue), [descriptionValue]);

  const [showPreviewMobile, setShowPreviewMobile] = useState(false);

  async function copyWhats() {
    try { await navigator.clipboard.writeText(descriptionValue); } catch { }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="text-white/90 space-y-4 md:space-y-6
                 max-h-[calc(100vh-140px)] md:max-h-none overflow-y-auto overscroll-contain pr-1"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        {/* Título */}
        <div className="col-span-1">
          <Label htmlFor="title" className="mb-1 block text-sm">Title</Label>
          <Input
            id="title"
            {...register('title')}
            className="h-11 text-sm md:text-base bg-white/[0.03] border-white/[0.08] focus:ring-2 focus:ring-violet-500/50"
          />
          {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title.message}</p>}

          {/* preview do título */}
          <div className="mt-2 rounded-lg border border-white/10 bg-white/[0.04] p-2">
            <div className="prose prose-invert max-w-none text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: titlePreviewHtml }} />
          </div>
        </div>

        {/* Hash */}
        <div className="col-span-1">
          <Label htmlFor="hash" className="mb-1 block text-sm">Hash</Label>
          <Input id="hash" {...register('hash')}
            className="h-11 text-sm md:text-base bg-white/[0.03] border-white/[0.08] focus:ring-2 focus:ring-violet-500/50" />
          {errors.hash && <p className="text-red-400 text-xs mt-1">{errors.hash.message}</p>}
        </div>

        {/* Descrição */}
        <div className="md:col-span-2 col-span-1">
          <Label htmlFor="description" className="mb-1 block text-sm">Description</Label>

          {/* MOBILE: textarea + ações; preview colapsável */}
          <div className="md:hidden space-y-2">
            <Textarea
              id="description"
              rows={8}
              {...register('description')}
              placeholder="Cole aqui o texto com *negrito* e _itálico_ do WhatsApp"
              className="
                w-full text-sm leading-relaxed
                bg-white/[0.03] border-white/[0.08] focus:ring-2 focus:ring-violet-500/50
                h-[28vh] max-h-[40vh] overflow-y-auto resize-none
              "
            />
            {errors.description && <p className="text-red-400 text-xs">{errors.description.message}</p>}

            <div className="flex items-center gap-2">
              <Button type="button" onClick={() => setShowPreviewMobile(v => !v)}
                className="flex-1 h-10 bg-white/10 hover:bg-white/20 border border-white/20">
                {showPreviewMobile ? <ChevronUp className="mr-2 h-4 w-4" /> : <ChevronDown className="mr-2 h-4 w-4" />}
                {showPreviewMobile ? 'Esconder preview' : 'Ver preview'}
              </Button>
              <Button type="button" onClick={copyWhats}
                className="h-10 bg-white/10 hover:bg-white/20 border border-white/20">
                <Copy className="mr-2 h-4 w-4" /> Copiar
              </Button>
            </div>

            {showPreviewMobile && (
              <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3 max-h-[36vh] overflow-auto">
                <div className="prose prose-invert max-w-none text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: descriptionPreviewHtml }} />
              </div>
            )}
          </div>

          {/* DESKTOP: textarea e preview lado a lado */}
          <div className="hidden md:grid md:grid-cols-2 md:gap-4">
            <div>
              <Textarea
                id="description"
                rows={14}
                {...register('description')}
                className="w-full bg-white/[0.03] border-white/[0.08] focus:ring-2 focus:ring-violet-500/50
                           h-64 max-h-64 overflow-y-auto resize-none"
              />
              {errors.description && <p className="text-red-400 text-xs">{errors.description.message}</p>}
            </div>
            <div className="flex flex-col h-full">
              <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3 flex-1 overflow-auto max-h-64">
                <div className="prose prose-invert max-w-none text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: descriptionPreviewHtml }} />
              </div>
              <div className="mt-2">
                <Button type="button" onClick={copyWhats}
                  className="w-full bg-white/10 hover:bg-white/20 border border-white/20">
                  <Copy className="mr-2 h-4 w-4" /> Copiar p/ WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Preço */}
        <div className="col-span-1">
          <Label htmlFor="priceBRL" className="mb-1 block text-sm">Price (BRL)</Label>
          <Input
            id="priceBRL" type="number" step="0.01" inputMode="decimal"
            {...register('priceBRL', { valueAsNumber: true })}
            className="h-11 text-sm md:text-base bg-white/[0.03] border-white/[0.08] focus:ring-2 focus:ring-violet-500/50"
          />
          {errors.priceBRL && <p className="text-red-400 text-xs mt-1">{errors.priceBRL.message}</p>}
        </div>

        {/* Status */}
        <div className="col-span-1">
          <Label className="mb-1 block text-sm">Status</Label>
          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="h-11 bg-white/[0.03] border-white/[0.08] focus:ring-2 focus:ring-violet-500/50">
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent className="bg-black/90 border-white/10">
                  <SelectItem value="1-10k">1-10k</SelectItem>
                  <SelectItem value="10k-30k">10k-30k</SelectItem>
                  <SelectItem value="30k-70k">30k-70k</SelectItem>
                  <SelectItem value="70k-100k">70k-100k</SelectItem>
                  <SelectItem value="100k-500k">100k-500k</SelectItem>
                  <SelectItem value="500k+">500k+</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.status && <p className="text-red-400 text-xs mt-1">{errors.status.message}</p>}
        </div>

        {/* Type */}
        <div className="col-span-1">
          <Label className="mb-1 block text-sm">Type</Label>
          <Controller
            control={control}
            name="type"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="h-11 bg-white/[0.03] border-white/[0.08] focus:ring-2 focus:ring-violet-500/50">
                  <SelectValue placeholder="Select a type" />
                </SelectTrigger>
                <SelectContent className="bg-black/90 border-white/10">
                  <SelectItem value="meta">Meta</SelectItem>
                  <SelectItem value="google">Google</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.type && <p className="text-red-400 text-xs mt-1">{errors.type.message}</p>}
        </div>

        {/* Platform */}
        <div className="col-span-1">
          <Label className="mb-1 block text-sm">Platform</Label>
          <Controller
            control={control}
            name="platform"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="h-11 bg-white/[0.03] border-white/[0.08] focus:ring-2 focus:ring-violet-500/50">
                  <SelectValue placeholder="Select a platform" />
                </SelectTrigger>
                <SelectContent className="bg-black/90 border-white/10">
                  <SelectItem value="meta">Meta</SelectItem>
                  <SelectItem value="google">Google</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.platform && <p className="text-red-400 text-xs mt-1">{errors.platform.message}</p>}
        </div>

        {/* Sale Status */}
        <div className="col-span-1">
          <Label className="mb-1 block text-sm">Sale Status</Label>
          <Controller
            control={control}
            name="saleStatus"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="h-11 bg-white/[0.03] border-white/[0.08] focus:ring-2 focus:ring-violet-500/50">
                  <SelectValue placeholder="Select sale status" className="text-white/90" />
                </SelectTrigger>
                <SelectContent className="bg-black/90 border-white/10">
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="sold">Sold</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.saleStatus && <p className="text-red-400 text-xs mt-1">{errors.saleStatus.message}</p>}
        </div>
      </div>

      {/* Ação fixa no rodapé (mobile) */}
      <div className="md:hidden sticky bottom-0 left-0 right-0 pt-2
                      bg-gradient-to-t from-[#010B18] via-[#010B18]/90 to-transparent
                      pb-[calc(env(safe-area-inset-bottom,0)+8px)]">
        <Button type="submit" disabled={isLoading}
          className="w-full h-12 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20">
          {isLoading ? 'Saving...' : 'Save'}
        </Button>
      </div>

      {/* desktop */}
      <div className="hidden md:block">
        <Button type="submit" disabled={isLoading}
          className="w-full mt-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl h-12">
          {isLoading ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </form>
  );
}
