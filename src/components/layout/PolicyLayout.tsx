import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PolicyLayoutProps {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}

export const PolicyLayout = ({ title, lastUpdated, children }: PolicyLayoutProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-6">
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              className="-ml-2"
            >
              <Home className="h-4 w-4 mr-2" />
              Home
            </Button>
          </div>
          
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {title}
            </h1>
            <p className="text-sm text-muted-foreground">
              Last updated: {lastUpdated}
            </p>
          </div>
          
          <div className="prose prose-gray max-w-none dark:prose-invert policy-content">
            {children}
          </div>
          
          <style dangerouslySetInnerHTML={{
            __html: `
              .policy-content h2 {
                font-size: 1.5rem;
                font-weight: 600;
                margin-top: 2rem;
                margin-bottom: 1rem;
                color: hsl(var(--foreground));
                border-bottom: 1px solid hsl(var(--border));
                padding-bottom: 0.5rem;
              }
              .policy-content h3 {
                font-size: 1.25rem;
                font-weight: 600;
                margin-top: 1.5rem;
                margin-bottom: 0.75rem;
                color: hsl(var(--foreground));
              }
              .policy-content p {
                margin-bottom: 1rem;
                line-height: 1.6;
                color: hsl(var(--foreground));
              }
              .policy-content ul {
                margin-bottom: 1rem;
              }
              .policy-content li {
                margin-bottom: 0.5rem;
              }
              .policy-content a {
                color: hsl(var(--primary));
                text-decoration: underline;
              }
              .policy-content a:hover {
                color: hsl(var(--primary));
                opacity: 0.8;
              }
            `
          }} />
        </motion.div>
      </div>
    </div>
  );
};