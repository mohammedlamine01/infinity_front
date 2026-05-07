'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { departmentsAPI } from '@/utils/api';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, ArrowLeft, Users } from 'lucide-react';

export default function DepartmentDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  
  const [department, setDepartment] = useState(null);
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDepartmentData();
  }, [params.id]);

  const fetchDepartmentData = async () => {
    try {
      setLoading(true);
      
      // Fetch department info
      const deptResponse = await departmentsAPI.getById(params.id);
      const dept = deptResponse.data.data || deptResponse.data;
      setDepartment(dept);
      
      // Fetch specialties for this department
      const specResponse = await departmentsAPI.getSpecialites(params.id);
      setSpecialties(specResponse.data.data || specResponse.data || []);
    } catch (error) {
      console.error('Error fetching department:', error);
      toast({
        title: 'Error',
        description: 'Failed to load department details',
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

  if (!department) {
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
            <p className="text-muted-foreground">Department not found</p>
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
          <h1 className="text-4xl font-bold mb-2">{department.name || department.nom}</h1>
          <p className="text-muted-foreground">
            {department.description || 'No description provided'}
          </p>
        </div>

        {/* Specialties Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Specialties</h2>
          
          {specialties.length === 0 ? (
            <Card className="text-center p-8">
              <p className="text-muted-foreground">No specialties found for this department</p>
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
                      <CardTitle>{specialty.name || specialty.nom}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        {specialty.description || 'No description'}
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
    </div>
  );
}
