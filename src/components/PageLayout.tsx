
import React from 'react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Settings, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

const PageLayout = ({ children, title, subtitle }: PageLayoutProps) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
            {subtitle && <p className="mt-1 text-sm text-gray-600">{subtitle}</p>}
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              <Settings className="w-6 h-6 text-gray-600 hover:text-gray-900 transition-colors" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => navigate("/profile")} className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Profile Info</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>

      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            © 2025 Smart Services. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PageLayout;
