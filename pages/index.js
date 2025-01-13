// app/page.tsx
import { ParticipantList } from '@/components/participant-list'
import { CreateGroup } from '@/components/create-group'

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8">Secret Santa Organizer</h1>
      <div className="grid gap-8">
        <CreateGroup />
        <ParticipantList />
      </div>
    </main>
  )
}

// components/participant-list.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PlusCircle, Trash2 } from 'lucide-react'

interface Participant {
  id: string
  name: string
  email: string
  wishlist: string
}

export function ParticipantList() {
  const [participants, setParticipants] = useState<Participant[]>([{
    id: '1',
    name: '',
    email: '',
    wishlist: ''
  }])

  const addParticipant = () => {
    setParticipants([
      ...participants,
      {
        id: crypto.randomUUID(),
        name: '',
        email: '',
        wishlist: ''
      }
    ])
  }

  const removeParticipant = (id: string) => {
    setParticipants(participants.filter(p => p.id !== id))
  }

  const updateParticipant = (id: string, field: keyof Participant, value: string) => {
    setParticipants(participants.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    ))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Participants</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {participants.map((participant) => (
            <div key={participant.id} className="flex gap-4 items-start">
              <div className="flex-1 space-y-2">
                <Input
                  placeholder="Name"
                  value={participant.name}
                  onChange={(e) => updateParticipant(participant.id, 'name', e.target.value)}
                />
                <Input
                  placeholder="Email"
                  type="email"
                  value={participant.email}
                  onChange={(e) => updateParticipant(participant.id, 'email', e.target.value)}
                />
                <Input
                  placeholder="Wishlist"
                  value={participant.wishlist}
                  onChange={(e) => updateParticipant(participant.id, 'wishlist', e.target.value)}
                />
              </div>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => removeParticipant(participant.id)}
                disabled={participants.length === 1}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <Button onClick={addParticipant} className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            Add Participant
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// components/create-group.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar } from 'lucide-react'

export function CreateGroup() {
  const [groupName, setGroupName] = useState('')
  const [budget, setBudget] = useState('')
  const [deadline, setDeadline] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement group creation logic
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Secret Santa Group</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              placeholder="Group Name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>
          <div>
            <Input
              placeholder="Budget"
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <Input
              placeholder="Exchange Deadline"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
            <Button type="submit" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Create Group
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
