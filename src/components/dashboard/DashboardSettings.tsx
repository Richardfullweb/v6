import React, { useState } from 'react';
import { CreditCard, Plus, Check, Users } from 'lucide-react';
import AccountSettings from './AccountSettings';
import UserManagement from './UserManagement';

export default function DashboardSettings() {
  const [activeSection, setActiveSection] = useState('account');
  const [formData, setFormData] = useState({
    name: 'Fr. Michael Thomas',
    email: 'fr.michael@diocese.org',
    phone: '+1 (555) 123-4567',
    title: 'Parish Priest',
    organization: 'St. Patrick\'s Cathedral',
    diocese: 'Diocese of New York',
    timezone: 'America/New_York',
    language: 'en'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const settingsSections = [
    { id: 'account', name: 'Account Settings' },
    { id: 'billing', name: 'Billing & Payments' },
    { id: 'notifications', name: 'Notifications' },
    { id: 'security', name: 'Security' },
    { id: 'users', name: 'User Management', icon: Users },
    { id: 'integrations', name: 'Integrations' }
  ];

  const renderSettingsContent = () => {
    switch (activeSection) {
      case 'account':
        return (
          <AccountSettings 
            formData={formData}
            onInputChange={handleInputChange}
          />
        );

      case 'users':
        return <UserManagement />;

      // ... rest of the cases remain the same
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Settings Navigation */}
        <div className="lg:w-64 flex-shrink-0">
          <nav className="space-y-1">
            {settingsSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                  activeSection === section.id
                    ? 'bg-red-50 text-red-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {section.icon && <section.icon className="h-5 w-5 mr-2" />}
                {section.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            {renderSettingsContent()}
          </div>
        </div>
      </div>
    </div>
  );
}