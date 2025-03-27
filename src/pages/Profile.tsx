
import React from 'react';
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <PageLayout 
      title="Profile Information" 
      subtitle="Manage your account details"
    >
      <div className="mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-primary" />
            </div>
            <div>
              <CardTitle>{user?.name}</CardTitle>
              <CardDescription>{user?.email}</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">User ID</h3>
                <p className="font-medium">{user?.id}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Account Created</h3>
                <p className="font-medium">July 15, 2023</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Edit Profile
            </Button>
          </CardFooter>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Profile;
