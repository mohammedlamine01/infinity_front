"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Loader2, ChevronLeft, ExternalLink, User, Search } from 'lucide-react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export default function DepartmentBrowser() {
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [specialties, setSpecialties] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userLinks, setUserLinks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState({
    departments: false,
    specialties: false,
    users: false,
    links: false
  });
  const [error, setError] = useState(null);

  // Fetch all departments on component mount
  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    setLoading(prev => ({ ...prev, departments: true }));
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/departments`, {
        headers: {
          'Accept': 'application/json',
        }
      });
      if (!response.ok) throw new Error('Failed to fetch departments');
      const data = await response.json();
      setDepartments(Array.isArray(data) ? data : data.data || []);
    } catch (err) {
      setError('Unable to load departments. Please try again.');
      console.error('Error fetching departments:', err);
    } finally {
      setLoading(prev => ({ ...prev, departments: false }));
    }
  };

  // Fetch specialties when department is selected
  const handleDepartmentChange = async (departmentId) => {
    const dept = departments.find(d => d.id === parseInt(departmentId));
    setSelectedDepartment(dept);
    setSelectedSpecialty(null);
    setSelectedUser(null);
    setUsers([]);
    setUserLinks([]);
    setSpecialties([]);
    setSearchQuery(''); // Clear search when changing department

    if (!departmentId) return;

    setLoading(prev => ({ ...prev, specialties: true }));
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/departments/${departmentId}/specialites`, {
        headers: {
          'Accept': 'application/json',
        }
      });
      if (!response.ok) throw new Error('Failed to fetch specialties');
      const data = await response.json();
      setSpecialties(Array.isArray(data) ? data : data.data || []);
    } catch (err) {
      setError('Unable to load specialties. Please try again.');
      console.error('Error fetching specialties:', err);
    } finally {
      setLoading(prev => ({ ...prev, specialties: false }));
    }
  };

  // Fetch users when specialty is selected
  const handleSpecialtyClick = async (specialty) => {
    setSelectedSpecialty(specialty);
    setSelectedUser(null);
    setUserLinks([]);
    setUsers([]);
    setSearchQuery(''); // Clear search when changing specialty

    setLoading(prev => ({ ...prev, users: true }));
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/specialites/${specialty.id}/users`, {
        headers: {
          'Accept': 'application/json',
        }
      });
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      const allUsers = Array.isArray(data) ? data : data.data || [];
      // Filter only valid users
      const validUsers = allUsers.filter(user => user.is_valid === 1);
      setUsers(validUsers);
    } catch (err) {
      setError('Unable to load users. Please try again.');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(prev => ({ ...prev, users: false }));
    }
  };

  // Fetch user links when user is selected
  const handleUserClick = async (user) => {
    setSelectedUser(user);
    setUserLinks([]);
    setSearchQuery(''); // Clear search when selecting user

    setLoading(prev => ({ ...prev, links: true }));
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/links/${user.id}`, {
        headers: {
          'Accept': 'application/json',
        }
      });
      if (!response.ok) throw new Error('Failed to fetch user links');
      const data = await response.json();
      setUserLinks(Array.isArray(data) ? data : data.data || []);
    } catch (err) {
      setError('Unable to load user links. Please try again.');
      console.error('Error fetching user links:', err);
    } finally {
      setLoading(prev => ({ ...prev, links: false }));
    }
  };

  // Reset to specialty view
  const backToUsers = () => {
    setSelectedUser(null);
    setUserLinks([]);
    setSearchQuery(''); // Clear search when going back
  };

  // Reset to specialties view
  const backToSpecialties = () => {
    setSelectedSpecialty(null);
    setSelectedUser(null);
    setUsers([]);
    setUserLinks([]);
    setSearchQuery(''); // Clear search when going back
  };

  // Get user initials for avatar fallback
  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Filter specialties based on search query
  const filteredSpecialties = specialties.filter(specialty =>
    specialty.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    specialty.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter users based on search query
  const filteredUsers = users.filter(user =>
    user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.bio?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter links based on search query
  const filteredLinks = userLinks.filter(link =>
    link.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    link.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    link.url?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    link.platform?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Browse Members</h1>
        <p className="text-muted-foreground">
          Explore departments, specialties, and connect with our members
        </p>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-destructive/10 text-destructive rounded-lg">
          {error}
        </div>
      )}

      {/* Department Selector */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Select a Department</CardTitle>
          <CardDescription>
            Choose a department to explore its specialties
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Select onValueChange={handleDepartmentChange} disabled={loading.departments}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={loading.departments ? "Loading departments..." : "Select a department"} />
            </SelectTrigger>
            <SelectContent>
              {departments.map((dept) => (
                <SelectItem key={dept.id} value={dept.id.toString()}>
                  {dept.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Specialties Grid */}
      {selectedDepartment && !selectedSpecialty && (
        <div>
          <div className="mb-4 space-y-4">
            <div>
              <h2 className="text-2xl font-semibold">{selectedDepartment.name} - Specialties</h2>
              <p className="text-muted-foreground">Click on a specialty to view members</p>
            </div>
            
            {/* Search Input for Specialties */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search specialties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          {loading.specialties ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredSpecialties.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                {searchQuery ? 'No specialties match your search.' : 'No specialties found for this department.'}
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSpecialties.map((specialty) => (
                <Card 
                  key={specialty.id} 
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => handleSpecialtyClick(specialty)}
                >
                  <CardHeader>
                    <CardTitle className="text-lg">{specialty.name}</CardTitle>
                    {specialty.description && (
                      <CardDescription className="line-clamp-2">
                        {specialty.description}
                      </CardDescription>
                    )}
                  </CardHeader>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Users Grid */}
      {selectedSpecialty && !selectedUser && (
        <div>
          <div className="mb-4 flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={backToSpecialties}>
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Specialties
            </Button>
          </div>
          
          <div className="mb-4 space-y-4">
            <div>
              <h2 className="text-2xl font-semibold">{selectedSpecialty.name} - Members</h2>
              <p className="text-muted-foreground">Click on a member to view their links</p>
            </div>
            
            {/* Search Input for Users */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {loading.users ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredUsers.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                {searchQuery ? 'No members match your search.' : 'No members found for this specialty.'}
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUsers.map((user) => (
                <Card 
                  key={user.id} 
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => handleUserClick(user)}
                >
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <Avatar className="h-20 w-20 mb-4">
                        <AvatarImage src={user.profile_photo_url} alt={user.name} />
                        <AvatarFallback>
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="font-semibold text-lg mb-1">{user.name}</h3>
                      {user.role && (
                        <Badge variant="secondary" className="mb-2">
                          {user.role}
                        </Badge>
                      )}
                      {user.bio && (
                        <p className="text-sm text-muted-foreground line-clamp-3 mt-2">
                          {user.bio}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* User Links */}
      {selectedUser && (
        <div>
          <div className="mb-4 flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={backToUsers}>
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Members
            </Button>
          </div>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedUser.profile_photo_url} alt={selectedUser.name} />
                  <AvatarFallback>
                    {getInitials(selectedUser.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold mb-1">{selectedUser.name}</h2>
                  {selectedUser.role && (
                    <Badge variant="secondary" className="mb-2">
                      {selectedUser.role}
                    </Badge>
                  )}
                  {selectedUser.bio && (
                    <p className="text-muted-foreground mt-2">{selectedUser.bio}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mb-4 space-y-4">
            <div>
              <h3 className="text-xl font-semibold">Links & Resources</h3>
              <p className="text-muted-foreground">Connect with {selectedUser.name}</p>
            </div>
            
            {/* Search Input for Links */}
            {userLinks.length > 0 && (
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search links..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            )}
          </div>

          {loading.links ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredLinks.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                {searchQuery ? 'No links match your search.' : 'No links available for this user.'}
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredLinks.map((link) => (
                <Card key={link.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{link.title || 'Link'}</h4>
                        {link.description && (
                          <p className="text-sm text-muted-foreground mb-3">
                            {link.description}
                          </p>
                        )}
                        <a 
                          href={link.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline flex items-center gap-1"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {link.url}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                      {link.platform && (
                        <Badge variant="outline">{link.platform}</Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
