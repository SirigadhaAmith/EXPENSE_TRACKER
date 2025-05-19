import React from 'react';
import { AlertTriangle, AlertCircle } from 'lucide-react';
import { SpendingAlert } from '../types';

interface Props {
  alerts: SpendingAlert[];
}

const SpendingAlerts: React.FC<Props> = ({ alerts }) => {
  if (alerts.length === 0) return null;

  return (
    <div className="space-y-3">
      {alerts.map((alert, index) => (
        <div
          key={index}
          className={`flex items-center gap-3 p-4 rounded-xl ${
            alert.type === 'danger' 
              ? 'bg-red-50 text-red-700 border border-red-200'
              : 'bg-yellow-50 text-yellow-700 border border-yellow-200'
          }`}
        >
          {alert.type === 'danger' ? (
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
          ) : (
            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
          )}
          <p className="text-sm font-medium">{alert.message}</p>
        </div>
      ))}
    </div>
  );
};

export default SpendingAlerts;