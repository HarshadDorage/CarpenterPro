'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BellRing } from 'lucide-react';

const plantData = [
  { name: 'Tulsi (Holy Basil)', water: 'Every day', sun: 'Needs good sunlight' },
  { name: 'Money Plant', water: 'Every 5-7 days', sun: 'Grows in low to bright light' },
  { name: 'Neem', water: 'Every 7-10 days', sun: 'Loves full sunlight' },
  { name: 'Aloe Vera', water: 'Once a week', sun: 'Needs sunlight' },
  { name: 'Banana Plant', water: 'Every 3 days', sun: 'Loves full sunlight' }
];

export default function PlantCareReminder() {
  const [selectedPlant, setSelectedPlant] = useState(plantData[0]);
  const [notificationPermission, setNotificationPermission] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setNotificationPermission(Notification.permission);
    }
  }, []);

  useEffect(() => {
    if (notificationPermission === 'granted') {
      sendNotification();
    }
  }, [selectedPlant, notificationPermission]);

  const requestPermission = () => {
    if ('Notification' in window) {
      Notification.requestPermission().then(setNotificationPermission);
    }
  };

  const sendNotification = () => {
    if (notificationPermission !== 'granted') return;
    new Notification('🌱 Plant Care Reminder', {
      body: `Water your ${selectedPlant.name} every ${selectedPlant.water}. It needs ${selectedPlant.sun}.`,
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <Card className="w-full max-w-md p-6 shadow-lg bg-white rounded-2xl">
        <CardHeader className="flex flex-col items-center">
          <CardTitle className="text-xl font-bold text-green-600">🌿 Plant Care Reminder</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-gray-600">Select your plant to receive care reminders.</p>
          <Select onValueChange={(value) => setSelectedPlant(plantData.find(plant => plant.name === value))}>
            <SelectTrigger className="w-full border-green-500 focus:ring-green-500 bg-green-100">
              <SelectValue placeholder="Select a plant" />
            </SelectTrigger>
            <SelectContent className="bg-green-100">
              {plantData.map((plant) => (
                <SelectItem key={plant.name} value={plant.name} className="hover:bg-green-200">{plant.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex justify-center">
            <Button onClick={requestPermission} className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2">
              <BellRing className="w-5 h-5" /> Enable Notifications
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}