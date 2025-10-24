'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import SearchInput from './SearchInput';
import DepartmentSelect from './DepartmentSelect';
import SpecialiteSelect from './SpecialiteSelect';
import UserList from './UserList';
import UserLinks from './UserLinks';
import StepIndicator from './StepIndicator';
import Loader from '../Loader';
import { searchTranslations } from '../../utils/searchTranslations';

export default function SearchPanel() {
  const { language } = useLanguage();
  const t = searchTranslations[language];

  // Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState(null);
  const [selectedSpec, setSelectedSpec] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  
  // Data states
  const [departments, setDepartments] = useState([]);
  const [specialites, setSpecialites] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch departments on mount
  useEffect(() => {
    fetchDepartments();
  }, []);

  // Fetch specialites when department is selected
  useEffect(() => {
    if (selectedDept) {
      fetchSpecialites(selectedDept.id);
    }
  }, [selectedDept]);

  // Fetch users when specialite is selected
  useEffect(() => {
    if (selectedSpec) {
      fetchUsers(selectedSpec.id);
    }
  }, [selectedSpec]);

  const fetchDepartments = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/departments');
      const data = await response.json();
      // Map the data to include proper structure
      const mappedData = Array.isArray(data) ? data.map(dept => ({
        id: dept.id,
        name: dept.nom_dep || dept.name,
        description: dept.description,
        specialites_count: dept.specialites_count
      })) : [];
      setDepartments(mappedData);
    } catch (error) {
      console.error('Error fetching departments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSpecialites = async (deptId) => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/api/departments/${deptId}/specialites`);
      const data = await response.json();
      // Extract specialites array from response
      const specialitesArray = data.specialites || data;
      const mappedData = Array.isArray(specialitesArray) ? specialitesArray.map(spec => ({
        id: spec.id,
        name: spec.nom_sp || spec.name,
        description: spec.description,
        users_count: spec.users_count
      })) : [];
      setSpecialites(mappedData);
    } catch (error) {
      console.error('Error fetching specialites:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUsers = async (specId) => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/api/specialites/${specId}/users`);
      const data = await response.json();
      // Extract users array from response
      const usersArray = data.users || data;
      setUsers(Array.isArray(usersArray) ? usersArray : []);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedDept(null);
    setSelectedSpec(null);
    setSelectedUser(null);
    fetchDepartments();
  };

  const handleDepartmentSelect = (dept) => {
    setSelectedDept(dept);
    setSelectedSpec(null);
    setSelectedUser(null);
  };

  const handleSpecialiteSelect = (spec) => {
    setSelectedSpec(spec);
    setSelectedUser(null);
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  const handleBack = () => {
    if (selectedUser) {
      setSelectedUser(null);
    } else if (selectedSpec) {
      setSelectedSpec(null);
    } else if (selectedDept) {
      setSelectedDept(null);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  // Determine current step for indicator
  const getCurrentStep = () => {
    if (selectedUser) return 3;
    if (selectedSpec) return 3;
    if (selectedDept) return 2;
    return 1;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950/90 to-black dark:from-black dark:via-slate-950/90 dark:to-black">
      {/* Header Section - Not sticky to allow navbar visibility */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-black/80 dark:bg-black/80 backdrop-blur-xl border-b border-slate-800/50 dark:border-slate-700/50 shadow-sm mb-8"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col gap-4">
            {/* Top row: Logo */}
            <div className="flex items-center justify-center">
              <motion.h1
                className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"
                whileHover={{ scale: 1.02 }}
              >
                {t.title}
              </motion.h1>
            </div>

            {/* Search bar and reset button */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              <div className="flex-1">
                <SearchInput
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder={t.searchPlaceholder}
                />
              </div>
              <motion.button
                onClick={handleResetFilters}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300 ease-in-out hover:from-green-500 hover:to-emerald-500"
              >
                {t.resetFilters}
              </motion.button>
            </div>

            {/* Breadcrumb navigation */}
            {(selectedDept || selectedSpec || selectedUser) && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-sm text-slate-400 dark:text-slate-500"
              >
                <button
                  onClick={handleResetFilters}
                  className="hover:text-green-600 dark:hover:text-green-400 transition-colors"
                >
                  {t.allDepartments}
                </button>
                {selectedDept && (
                  <>
                    <span>/</span>
                    <button
                      onClick={() => {
                        setSelectedSpec(null);
                        setSelectedUser(null);
                      }}
                      className="hover:text-green-600 dark:hover:text-green-400 transition-colors"
                    >
                      {selectedDept.name}
                    </button>
                  </>
                )}
                {selectedSpec && (
                  <>
                    <span>/</span>
                    <button
                      onClick={() => setSelectedUser(null)}
                      className="hover:text-green-600 dark:hover:text-green-400 transition-colors"
                    >
                      {selectedSpec.name}
                    </button>
                  </>
                )}
                {selectedUser && (
                  <>
                    <span>/</span>
                    <span className="text-green-600 dark:text-green-400 font-medium">
                      {selectedUser.name}
                    </span>
                  </>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Step Indicator */}
        <StepIndicator currentStep={getCurrentStep()} language={language} />

        {/* Main Content Area */}
        <main className="min-h-[600px]">
          <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loader"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex items-center justify-center h-full"
                >
                  <Loader />
                </motion.div>
              ) : !selectedDept ? (
                <motion.div
                  key="departments"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <DepartmentSelect
                    departments={departments}
                    onSelect={handleDepartmentSelect}
                    searchQuery={searchQuery}
                    language={language}
                  />
                </motion.div>
              ) : !selectedSpec ? (
                <motion.div
                  key="specialites"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <SpecialiteSelect
                    specialites={specialites}
                    onSelect={handleSpecialiteSelect}
                    onBack={handleBack}
                    searchQuery={searchQuery}
                    language={language}
                  />
                </motion.div>
              ) : !selectedUser ? (
                <motion.div
                  key="users"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <UserList
                    users={users}
                    onSelect={handleUserSelect}
                    onBack={handleBack}
                    searchQuery={searchQuery}
                    language={language}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="userLinks"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <UserLinks
                    user={selectedUser}
                    onBack={handleBack}
                    language={language}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </main>
      </div>
    </div>
  );
}
