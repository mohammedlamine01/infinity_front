export interface Translations {
  // Navbar
  home: string;
  about: string;
  activities: string;
  team: string;
  contact: string;
  joinUs: string;
  login: string;
  register: string;
  logout: string;
  dashboard: string;
  
  // Hero
  heroTitle: string;
  heroSubtitle: string;
  discoverProjects: string;
  
  // About
  aboutTitle: string;
  aboutDescription: string;
  innovation: string;
  innovationDesc: string;
  technology: string;
  technologyDesc: string;
  teamwork: string;
  teamworkDesc: string;
  
  // Activities
  activitiesTitle: string;
  activitiesDescription: string;
  
  // Team
  teamTitle: string;
  teamDescription: string;
  
  // Footer
  footerDescription: string;
  followUs: string;
  email: string;
  
  // Auth
  emailLabel: string;
  passwordLabel: string;
  nameLabel: string;
  phoneLabel: string;
  bioLabel: string;
  specialtyLabel: string;
  confirmPasswordLabel: string;
  loginButton: string;
  registerButton: string;
  nextStep: string;
  previousStep: string;
  alreadyHaveAccount: string;
  dontHaveAccount: string;
  
  // Messages
  loginSuccess: string;
  loginError: string;
  registerSuccess: string;
  registerError: string;
  accountNotValidated: string;
  
  // Dashboard
  welcomeBack: string;
  yourProfile: string;
  dashboardOverview: string;
  welcomeToAdminPanel: string;
  departments: string;
  specialites: string;
  events: string;
  users: string;
  pendingUsers: string;
  quickActions: string;
  recentActivity: string;
  reviewAndValidate: string;
  addEditDelete: string;
  organizeNewEvent: string;
  browseAllMembers: string;
  systemInitialized: string;
  justNow: string;
  adminDashboard: string;
  backToHome: string;
  
  // Dashboard - Stats & Actions
  validatedUsers: string;
  viewAllValidatedMembers: string;
  manageAllDepartments: string;
  manageAllSpecialites: string;
  manageAllEvents: string;
  usersAwaitingValidation: string;
  allCaughtUp: string;
  noPendingUsers: string;
  
  // Dashboard - Tables
  departmentName: string;
  description: string;
  actions: string;
  name: string;
  phone: string;
  role: string;
  specialite: string;
  registered: string;
  date: string;
  location: string;
  
  // Dashboard - Buttons
  addDepartment: string;
  addSpecialite: string;
  addEvent: string;
  edit: string;
  delete: string;
  validate: string;
  reject: string;
  
  // Dashboard - Messages
  noDepartmentsFound: string;
  noSpecialitesFound: string;
  noEventsFound: string;
  noUsersFound: string;
  createFirstDepartment: string;
  createFirstSpecialite: string;
  createFirstEvent: string;
  searchByName: string;
  showing: string;
  of: string;
  
  // Dashboard - Confirmations
  deleteConfirmation: string;
  rejectUserConfirmation: string;
  departmentDeleted: string;
  specialiteDeleted: string;
  eventDeleted: string;
  userValidated: string;
  userRejected: string;
  failedToLoad: string;
  failedToDelete: string;
  failedToValidate: string;
}

export type Locale = 'en' | 'fr' | 'ar';

export const translations: Record<Locale, Translations> = {
  en: {
    // Navbar
    home: 'Home',
    about: 'About',
    activities: 'Activities',
    team: 'Team',
    contact: 'Contact',
    joinUs: 'Join Us',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    dashboard: 'Dashboard',
    
    // Hero
    heroTitle: 'Welcome to Infinity Club',
    heroSubtitle: 'A community of innovators, developers, and researchers at University of BBA.',
    discoverProjects: 'Discover Our Projects',
    
    // About
    aboutTitle: 'About Us',
    aboutDescription: 'Infinity Club is a student organization dedicated to promoting innovation, technology, and collaboration among students at the University of BBA.',
    innovation: 'Innovation',
    innovationDesc: 'We foster creativity and innovative thinking in technology',
    technology: 'Technology',
    technologyDesc: 'Learn cutting-edge technologies and development practices',
    teamwork: 'Teamwork',
    teamworkDesc: 'Collaborate with talented individuals on real projects',
    
    // Activities
    activitiesTitle: 'Our Activities',
    activitiesDescription: 'Join us in various workshops, hackathons, and tech talks',
    
    // Team
    teamTitle: 'Our Team',
    teamDescription: 'Meet the passionate individuals behind Infinity Club',
    
    // Footer
    footerDescription: 'Building the future, one line of code at a time.',
    followUs: 'Follow Us',
    email: 'Email',
    
    // Auth
    emailLabel: 'Email',
    passwordLabel: 'Password',
    nameLabel: 'Full Name',
    phoneLabel: 'Phone Number',
    bioLabel: 'Bio',
    specialtyLabel: 'Specialty',
    confirmPasswordLabel: 'Confirm Password',
    loginButton: 'Login',
    registerButton: 'Register',
    nextStep: 'Next Step',
    previousStep: 'Previous Step',
    alreadyHaveAccount: 'Already have an account?',
    dontHaveAccount: "Don't have an account?",
    
    // Messages
    loginSuccess: 'Login successful!',
    loginError: 'Login failed. Please check your credentials.',
    registerSuccess: 'Registration successful! Please wait for admin validation.',
    registerError: 'Registration failed. Please try again.',
    accountNotValidated: 'Your account has not been validated yet. Please wait for administrator confirmation.',
    
    // Dashboard
    welcomeBack: 'Welcome back',
    yourProfile: 'Your Profile',
    dashboardOverview: 'Dashboard Overview',
    welcomeToAdminPanel: 'Welcome to Infinity Club Admin Panel',
    departments: 'Departments',
    specialites: 'Specialites',
    events: 'Events',
    users: 'Users',
    pendingUsers: 'Pending Users',
    quickActions: 'Quick Actions',
    recentActivity: 'Recent Activity',
    reviewAndValidate: 'Review and validate new registrations',
    addEditDelete: 'Add, edit or delete departments',
    organizeNewEvent: 'Organize a new club event',
    browseAllMembers: 'Browse all club members',
    systemInitialized: 'System initialized successfully',
    justNow: 'Just now',
    adminDashboard: 'Admin Dashboard',
    backToHome: 'Back to Home',
    
    // Dashboard - Stats & Actions
    validatedUsers: 'Validated Users',
    viewAllValidatedMembers: 'View all validated club members',
    manageAllDepartments: 'Manage all departments',
    manageAllSpecialites: 'Manage all specialites',
    manageAllEvents: 'Manage all club events',
    usersAwaitingValidation: 'Users awaiting validation',
    allCaughtUp: 'All Caught Up!',
    noPendingUsers: 'There are no pending users to validate at the moment.',
    
    // Dashboard - Tables
    departmentName: 'Department Name',
    description: 'Description',
    actions: 'Actions',
    name: 'Name',
    phone: 'Phone',
    role: 'Role',
    specialite: 'Specialite',
    registered: 'Registered',
    date: 'Date',
    location: 'Location',
    
    // Dashboard - Buttons
    addDepartment: 'Add Department',
    addSpecialite: 'Add Specialite',
    addEvent: 'Add Event',
    edit: 'Edit',
    delete: 'Delete',
    validate: 'Validate',
    reject: 'Reject',
    
    // Dashboard - Messages
    noDepartmentsFound: 'No departments found',
    noSpecialitesFound: 'No specialites found',
    noEventsFound: 'No events found',
    noUsersFound: 'No users found matching your search',
    createFirstDepartment: 'Create your first department',
    createFirstSpecialite: 'Create your first specialite',
    createFirstEvent: 'Create your first event',
    searchByName: 'Search by name, email, or phone...',
    showing: 'Showing',
    of: 'of',
    
    // Dashboard - Confirmations
    deleteConfirmation: 'Are you sure you want to delete this?',
    rejectUserConfirmation: 'Are you sure you want to reject this user? This will delete their account.',
    departmentDeleted: 'Department deleted successfully!',
    specialiteDeleted: 'Specialite deleted successfully!',
    eventDeleted: 'Event deleted successfully!',
    userValidated: 'User validated successfully!',
    userRejected: 'User rejected successfully!',
    failedToLoad: 'Failed to load',
    failedToDelete: 'Failed to delete',
    failedToValidate: 'Failed to validate user',
  },
  
  fr: {
    // Navbar
    home: 'Accueil',
    about: 'À propos',
    activities: 'Activités',
    team: 'Équipe',
    contact: 'Contact',
    joinUs: 'Nous rejoindre',
    login: 'Connexion',
    register: 'Inscription',
    logout: 'Déconnexion',
    dashboard: 'Tableau de bord',
    
    // Hero
    heroTitle: 'Bienvenue au Club Infinity',
    heroSubtitle: 'Une communauté d\'innovateurs, de développeurs et de chercheurs à l\'Université de BBA.',
    discoverProjects: 'Découvrir nos projets',
    
    // About
    aboutTitle: 'À propos de nous',
    aboutDescription: 'Infinity Club est une organisation étudiante dédiée à la promotion de l\'innovation, de la technologie et de la collaboration entre étudiants à l\'Université de BBA.',
    innovation: 'Innovation',
    innovationDesc: 'Nous favorisons la créativité et la pensée innovante en technologie',
    technology: 'Technologie',
    technologyDesc: 'Apprenez les technologies de pointe et les pratiques de développement',
    teamwork: 'Travail d\'équipe',
    teamworkDesc: 'Collaborez avec des personnes talentueuses sur de vrais projets',
    
    // Activities
    activitiesTitle: 'Nos activités',
    activitiesDescription: 'Rejoignez-nous pour divers ateliers, hackathons et conférences tech',
    
    // Team
    teamTitle: 'Notre équipe',
    teamDescription: 'Rencontrez les personnes passionnées derrière Infinity Club',
    
    // Footer
    footerDescription: 'Construire l\'avenir, une ligne de code à la fois.',
    followUs: 'Suivez-nous',
    email: 'Email',
    
    // Auth
    emailLabel: 'Email',
    passwordLabel: 'Mot de passe',
    nameLabel: 'Nom complet',
    phoneLabel: 'Numéro de téléphone',
    bioLabel: 'Bio',
    specialtyLabel: 'Spécialité',
    confirmPasswordLabel: 'Confirmer le mot de passe',
    loginButton: 'Se connecter',
    registerButton: 'S\'inscrire',
    nextStep: 'Étape suivante',
    previousStep: 'Étape précédente',
    alreadyHaveAccount: 'Vous avez déjà un compte ?',
    dontHaveAccount: 'Vous n\'avez pas de compte ?',
    
    // Messages
    loginSuccess: 'Connexion réussie !',
    loginError: 'Échec de la connexion. Veuillez vérifier vos identifiants.',
    registerSuccess: 'Inscription réussie ! Veuillez attendre la validation de l\'administrateur.',
    registerError: 'Échec de l\'inscription. Veuillez réessayer.',
    accountNotValidated: 'Votre compte n\'a pas encore été validé. Veuillez attendre la confirmation de l\'administrateur.',
    
    // Dashboard
    welcomeBack: 'Bon retour',
    yourProfile: 'Votre profil',
    dashboardOverview: 'Aperçu du tableau de bord',
    welcomeToAdminPanel: 'Bienvenue au panneau d\'administration du Club Infinity',
    departments: 'Départements',
    specialites: 'Spécialités',
    events: 'Événements',
    users: 'Utilisateurs',
    pendingUsers: 'Utilisateurs en attente',
    quickActions: 'Actions rapides',
    recentActivity: 'Activité récente',
    reviewAndValidate: 'Examiner et valider les nouvelles inscriptions',
    addEditDelete: 'Ajouter, modifier ou supprimer des départements',
    organizeNewEvent: 'Organiser un nouvel événement du club',
    browseAllMembers: 'Parcourir tous les membres du club',
    systemInitialized: 'Système initialisé avec succès',
    justNow: 'À l\'instant',
    adminDashboard: 'Tableau de bord Admin',
    backToHome: 'Retour à l\'accueil',
    
    // Dashboard - Stats & Actions
    validatedUsers: 'Utilisateurs validés',
    viewAllValidatedMembers: 'Voir tous les membres validés du club',
    manageAllDepartments: 'Gérer tous les départements',
    manageAllSpecialites: 'Gérer toutes les spécialités',
    manageAllEvents: 'Gérer tous les événements du club',
    usersAwaitingValidation: 'Utilisateurs en attente de validation',
    allCaughtUp: 'Tout est à jour !',
    noPendingUsers: 'Il n\'y a pas d\'utilisateurs en attente de validation pour le moment.',
    
    // Dashboard - Tables
    departmentName: 'Nom du département',
    description: 'Description',
    actions: 'Actions',
    name: 'Nom',
    phone: 'Téléphone',
    role: 'Rôle',
    specialite: 'Spécialité',
    registered: 'Inscrit',
    date: 'Date',
    location: 'Lieu',
    
    // Dashboard - Buttons
    addDepartment: 'Ajouter un département',
    addSpecialite: 'Ajouter une spécialité',
    addEvent: 'Ajouter un événement',
    edit: 'Modifier',
    delete: 'Supprimer',
    validate: 'Valider',
    reject: 'Rejeter',
    
    // Dashboard - Messages
    noDepartmentsFound: 'Aucun département trouvé',
    noSpecialitesFound: 'Aucune spécialité trouvée',
    noEventsFound: 'Aucun événement trouvé',
    noUsersFound: 'Aucun utilisateur correspondant à votre recherche',
    createFirstDepartment: 'Créer votre premier département',
    createFirstSpecialite: 'Créer votre première spécialité',
    createFirstEvent: 'Créer votre premier événement',
    searchByName: 'Rechercher par nom, email ou téléphone...',
    showing: 'Affichage',
    of: 'de',
    
    // Dashboard - Confirmations
    deleteConfirmation: 'Êtes-vous sûr de vouloir supprimer ceci ?',
    rejectUserConfirmation: 'Êtes-vous sûr de vouloir rejeter cet utilisateur ? Cela supprimera son compte.',
    departmentDeleted: 'Département supprimé avec succès !',
    specialiteDeleted: 'Spécialité supprimée avec succès !',
    eventDeleted: 'Événement supprimé avec succès !',
    userValidated: 'Utilisateur validé avec succès !',
    userRejected: 'Utilisateur rejeté avec succès !',
    failedToLoad: 'Échec du chargement',
    failedToDelete: 'Échec de la suppression',
    failedToValidate: 'Échec de la validation de l\'utilisateur',
  },
  
  ar: {
    // Navbar
    home: 'الرئيسية',
    about: 'عن النادي',
    activities: 'الأنشطة',
    team: 'الفريق',
    contact: 'اتصل بنا',
    joinUs: 'انضم إلينا',
    login: 'تسجيل الدخول',
    register: 'التسجيل',
    logout: 'تسجيل الخروج',
    dashboard: 'لوحة التحكم',
    
    // Hero
    heroTitle: 'مرحبًا بك في نادي إنفينيتي',
    heroSubtitle: 'مجتمع من المبتكرين والمطورين والباحثين في جامعة BBA.',
    discoverProjects: 'اكتشف مشاريعنا',
    
    // About
    aboutTitle: 'عن النادي',
    aboutDescription: 'نادي إنفينيتي هو منظمة طلابية مكرسة لتعزيز الابتكار والتكنولوجيا والتعاون بين الطلاب في جامعة BBA.',
    innovation: 'الابتكار',
    innovationDesc: 'نعزز الإبداع والتفكير الابتكاري في مجال التكنولوجيا',
    technology: 'التكنولوجيا',
    technologyDesc: 'تعلم أحدث التقنيات وممارسات التطوير',
    teamwork: 'العمل الجماعي',
    teamworkDesc: 'تعاون مع أفراد موهوبين في مشاريع حقيقية',
    
    // Activities
    activitiesTitle: 'أنشطتنا',
    activitiesDescription: 'انضم إلينا في ورش العمل والهاكاثون والمحاضرات التقنية المختلفة',
    
    // Team
    teamTitle: 'فريقنا',
    teamDescription: 'تعرف على الأفراد المتحمسين وراء نادي إنفينيتي',
    
    // Footer
    footerDescription: 'بناء المستقبل، سطر برمجي واحد في كل مرة.',
    followUs: 'تابعنا',
    email: 'البريد الإلكتروني',
    
    // Auth
    emailLabel: 'البريد الإلكتروني',
    passwordLabel: 'كلمة المرور',
    nameLabel: 'الاسم الكامل',
    phoneLabel: 'رقم الهاتف',
    bioLabel: 'نبذة',
    specialtyLabel: 'التخصص',
    confirmPasswordLabel: 'تأكيد كلمة المرور',
    loginButton: 'تسجيل الدخول',
    registerButton: 'التسجيل',
    nextStep: 'الخطوة التالية',
    previousStep: 'الخطوة السابقة',
    alreadyHaveAccount: 'هل لديك حساب بالفعل؟',
    dontHaveAccount: 'ليس لديك حساب؟',
    
    // Messages
    loginSuccess: 'تم تسجيل الدخول بنجاح!',
    loginError: 'فشل تسجيل الدخول. يرجى التحقق من بيانات الاعتماد الخاصة بك.',
    registerSuccess: 'تم التسجيل بنجاح! يرجى انتظار التحقق من المسؤول.',
    registerError: 'فشل التسجيل. يرجى المحاولة مرة أخرى.',
    accountNotValidated: 'لم يتم التحقق من حسابك بعد. يرجى انتظار تأكيد المسؤول.',
    
    // Dashboard
    welcomeBack: 'مرحبًا بعودتك',
    yourProfile: 'ملفك الشخصي',
    dashboardOverview: 'نظرة عامة على لوحة التحكم',
    welcomeToAdminPanel: 'مرحبًا بك في لوحة تحكم مسؤول نادي إنفينيتي',
    departments: 'الأقسام',
    specialites: 'التخصصات',
    events: 'الفعاليات',
    users: 'المستخدمون',
    pendingUsers: 'المستخدمون قيد الانتظار',
    quickActions: 'إجراءات سريعة',
    recentActivity: 'النشاط الأخير',
    reviewAndValidate: 'مراجعة والتحقق من التسجيلات الجديدة',
    addEditDelete: 'إضافة أو تعديل أو حذف الأقسام',
    organizeNewEvent: 'تنظيم فعالية جديدة للنادي',
    browseAllMembers: 'تصفح جميع أعضاء النادي',
    systemInitialized: 'تم تهيئة النظام بنجاح',
    justNow: 'الآن',
    adminDashboard: 'لوحة تحكم المسؤول',
    backToHome: 'العودة إلى الصفحة الرئيسية',
    
    // Dashboard - Stats & Actions
    validatedUsers: 'المستخدمون المعتمدون',
    viewAllValidatedMembers: 'عرض جميع الأعضاء المعتمدين في النادي',
    manageAllDepartments: 'إدارة جميع الأقسام',
    manageAllSpecialites: 'إدارة جميع التخصصات',
    manageAllEvents: 'إدارة جميع فعاليات النادي',
    usersAwaitingValidation: 'المستخدمون في انتظار التحقق',
    allCaughtUp: 'كل شيء محدث!',
    noPendingUsers: 'لا يوجد مستخدمون قيد الانتظار للتحقق في الوقت الحالي.',
    
    // Dashboard - Tables
    departmentName: 'اسم القسم',
    description: 'الوصف',
    actions: 'الإجراءات',
    name: 'الاسم',
    phone: 'الهاتف',
    role: 'الدور',
    specialite: 'التخصص',
    registered: 'مسجل',
    date: 'التاريخ',
    location: 'المكان',
    
    // Dashboard - Buttons
    addDepartment: 'إضافة قسم',
    addSpecialite: 'إضافة تخصص',
    addEvent: 'إضافة فعالية',
    edit: 'تعديل',
    delete: 'حذف',
    validate: 'تأكيد',
    reject: 'رفض',
    
    // Dashboard - Messages
    noDepartmentsFound: 'لم يتم العثور على أقسام',
    noSpecialitesFound: 'لم يتم العثور على تخصصات',
    noEventsFound: 'لم يتم العثور على فعاليات',
    noUsersFound: 'لم يتم العثور على مستخدمين يطابقون بحثك',
    createFirstDepartment: 'إنشاء قسمك الأول',
    createFirstSpecialite: 'إنشاء تخصصك الأول',
    createFirstEvent: 'إنشاء فعاليتك الأولى',
    searchByName: 'البحث بالاسم أو البريد الإلكتروني أو الهاتف...',
    showing: 'عرض',
    of: 'من',
    
    // Dashboard - Confirmations
    deleteConfirmation: 'هل أنت متأكد أنك تريد حذف هذا؟',
    rejectUserConfirmation: 'هل أنت متأكد أنك تريد رفض هذا المستخدم؟ سيؤدي هذا إلى حذف حسابه.',
    departmentDeleted: 'تم حذف القسم بنجاح!',
    specialiteDeleted: 'تم حذف التخصص بنجاح!',
    eventDeleted: 'تم حذف الفعالية بنجاح!',
    userValidated: 'تم التحقق من المستخدم بنجاح!',
    userRejected: 'تم رفض المستخدم بنجاح!',
    failedToLoad: 'فشل التحميل',
    failedToDelete: 'فشل الحذف',
    failedToValidate: 'فشل التحقق من المستخدم',
  },
};

export const getTranslation = (locale: Locale, key: keyof Translations): string => {
  return translations[locale]?.[key] || translations['en'][key] || key;
};
