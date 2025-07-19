import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
  color?: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  icon: Icon, 
  value, 
  label, 
  color = 'text-primary-600' 
}) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex items-center">
        <Icon size={24} className={`${color} mr-3`} />
        <div>
          <div className="text-2xl font-bold text-gray-900">{value}</div>
          <div className="text-sm text-gray-600">{label}</div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;