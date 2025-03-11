import { components } from '../../styles/theme';
import { Link } from 'react-router-dom';

export const Button = ({ children, variant = 'primary', size = 'md', className = '', as: Component = 'button', to, ...props }) => {
  const classes = `${components.button.base} ${components.button.sizes[size]} ${components.button.variants[variant]} ${className}`;
  
  if (Component === Link || to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
};

export const Card = ({ children, padding = 'md', className = '', ...props }) => {
  const classes = `${components.card.base} ${components.card.padding[padding]} ${className}`;
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export const Badge = ({ children, variant = 'info', className = '', ...props }) => {
  const classes = `${components.badge.base} ${components.badge.variants[variant]} ${className}`;
  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
};

export const Input = ({ size = 'md', className = '', ...props }) => {
  const classes = `${components.input.base} ${components.input.sizes[size]} ${className}`;
  return (
    <input className={classes} {...props} />
  );
};

export const Container = ({ children, className = '', ...props }) => {
  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`} {...props}>
      {children}
    </div>
  );
};

export const PageHeader = ({ title, subtitle, action }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          {subtitle && <p className="mt-2 text-sm text-gray-600">{subtitle}</p>}
        </div>
        {action && <div>{action}</div>}
      </div>
    </div>
  );
};

export const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <div className="w-full h-full border-2 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
  );
};

export const EmptyState = ({ icon: Icon, title, description, action }) => {
  return (
    <div className="text-center py-12">
      {Icon && <Icon className="mx-auto h-12 w-12 text-gray-400" />}
      <h3 className="mt-2 text-lg font-medium text-gray-900">{title}</h3>
      {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}; 