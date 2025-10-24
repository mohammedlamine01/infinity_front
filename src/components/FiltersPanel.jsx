'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Filter, ChevronDown, ChevronUp, Calendar, Tag, Layers } from 'lucide-react';
import { useState } from 'react';
import { searchTranslations } from '../utils/searchTranslations';

export default function FiltersPanel({ filters, onFiltersChange, language }) {
  const t = searchTranslations[language];
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    date: true,
    type: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCategoryToggle = (category) => {
    const newCategories = filters.category.includes(category)
      ? filters.category.filter(c => c !== category)
      : [...filters.category, category];
    
    onFiltersChange({ ...filters, category: newCategories });
  };

  const handleTypeToggle = (type) => {
    const newTypes = filters.type.includes(type)
      ? filters.type.filter(t => t !== type)
      : [...filters.type, type];
    
    onFiltersChange({ ...filters, type: newTypes });
  };

  const handleDateRangeChange = (range) => {
    onFiltersChange({ ...filters, dateRange: range });
  };

  const categories = [
    { id: 'informatique', label: t.computerScience },
    { id: 'economie', label: t.economics },
    { id: 'langues', label: t.languages },
    { id: 'sciences', label: t.sciences }
  ];

  const types = [
    { id: 'student', label: t.student },
    { id: 'alumni', label: t.alumni },
    { id: 'professor', label: t.professor }
  ];

  const dateRanges = [
    { id: 'today', label: t.today },
    { id: 'week', label: t.thisWeek },
    { id: 'month', label: t.thisMonth },
    { id: 'year', label: t.thisYear }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="sticky top-24 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg overflow-hidden"
    >
      {/* Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
            <Filter className="h-5 w-5 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            {t.filters}
          </h3>
        </div>
      </div>

      {/* Filter Sections */}
      <div className="divide-y divide-slate-200 dark:divide-slate-700">
        {/* Category Filter */}
        <FilterSection
          title={t.category}
          icon={Tag}
          isExpanded={expandedSections.category}
          onToggle={() => toggleSection('category')}
        >
          <div className="space-y-2">
            {categories.map(category => (
              <label
                key={category.id}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer transition-colors duration-200 group"
              >
                <input
                  type="checkbox"
                  checked={filters.category.includes(category.id)}
                  onChange={() => handleCategoryToggle(category.id)}
                  className="w-4 h-4 text-green-600 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 rounded focus:ring-2 focus:ring-green-500 focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors">
                  {category.label}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Date Range Filter */}
        <FilterSection
          title={t.dateRange}
          icon={Calendar}
          isExpanded={expandedSections.date}
          onToggle={() => toggleSection('date')}
        >
          <div className="space-y-2">
            {dateRanges.map(range => (
              <label
                key={range.id}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer transition-colors duration-200 group"
              >
                <input
                  type="radio"
                  name="dateRange"
                  checked={filters.dateRange === range.id}
                  onChange={() => handleDateRangeChange(range.id)}
                  className="w-4 h-4 text-green-600 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors">
                  {range.label}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Type Filter */}
        <FilterSection
          title={t.type}
          icon={Layers}
          isExpanded={expandedSections.type}
          onToggle={() => toggleSection('type')}
        >
          <div className="space-y-2">
            {types.map(type => (
              <label
                key={type.id}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer transition-colors duration-200 group"
              >
                <input
                  type="checkbox"
                  checked={filters.type.includes(type.id)}
                  onChange={() => handleTypeToggle(type.id)}
                  className="w-4 h-4 text-green-600 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 rounded focus:ring-2 focus:ring-green-500 focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors">
                  {type.label}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>
      </div>

      {/* Clear Filters Button */}
      {(filters.category.length > 0 || filters.type.length > 0 || filters.dateRange) && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 border-t border-slate-200 dark:border-slate-700"
        >
          <button
            onClick={() => onFiltersChange({ category: [], dateRange: null, type: [] })}
            className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors duration-200"
          >
            {t.clearFilters}
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}

function FilterSection({ title, icon: Icon, isExpanded, onToggle, children }) {
  return (
    <div>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors duration-200"
      >
        <div className="flex items-center gap-3">
          <Icon className="h-4 w-4 text-slate-500 dark:text-slate-400" />
          <span className="font-semibold text-slate-900 dark:text-slate-100">
            {title}
          </span>
        </div>
        {isExpanded ? (
          <ChevronUp className="h-4 w-4 text-slate-400" />
        ) : (
          <ChevronDown className="h-4 w-4 text-slate-400" />
        )}
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
