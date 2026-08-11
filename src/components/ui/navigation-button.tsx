import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigation, NavigationType } from '@/hooks/use-navigation';
import { cn } from '@/lib/utils';

interface NavigationButtonProps {
  children: React.ReactNode;
  to: string;
  type?: NavigationType;
  sectionId?: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export function NavigationButton({
  children,
  to,
  type = 'action',
  sectionId,
  variant = 'default',
  size = 'default',
  className,
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'right',
  ...props
}: NavigationButtonProps) {
  const { navigateTo } = useNavigation();

  const handleClick = () => {
    if (disabled || loading) return;
    
    navigateTo(to, { 
      type, 
      sectionId,
      smooth: true 
    });
  };

  const renderIcon = () => {
    if (!icon) return null;
    
    return (
      <span className={cn(
        "inline-flex items-center",
        iconPosition === 'left' ? 'mr-2' : 'ml-2'
      )}>
        {icon}
      </span>
    );
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={cn(
        "transition-all duration-200",
        "hover:scale-105 active:scale-95",
        "focus:ring-2 focus:ring-orange-primary/20",
        loading && "opacity-75 cursor-not-allowed",
        className
      )}
      onClick={handleClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {iconPosition === 'left' && renderIcon()}
      {children}
      {iconPosition === 'right' && renderIcon()}
    </Button>
  );
}
