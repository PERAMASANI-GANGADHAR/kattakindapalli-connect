import React, { createContext, useContext, useState, useEffect } from 'react';

const ComplaintContext = createContext();

export const ComplaintProvider = ({ children }) => {
  // లోకల్ స్టోరేజ్ నుండి డేటా తెచ్చుకోవడం, లేదంటే డీఫాల్ట్ శాంపిల్ డేటా
  const [complaints, setComplaints] = useState(() => {
    const saved = localStorage.getItem('kkp_complaints');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [
      {
        id: 'KKP-1001',
        name: 'Ramesh Kumar',
        phone: '9876543210',
        category: 'Street Light',
        ward: 'Ward 2',
        location: 'Main Road',
        description: 'వీధి దీపం వెలగడం లేదు, రాత్రి సమయంలో చీకటిగా ఉంటోంది.',
        status: 'In Progress',
        assignedTo: 'Electrician - Srinu',
        date: '2026-06-25'
      }
    ];
  });

  // complaints మారినప్పుడల్లా లోకల్ స్టోరేజ్‌లో సేవ్ అవుతుంది
  useEffect(() => {
    localStorage.setItem('kkp_complaints', JSON.stringify(complaints));
  }, [complaints]);

  // యూజర్ కొత్త ఫిర్యాదు సబ్మిట్ చేసినప్పుడు
  const addComplaint = (newComplaint) => {
    const randomId = 'KKP-' + Math.floor(1000 + Math.random() * 9000);
    const newEntry = {
      id: randomId,
      status: 'Submitted',
      date: new Date().toISOString().split('T')[0],
      assignedTo: 'పంచాయితీ కార్యాలయం (పరిశీలనలో ఉంది)',
      ...newComplaint
    };

    setComplaints((prev) => [newEntry, ...prev]);
    return randomId; // యూజర్‌కి చూపించడానికి ID రిటర్న్ చేస్తుంది
  };

  // సర్పంచ్ / అడ్మిన్ ప్యానెల్ లో స్టేటస్ మార్చినప్పుడు
  const updateStatus = (id, newStatus, assignedTo) => {
    setComplaints((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: newStatus, assignedTo: assignedTo || item.assignedTo } : item
      )
    );
  };

  return (
    <ComplaintContext.Provider value={{ complaints, addComplaint, updateStatus }}>
      {children}
    </ComplaintContext.Provider>
  );
};

export const useComplaints = () => useContext(ComplaintContext);