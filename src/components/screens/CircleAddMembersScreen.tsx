import { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../AppContext';
import { useActivity } from '../ActivityContext';
import { ArrowLeft, Search, UserPlus, Check } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { toast } from 'sonner@2.0.3';

interface Contact {
  id: string;
  name: string;
  phone: string;
  avatar: string;
  isOnAfriBenki: boolean;
}

export function CircleAddMembersScreen() {
  const { setCurrentScreen, language, selectedCircleId } = useApp();
  const { addActivity } = useActivity();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);

  // Mock contacts - in real app would come from user's contacts/friends list
  const contacts: Contact[] = [
    { id: '1', name: 'Chidi Eze', phone: '+234 803 123 4567', avatar: '👨', isOnAfriBenki: true },
    { id: '2', name: 'Aminata Diallo', phone: '+233 244 567 890', avatar: '👩', isOnAfriBenki: true },
    { id: '3', name: 'Kofi Asante', phone: '+254 712 345 678', avatar: '👨', isOnAfriBenki: true },
    { id: '4', name: 'Zainab Mohammed', phone: '+234 805 987 654', avatar: '👩', isOnAfriBenki: false },
    { id: '5', name: 'Thabo Mwangi', phone: '+254 722 111 222', avatar: '👨', isOnAfriBenki: true },
    { id: '6', name: 'Ngozi Okeke', phone: '+234 806 333 444', avatar: '👩', isOnAfriBenki: true },
  ];

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.phone.includes(searchQuery)
  );

  const toggleContact = (contactId: string) => {
    if (selectedContacts.includes(contactId)) {
      setSelectedContacts(selectedContacts.filter(id => id !== contactId));
    } else {
      setSelectedContacts([...selectedContacts, contactId]);
    }
  };

  const handleSendInvites = () => {
    if (selectedContacts.length === 0) {
      toast.error(language === 'fr' ? 'Sélectionnez au moins un contact' : 'Select at least one contact');
      return;
    }

    const selectedNames = contacts
      .filter(c => selectedContacts.includes(c.id))
      .map(c => c.name)
      .join(', ');

    addActivity({
      type: 'circle',
      title: language === 'fr' ? 'Membres invités' : 'Members Invited',
      description: `${selectedNames}`,
      amount: 0,
      status: 'completed',
      timestamp: new Date(),
    });

    toast.success(
      language === 'fr'
        ? `Invitations envoyées à ${selectedContacts.length} membre(s)`
        : `Invitations sent to ${selectedContacts.length} member(s)`
    );

    setTimeout(() => {
      setCurrentScreen('circle-chat');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-muted pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent text-white p-6 safe-area-inset-top">
        <button
          onClick={() => setCurrentScreen('circle-chat')}
          className="mb-4 p-2 hover:bg-white/10 rounded-full"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-white mb-2">
          {language === 'fr' ? 'Ajouter des membres' : 'Add Members'}
        </h2>
        <p className="text-white/80 text-sm">
          {language === 'fr' ? 'Invitez des amis à rejoindre votre cercle' : 'Invite friends to join your circle'}
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 max-w-lg mx-auto space-y-4"
      >
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'fr' ? 'Rechercher des contacts...' : 'Search contacts...'}
            className="pl-10 h-12"
          />
        </div>

        {/* Selected Count */}
        {selectedContacts.length > 0 && (
          <Card className="p-3 bg-accent/10 border-accent/20">
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">
                {selectedContacts.length} {language === 'fr' ? 'sélectionné(s)' : 'selected'}
              </span>
              <Button
                onClick={handleSendInvites}
                size="sm"
                className="bg-accent hover:bg-accent/90"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                {language === 'fr' ? 'Envoyer invitations' : 'Send Invites'}
              </Button>
            </div>
          </Card>
        )}

        {/* Contacts List */}
        <div className="space-y-2">
          {filteredContacts.map((contact, index) => (
            <motion.div
              key={contact.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card
                onClick={() => contact.isOnAfriBenki && toggleContact(contact.id)}
                className={`p-4 cursor-pointer transition-all ${
                  selectedContacts.includes(contact.id)
                    ? 'bg-accent/10 border-accent shadow-md'
                    : contact.isOnAfriBenki
                    ? 'hover:shadow-md'
                    : 'opacity-60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-primary text-white">
                      {contact.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{contact.name}</span>
                      {!contact.isOnAfriBenki && (
                        <Badge variant="secondary" className="text-xs">
                          {language === 'fr' ? 'Pas sur AfriBenki' : 'Not on AfriBenki'}
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">{contact.phone}</div>
                  </div>
                  {contact.isOnAfriBenki && (
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                        selectedContacts.includes(contact.id)
                          ? 'bg-accent border-accent'
                          : 'border-border'
                      }`}
                    >
                      {selectedContacts.includes(contact.id) && (
                        <Check className="w-4 h-4 text-white" />
                      )}
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredContacts.length === 0 && (
          <Card className="p-12 text-center">
            <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground">
              {language === 'fr' ? 'Aucun contact trouvé' : 'No contacts found'}
            </p>
          </Card>
        )}
      </motion.div>
    </div>
  );
}
