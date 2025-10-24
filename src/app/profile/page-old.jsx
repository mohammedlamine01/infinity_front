'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  User, Mail, Phone, Calendar, Shield, 
  GraduationCap, Briefcase, Plus, ExternalLink,
  Edit, Trash2, Link as LinkIcon 
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/utils/i18n';
import { linksAPI } from '@/utils/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import AddEditLinkModal from '@/components/Profile/AddEditLinkModal';

export default function ProfilePage() {
  const router = useRouter();
  const { isAuth, user, loading } = useAuth();
  const { language } = useLanguage();
  const [links, setLinks] = useState([]);
  const [loadingLinks, setLoadingLinks] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLink, setEditingLink] = useState(null);

  const t = (key) => getTranslation(language, key);
  const isRTL = language === 'ar';
  const direction = isRTL ? 'rtl' : 'ltr';

  useEffect(() => {
    if (!loading && !isAuth) {
      router.push('/login');
    }
  }, [isAuth, loading, router]);

  useEffect(() => {
    if (user?.id) {
      fetchLinks();
    }
  }, [user]);

  const fetchLinks = async () => {
    if (!user?.id) return;
    
    try {
      setLoadingLinks(true);
      const response = await linksAPI.getByUser(user.id);
      
      if (response.data) {
        if (Array.isArray(response.data)) {
          setLinks(response.data);
        } else if (response.data.links && Array.isArray(response.data.links)) {
          setLinks(response.data.links);
        } else if (response.data.data && Array.isArray(response.data.data)) {
          setLinks(response.data.data);
        } else {
          setLinks([]);
        }
      } else {
        setLinks([]);
      }
    } catch (error) {
      console.error('Error fetching links:', error);
      setLinks([]);
    } finally {
      setLoadingLinks(false);
    }
  };

  const handleSaveLink = async (linkData, linkId) => {
    try {
      if (linkId) {
        await linksAPI.update(linkId, linkData);
      } else {
        await linksAPI.create(linkData);
      }
      
      setIsModalOpen(false);
      setEditingLink(null);
      setTimeout(() => fetchLinks(), 300);
    } catch (error) {
      console.error('Error saving link:', error);
      alert(error.response?.data?.message || 'Failed to save link. Please try again.');
      throw error;
    }
  };

  const handleEditLink = (link) => {
    setEditingLink(link);
    setIsModalOpen(true);
  };

  const handleDeleteLink = async (linkId) => {
    if (!window.confirm(t('confirmDelete'))) return;
    
    try {
      await linksAPI.delete(linkId);
      setTimeout(() => fetchLinks(), 300);
    } catch (error) {
      console.error('Error deleting link:', error);
      alert(error.response?.data?.message || 'Failed to delete link. Please try again.');
    }
  };

  const handleAddLink = () => {
    setEditingLink(null);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'ar' ? 'ar-DZ' : language === 'fr' ? 'fr-FR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getInitials = () => {
    return `${user.prenom?.charAt(0) || ''}${user.nom?.charAt(0) || ''}`.toUpperCase();
  };

  const getRoleBadgeColor = (role) => {
    const colors = {
      admin: 'bg-destructive/10 text-destructive',
      president: 'bg-chart-5/10 text-chart-5',
      member: 'bg-primary/10 text-primary',
      moderator: 'bg-chart-1/10 text-chart-1',
    };
    return colors[role?.toLowerCase()] || 'bg-muted text-muted-foreground';
  };

  return (
    <div 
      className="min-h-screen bg-background py-20"
      dir={direction}
      style={{ fontFamily: 'var(--font-sans)' }}
    >
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-foreground mb-2" style={{ fontFamily: 'var(--font-serif)' }}>
            <span className="bg-gradient-to-r from-primary to-chart-1 bg-clip-text text-transparent">
              {t('myProfile')}
            </span>
          </h1>
          <p className="text-muted-foreground">{t('yourProfile')}</p>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="mb-8 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-primary via-chart-1 to-chart-3"></div>
            <CardHeader className="relative pb-6">
              <div className={`flex ${isRTL ? 'flex-row-reverse' : 'flex-row'} items-start gap-6`}>
                <motion.div 
                  className="-mt-16"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Avatar className="h-32 w-32 border-4 border-background shadow-xl">
                    <AvatarImage src={user.avatar} alt={`${user.prenom} ${user.nom}`} />
                    <AvatarFallback className="text-4xl font-bold bg-gradient-to-br from-primary to-chart-1 text-primary-foreground">
                      {getInitials()}
                    </AvatarFallback>
                  </Avatar>
                </motion.div>
                
                <div className={`flex-1 pt-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                  <CardTitle className="text-3xl font-bold text-foreground mb-2" style={{ fontFamily: 'var(--font-sans)' }}>
                    {user.prenom} {user.nom}
                  </CardTitle>
                  <div className={`flex ${isRTL ? 'flex-row-reverse' : 'flex-row'} gap-2 mb-3`}>
                    <Badge className={getRoleBadgeColor(user.role)}>
                      <Shield className={`h-3 w-3 ${isRTL ? 'ml-1' : 'mr-1'}`} />
                      {user.role || 'Member'}
                    </Badge>
                  </div>
                  {user.bio && (
                    <CardDescription className="text-base max-w-2xl">
                      {user.bio}
                    </CardDescription>
                  )}
                </div>
              </div>
            </CardHeader>

            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Email */}
              <motion.div
                initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-3 p-4 rounded-lg bg-muted hover:bg-accent transition-colors"
              >
                <div className="p-2 rounded-full bg-primary/10">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div className={isRTL ? 'text-right' : 'text-left'}>
                  <p className="text-sm text-muted-foreground">{t('email')}</p>
                  <p className="font-medium text-foreground break-all">{user.email}</p>
                </div>
              </motion.div>

              {/* Phone */}
              {user.phone && (
                <motion.div
                  initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center gap-3 p-4 rounded-lg bg-muted hover:bg-accent transition-colors"
                >
                  <div className="p-2 rounded-full bg-chart-1/10">
                    <Phone className="h-5 w-5 text-chart-1" />
                  </div>
                  <div className={isRTL ? 'text-right' : 'text-left'}>
                    <p className="text-sm text-muted-foreground">{t('phone')}</p>
                    <p className="font-medium text-foreground">{user.phone}</p>
                  </div>
                </motion.div>
              )}

              {/* Department */}
              {user.specialite?.departement && (
                <motion.div
                  initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center gap-3 p-4 rounded-lg bg-muted hover:bg-accent transition-colors"
                >
                  <div className="p-2 rounded-full bg-chart-2/10">
                    <Briefcase className="h-5 w-5 text-chart-2" />
                  </div>
                  <div className={isRTL ? 'text-right' : 'text-left'}>
                    <p className="text-sm text-muted-foreground">{t('department')}</p>
                    <p className="font-medium text-foreground">{user.specialite.departement.nom}</p>
                  </div>
                </motion.div>
              )}

              {/* Specialty */}
              {user.specialite && (
                <motion.div
                  initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-center gap-3 p-4 rounded-lg bg-muted hover:bg-accent transition-colors"
                >
                  <div className="p-2 rounded-full bg-chart-3/10">
                    <GraduationCap className="h-5 w-5 text-chart-3" />
                  </div>
                  <div className={isRTL ? 'text-right' : 'text-left'}>
                    <p className="text-sm text-muted-foreground">{t('specialty')}</p>
                    <p className="font-medium text-foreground">{user.specialite.nom}</p>
                  </div>
                </motion.div>
              )}

              {/* Member Since */}
              <motion.div
                initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="flex items-center gap-3 p-4 rounded-lg bg-muted hover:bg-accent transition-colors"
              >
                <div className="p-2 rounded-full bg-chart-4/10">
                  <Calendar className="h-5 w-5 text-chart-4" />
                </div>
                <div className={isRTL ? 'text-right' : 'text-left'}>
                  <p className="text-sm text-muted-foreground">{t('memberSince')}</p>
                  <p className="font-medium text-foreground">{formatDate(user.created_at)}</p>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Professional Links Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className={`flex ${isRTL ? 'flex-row-reverse' : 'flex-row'} items-center justify-between`}>
                <div className={`flex ${isRTL ? 'flex-row-reverse' : 'flex-row'} items-center gap-2`}>
                  <LinkIcon className="h-5 w-5 text-primary" />
                  <CardTitle style={{ fontFamily: 'var(--font-sans)' }}>{t('myLinks')}</CardTitle>
                </div>
                <Button 
                  onClick={handleAddLink}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <Plus className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                  {t('addLink')}
                </Button>
              </div>
            </CardHeader>

            <CardContent>
              {loadingLinks ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : links.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {links.map((link, index) => (
                    <motion.div
                      key={link.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group"
                    >
                      <Card className="hover:shadow-lg transition-all duration-300 border-2 hover:border-primary">
                        <CardContent className="p-4">
                          <div className={`flex ${isRTL ? 'flex-row-reverse' : 'flex-row'} items-start justify-between gap-3 mb-3`}>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-foreground mb-1 truncate">
                                {link.titre}
                              </h3>
                              <a
                                href={link.lien}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:text-primary/80 text-sm flex items-center gap-1 transition-colors truncate"
                              >
                                <ExternalLink className="h-3 w-3 flex-shrink-0" />
                                <span className="truncate">{link.lien}</span>
                              </a>
                            </div>
                            <div className={`flex ${isRTL ? 'flex-row-reverse' : 'flex-row'} gap-1`}>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditLink(link)}
                                className="h-8 w-8 p-0 hover:bg-primary/10 hover:text-primary"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteLink(link.id)}
                                className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          {link.description && (
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {link.description}
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <LinkIcon className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {t('noLinks')}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {t('noLinksDesc')}
                  </p>
                  <Button 
                    onClick={handleAddLink}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    <Plus className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                    {t('addLink')}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Add/Edit Link Modal */}
      <AddEditLinkModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingLink(null);
        }}
        onSave={handleSaveLink}
        link={editingLink}
        userId={user?.id}
      />
    </div>
  );
}
