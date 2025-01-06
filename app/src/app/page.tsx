'use client';

import React, { useState } from 'react';
import { Mic, MicOff, Edit2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

export default function Home() {
  const [isRecording, setIsRecording] = useState(false);
  const [notes, setNotes] = useState({
    subjective: '',
    objective: '',
    assessment: '',
    plan: ''
  });
  const [editMode, setEditMode] = useState(false);

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Here you would implement actual audio recording logic
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">MediScribe AI</h1>
        <div className="flex gap-4">
          <button
            onClick={toggleRecording}
            className={`p-2 rounded-full ${
              isRecording ? 'bg-red-500' : 'bg-blue-500'
            } text-white`}
          >
            {isRecording ? <MicOff size={24} /> : <Mic size={24} />}
          </button>
          <button
            onClick={() => setEditMode(!editMode)}
            className="p-2 rounded-full bg-gray-200"
          >
            <Edit2 size={24} />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {Object.entries(notes).map(([section, content]) => (
          <Card key={section}>
            <CardHeader>
              <CardTitle className="capitalize">{section}</CardTitle>
            </CardHeader>
            <CardContent>
              {editMode ? (
                <textarea
                  className="w-full p-2 border rounded"
                  value={content}
                  onChange={(e) =>
                    setNotes({ ...notes, [section]: e.target.value })
                  }
                  rows={3}
                />
              ) : (
                <p className="p-2">{content || 'No content yet'}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {isRecording && (
        <div className="fixed bottom-4 right-4 bg-red-100 p-4 rounded-lg">
          <p className="text-red-600 animate-pulse">Recording in progress...</p>
        </div>
      )}
    </div>
  );
}
