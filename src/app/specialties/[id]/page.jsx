'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { specialitesAPI } from '@/utils/api';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Loader2, ArrowLeft, Mail, Phone } from 'lucide-react';

export default function SpecialtyDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  
  const [specialty, setSpecialty] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSpecialtyData();
  }, [params.id]);

  const fetchSpecialtyData = async () => {
    try {
      setLoading(true);
      
      // Fetch specialty info
      const specResponse = await specialitesAPI.getById(params.id);
      const spec = specResponse.data.data || specResponse.data;
      setSpecialty(spec);
      
      // Fetch users for this specialty
      const usersResponse = await specialitesAPI.getUsers(params.id);
      setUsers(usersResponse.data.data || usersResponse.data || []);
    } catch (error) {
      console.error('Error fetching specialty:', error);
      toast({
        title: 'Error',
        description: 'Failed to load specialty details',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-hero" />
      </div>
    );
  }

  if (!specialty) {
    return (
      <div className="min-h-screen p-4 md:p-8 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Card className="text-center p-8">
            <p className="text-muted-foreground">Specialty not found</p>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 bg-muted/50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{specialty.name || specialty.nom}</h1>
          <p className="text-muted-foreground">
            {specialty.description || 'No description provided'}
          </p>
        </div>

        {/* Users Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Members ({users.length})</h2>
          
          {users.length === 0 ? (
            <Card className="text-center p-8">
              <p className="text-muted-foreground">No members found in this specialty</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {users.map((user) => (
                <Card key={user.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={user.avatar_url} />
                        <AvatarFallback>
                          {user.name?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{user.name}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {user.bio && (
                      <p className="text-sm text-muted-foreground">{user.bio}</p>
                    )}
                    <div className="space-y-1">
                      {user.email && (
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Mail className="w-4 h-4 mr-2" />
                          {user.email}
                        </div>
                      )}
                      {user.phone && (
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Phone className="w-4 h-4 mr-2" />
                          {user.phone}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
