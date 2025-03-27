
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const Navigation = () => {
  const { user, logout } = useAuth();

  return (
    <div className="bg-background border-b py-3 px-4 flex justify-between items-center">
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-primary">Smart Services</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">
          Welcome, {user?.name}
        </span>
        <Button variant="outline" size="sm" onClick={logout}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Navigation;
