'use client';

import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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

/** Sanitize básico antes de aplicar marcações */
function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Converte sintaxe do WhatsApp -> HTML */
function parseWhatsFormatting(text: string) {
  const safe = escapeHtml(text ?? '');
  return safe
    // monospace `code`
    .replace(/`(.+?)`/g, '<code>$1</code>')
    // bold *texto*
    .replace(/\*(.+?)\*/g, '<strong>$1</strong>')
    // italic _texto_
    .replace(/_(.+?)_/g, '<em>$1</em>')
    // strike ~texto~
    .replace(/~(.+?)~/g, '<s>$1</s>')
    // quebras de linha
    .replace(/\n/g, '<br/>');
}

export function BMForm({ initialData, onSubmit, isLoading }: BMFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm<BMFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hash: '',
      title: '',
      description: '',
      priceBRL: 0,
      status: '1-10k',
      type: 'meta',
      platform: 'meta',
      saleStatus: 'available',
      ...initialData,
    },
  });

  useEffect(() => {
    if (initialData) reset({ ...getValuesWithSafeDefaults(initialData) });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData, reset]);

  function getValuesWithSafeDefaults(v?: Partial<BMFormValues>): BMFormValues {
    return {
      hash: v?.hash ?? '',
      title: v?.title ?? '',
      description: v?.description ?? '',
      priceBRL: v?.priceBRL ?? 0,
      status: v?.status ?? '1-10k',
      type: v?.type ?? 'meta',
      platform: v?.platform ?? 'meta',
      saleStatus: v?.saleStatus ?? 'available',
    };
  }

  const descriptionValue = watch('description') ?? '';
  const descriptionPreviewHtml = parseWhatsFormatting(descriptionValue);

  async function copyWhats() {
    try {
      await navigator.clipboard.writeText(descriptionValue);
    } catch {
      // se der pau no clipboard, ignora silencioso
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="text-white/90 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Título */}
        <div className="col-span-1">
          <Label htmlFor="title" className="mb-1 block">Title</Label>
          <Input
            id="title"
            {...register('title')}
            className="bg-white/[0.02] border-white/[0.08] focus:ring-2 focus:ring-violet-500/50"
          />
          {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title.message}</p>}
        </div>

        {/* Hash */}
        <div className="col-span-1">
          <Label htmlFor="hash" className="mb-1 block">Hash</Label>
          <Input
            id="hash"
            {...register('hash')}
            className="bg-white/[0.02] border-white/[0.08] focus:ring-2 focus:ring-violet-500/50"
          />
          {errors.hash && <p className="text-red-400 text-xs mt-1">{errors.hash.message}</p>}
        </div>

        {/* Descrição (ocupa 2 colunas) */}
        <div className="md:col-span-2 col-span-1">
          <Label htmlFor="description" className="mb-1 block">
            Description
          </Label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Campo de texto */}
            <div>
              <Textarea
                id="description"
                rows={14}
                {...register('description')}
                placeholder="Cole aqui o texto com *negrito* e _itálico_ do WhatsApp"
                className="bg-white/[0.02] border-white/[0.08] focus:ring-2 focus:ring-violet-500/50 w-full"
              />
              {errors.description && (
                <p className="text-red-400 text-xs">{errors.description.message}</p>
              )}
            </div>

            {/* Preview */}
            <div className="flex flex-col h-full">
              <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3 flex-1 overflow-auto">
                <div
                  className="prose prose-invert max-w-none text-sm leading-relaxed whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: descriptionPreviewHtml }}
                />
              </div>
              <div className="mt-2">
                <Button
                  type="button"
                  onClick={copyWhats}
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-white/90 rounded-xl w-full"
                >
                  Copiar p/ WhatsApp (texto bruto)
                </Button>
              </div>
            </div>
          </div>
        </div>


        {/* Preço */}
        <div className="col-span-1">
          <Label htmlFor="priceBRL" className="mb-1 block">Price (BRL)</Label>
          <Input
            id="priceBRL"
            type="number"
            step="0.01"
            inputMode="decimal"
            {...register('priceBRL', { valueAsNumber: true })}
            className="bg-white/[0.02] border-white/[0.08] focus:ring-2 focus:ring-violet-500/50"
          />
          {errors.priceBRL && <p className="text-red-400 text-xs mt-1">{errors.priceBRL.message}</p>}
        </div>

        {/* Status */}
        <div className="col-span-1">
          <Label className="mb-1 block">Status</Label>
          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="bg-white/[0.02] border-white/[0.08] focus:ring-2 focus:ring-violet-500/50">
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
          <Label className="mb-1 block">Type</Label>
          <Controller
            control={control}
            name="type"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="bg-white/[0.02] border-white/[0.08] focus:ring-2 focus:ring-violet-500/50">
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
          <Label className="mb-1 block">Platform</Label>
          <Controller
            control={control}
            name="platform"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="bg-white/[0.02] border-white/[0.08] focus:ring-2 focus:ring-violet-500/50">
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
          <Label className="mb-1 block">Sale Status</Label>
          <Controller
            control={control}
            name="saleStatus"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="bg-white/[0.02] border-white/[0.08] focus:ring-2 focus:ring-violet-500/50">
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

      <Button
        type="submit"
        className="w-full mt-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white/90 rounded-xl"
        disabled={isLoading}
      >
        {isLoading ? 'Saving...' : 'Save'}
      </Button>
    </form>
  );
}
