import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
}

interface CertificationsFormProps {
  certifications: Certification[];
  onChange: (certifications: Certification[]) => void;
}

export default function CertificationsForm({ certifications, onChange }: CertificationsFormProps) {
  const [newCertification, setNewCertification] = useState<Certification>({
    id: '',
    name: '',
    issuer: '',
    year: ''
  });

  const addCertification = () => {
    if (newCertification.name && newCertification.issuer && newCertification.year) {
      const certification = {
        ...newCertification,
        id: Date.now().toString()
      };
      onChange([...certifications, certification]);
      setNewCertification({ id: '', name: '', issuer: '', year: '' });
    }
  };

  const removeCertification = (id: string) => {
    onChange(certifications.filter(cert => cert.id !== id));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Certifications</h3>
      
      <div className="space-y-3">
        {certifications.map((cert) => (
          <div key={cert.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">{cert.name}</p>
              <p className="text-sm text-gray-600">{cert.issuer} ({cert.year})</p>
            </div>
            <button
              onClick={() => removeCertification(cert.id)}
              className="text-red-500 hover:text-red-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <input
          type="text"
          placeholder="Certification Name"
          value={newCertification.name}
          onChange={(e) => setNewCertification({ ...newCertification, name: e.target.value })}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Issuer"
          value={newCertification.issuer}
          onChange={(e) => setNewCertification({ ...newCertification, issuer: e.target.value })}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Year"
          value={newCertification.year}
          onChange={(e) => setNewCertification({ ...newCertification, year: e.target.value })}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        onClick={addCertification}
        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        <Plus className="w-4 h-4" />
        Add Certification
      </button>
    </div>
  );
}
