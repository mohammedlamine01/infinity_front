'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { specialitesAPI } from '@/utils/api';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, ChevronRight, Users } from 'lucide-react';

export default function SpecialtiesPage() {
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchSpecialties();
  }, []);

  const fetchSpecialties = async () => {
    try {
      setLoading(true);
      const response = await specialitesAPI.getAll();
      setSpecialties(response.data.data || response.data || []);
    } catch (error) {
      console.error('Error fetching specialties:', error);
      toast({
        title: 'Error',
        description: 'Failed to load specialties',
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

  return (
    <div className="min-h-screen p-4 md:p-8 bg-muted/50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Specialties</h1>
          <p className="text-muted-foreground">Browse all available specialties and their members</p>
        </div>

        {/* Specialties Grid */}
        {specialties.length === 0 ? (
          <Card className="text-center p-8">
            <p className="text-muted-foreground">No specialties found</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {specialties.map((specialty) => (
              <Link
                key={specialty.id}
                href={`/specialties/${specialty.id}`}
              >
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {specialty.name || specialty.nom}
                      <ChevronRight className="w-5 h-5" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      {specialty.description || 'No description provided'}
                    </p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="w-4 h-4 mr-2" />
                      View members
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
