/**
 * STANDALONE MODERN SEARCH INTERFACE EXAMPLE
 * ==========================================
 * 
 * This is a complete, standalone example showing how to build a modern
 * search interface using ShadCN UI components.
 * 
 * Features:
 * - Real-time search with Input component
 * - Tab-based filtering with Tabs component
 * - Beautiful Card layouts for results
 * - Badge for user roles
 * - Avatar with fallbacks
 * - Framer Motion animations
 * - Responsive grid and list views
 * 
 * Requirements:
 * - ShadCN UI components installed
 * - Framer Motion installed
 * - Tailwind CSS configured
 */

"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Mail, Phone, ExternalLink, Grid3x3, List } from 'lucide-react';
import { motion } from 'framer-motion';

// ============================================================================
// SAMPLE DATA - Replace with your API calls
// ============================================================================

const sampleUsers = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    role: "Admin",
    department: "Engineering",
    specialty: "Software Development",
    bio: "Experienced full-stack developer passionate about building scalable applications.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John"
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    phone: "+1 (555) 234-5678",
    role: "Member",
    department: "Design",
    specialty: "UI/UX Design",
    bio: "Creative designer focused on user experience and modern interfaces.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane"
  },
  {
    id: 3,
    firstName: "Mike",
    lastName: "Johnson",
    email: "mike.j@example.com",
    phone: "+1 (555) 345-6789",
    role: "President",
    department: "Management",
    specialty: "Business Strategy",
    bio: "Strategic leader with 10+ years of experience in business development.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike"
  },
  {
    id: 4,
    firstName: "Sarah",
    lastName: "Williams",
    email: "sarah.w@example.com",
    phone: "+1 (555) 456-7890",
    role: "Moderator",
    department: "Engineering",
    specialty: "DevOps",
    bio: "DevOps specialist ensuring smooth deployments and infrastructure.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
  },
  {
    id: 5,
    firstName: "David",
    lastName: "Brown",
    email: "david.brown@example.com",
    phone: "+1 (555) 567-8901",
    role: "Member",
    department: "Design",
    specialty: "Graphic Design",
    bio: "Visual designer creating stunning graphics and brand identities.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David"
  }
];

const sampleDepartments = [
  { id: 1, name: "Engineering" },
  { id: 2, name: "Design" },
  { id: 3, name: "Management" },
  { id: 4, name: "Marketing" }
];

const sampleSpecialties = {
  1: [
    { id: 101, name: "Software Development" },
    { id: 102, name: "DevOps" },
    { id: 103, name: "Data Science" }
  ],
  2: [
    { id: 201, name: "UI/UX Design" },
    { id: 202, name: "Graphic Design" },
    { id: 203, name: "Product Design" }
  ],
  3: [
    { id: 301, name: "Business Strategy" },
    { id: 302, name: "Project Management" },
    { id: 303, name: "Operations" }
  ],
  4: [
    { id: 401, name: "Digital Marketing" },
    { id: 402, name: "Content Strategy" },
    { id: 403, name: "SEO" }
  ]
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function StandaloneSearchInterface() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const [activeTab, setActiveTab] = useState('all');

  // Filter users based on search query and filters
  const filteredUsers = sampleUsers.filter(user => {
    const matchesSearch = searchQuery === '' || 
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDepartment = !selectedDepartment || user.department === selectedDepartment.name;
    const matchesSpecialty = !selectedSpecialty || user.specialty === selectedSpecialty.name;

    return matchesSearch && matchesDepartment && matchesSpecialty;
  });

  const handleDepartmentSelect = (dept) => {
    setSelectedDepartment(dept);
    setSelectedSpecialty(null); // Reset specialty when department changes
  };

  const clearFilters = () => {
    setSelectedDepartment(null);
    setSelectedSpecialty(null);
    setSearchQuery('');
    setActiveTab('all');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 p-8">
      <div className="container mx-auto max-w-7xl">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Modern Search Interface
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Example using ShadCN UI Components
          </p>
        </motion.div>

        {/* Search Bar */}
        <Card className="mb-8 shadow-lg">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                type="text"
                placeholder="Search by name, email, or role..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-lg"
              />
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Filters</CardTitle>
              {(selectedDepartment || selectedSpecialty) && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear All
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="all">All Members</TabsTrigger>
                <TabsTrigger value="filtered">By Category</TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <p className="text-center py-8 text-slate-600">
                  Showing all members. Switch to "By Category" to filter.
                </p>
              </TabsContent>

              <TabsContent value="filtered" className="space-y-6">
                {/* Departments */}
                <div>
                  <label className="text-sm font-semibold mb-3 block">Department</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {sampleDepartments.map(dept => (
                      <Button
                        key={dept.id}
                        variant={selectedDepartment?.id === dept.id ? "default" : "outline"}
                        onClick={() => handleDepartmentSelect(dept)}
                        className="w-full"
                      >
                        {dept.name}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Specialties */}
                {selectedDepartment && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                  >
                    <label className="text-sm font-semibold mb-3 block">
                      Specialty in {selectedDepartment.name}
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {sampleSpecialties[selectedDepartment.id]?.map(spec => (
                        <Button
                          key={spec.id}
                          variant={selectedSpecialty?.id === spec.id ? "default" : "outline"}
                          onClick={() => setSelectedSpecialty(spec)}
                          className="w-full"
                        >
                          {spec.name}
                        </Button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* View Mode Toggle */}
        {filteredUsers.length > 0 && (
          <div className="flex justify-between items-center mb-6">
            <div>
              <span className="text-2xl font-bold">{filteredUsers.length}</span>
              <span className="ml-2 text-slate-600">
                {filteredUsers.length === 1 ? 'member' : 'members'}
              </span>
            </div>
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid3x3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Results */}
        <div className={viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
          : 'space-y-4'
        }>
          {filteredUsers.map((user, index) => (
            <UserCard key={user.id} user={user} index={index} viewMode={viewMode} />
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <Card className="text-center py-16">
            <CardContent>
              <p className="text-xl text-slate-600">No members found</p>
              <p className="text-slate-500 mt-2">Try adjusting your filters</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// USER CARD COMPONENT
// ============================================================================

function UserCard({ user, index, viewMode }) {
  const getInitials = (firstName, lastName) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
  };

  const getRoleBadgeColor = (role) => {
    const colors = {
      admin: 'bg-red-100 text-red-700',
      president: 'bg-purple-100 text-purple-700',
      member: 'bg-blue-100 text-blue-700',
      moderator: 'bg-green-100 text-green-700',
    };
    return colors[role.toLowerCase()] || 'bg-slate-100 text-slate-700';
  };

  // List View
  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 }}
      >
        <Card className="hover:shadow-lg transition-all">
          <CardContent className="p-6">
            <div className="flex items-center gap-6">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="text-xl font-bold">
                  {getInitials(user.firstName, user.lastName)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-xl font-bold">
                      {user.firstName} {user.lastName}
                    </h3>
                    <Badge className={getRoleBadgeColor(user.role)}>
                      {user.role}
                    </Badge>
                  </div>
                  <Button size="sm">
                    View Profile
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                
                <p className="text-slate-600 mb-2 line-clamp-2">{user.bio}</p>
                
                <div className="flex gap-4 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>{user.phone}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  // Grid View
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -8 }}
    >
      <Card className="h-full hover:shadow-2xl transition-all border-2 hover:border-blue-500">
        <CardHeader className="text-center bg-gradient-to-br from-slate-50 to-blue-50">
          <Avatar className="h-24 w-24 mx-auto mb-4">
            <AvatarImage src={user.avatar} />
            <AvatarFallback className="text-2xl font-bold">
              {getInitials(user.firstName, user.lastName)}
            </AvatarFallback>
          </Avatar>
          
          <CardTitle className="text-xl">
            {user.firstName} {user.lastName}
          </CardTitle>
          
          <Badge className={getRoleBadgeColor(user.role)}>
            {user.role}
          </Badge>
        </CardHeader>

        <CardContent className="pt-4">
          <CardDescription className="text-center mb-4 line-clamp-3 min-h-[4.5rem]">
            {user.bio}
          </CardDescription>

          <div className="space-y-3 mb-4">
            <div className="flex items-center gap-2 text-sm text-slate-600 p-2 rounded bg-slate-50">
              <Mail className="h-4 w-4" />
              <span className="truncate">{user.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600 p-2 rounded bg-slate-50">
              <Phone className="h-4 w-4" />
              <span>{user.phone}</span>
            </div>
          </div>

          <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
            View Profile
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ============================================================================
// USAGE INSTRUCTIONS
// ============================================================================

/**
 * HOW TO USE THIS COMPONENT:
 * 
 * 1. Install required packages:
 *    npx shadcn@latest add card input button tabs badge avatar
 *    npm install framer-motion lucide-react
 * 
 * 2. Import and use:
 *    import StandaloneSearchInterface from './StandaloneSearchInterface'
 *    
 *    export default function Page() {
 *      return <StandaloneSearchInterface />
 *    }
 * 
 * 3. Customize:
 *    - Replace sampleUsers with your API data
 *    - Modify colors in className strings
 *    - Add more filters or fields as needed
 * 
 * 4. API Integration:
 *    Replace the useState hooks with useEffect + fetch calls:
 *    
 *    useEffect(() => {
 *      fetch('/api/users')
 *        .then(res => res.json())
 *        .then(data => setUsers(data))
 *    }, [])
 */
