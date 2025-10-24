'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/utils/i18n';

export default function AddEditLinkModal({ isOpen, initialData, onClose, onSave }) {
  const { language } = useLanguage();
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [saving, setSaving] = useState(false);

  const t = (key) => getTranslation(language, key);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name_link || initialData.name || '');
      setUrl(initialData.url || initialData.link || '');
      setDescription(initialData.description || '');
    } else {
      setName('');
      setUrl('');
      setDescription('');
    }
  }, [initialData, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { name_link: name, url, description };
      await onSave(payload, initialData?.id);
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="relative bg-background w-full max-w-lg mx-4 p-6 rounded-2xl shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{initialData ? t('editLink') : t('addLink')}</h3>
          <button onClick={onClose} className="p-2 rounded-md hover:bg-muted/10"><X /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-sm">{t('linkTitle')}</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-md p-2 border" required />
          </div>

          <div>
            <label className="text-sm">{t('linkUrl')}</label>
            <input value={url} onChange={(e) => setUrl(e.target.value)} className="w-full rounded-md p-2 border" type="url" required />
          </div>

          <div>
            <label className="text-sm">{t('linkDescription')}</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full rounded-md p-2 border" rows={3} />
          </div>

          <div className="flex items-center justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-md border">{t('cancel')}</button>
            <button type="submit" className="px-4 py-2 rounded-md bg-hero text-white" disabled={saving}>{saving ? '...' : t('save')}</button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
