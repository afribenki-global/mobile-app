import { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../AppContext';
import { ArrowLeft, Plus, CreditCard, CheckCircle2, Trash2 } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '../ui/dialog';
import { Badge } from '../ui/badge';
import { toast } from 'sonner@2.0.3';

export function LinkedBankAccountsScreen() {
  const { setCurrentScreen, language } = useApp();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [accounts, setAccounts] = useState([
    {
      id: 1,
      bankName: 'Access Bank',
      accountNumber: '0123456789',
      accountName: 'John Doe',
      isPrimary: true,
    },
    {
      id: 2,
      bankName: 'GT Bank',
      accountNumber: '0987654321',
      accountName: 'John Doe',
      isPrimary: false,
    },
  ]);

  const [formData, setFormData] = useState({
    bankName: '',
    accountNumber: '',
    accountName: '',
  });

  const handleAddAccount = () => {
    if (!formData.bankName || !formData.accountNumber || !formData.accountName) {
      toast.error(language === 'fr' ? 'Erreur' : 'Error', {
        description: language === 'fr' ? 'Veuillez remplir tous les champs' : 'Please fill all fields',
      });
      return;
    }

    const newAccount = {
      id: accounts.length + 1,
      ...formData,
      isPrimary: accounts.length === 0,
    };

    setAccounts([...accounts, newAccount]);
    setShowAddDialog(false);
    setFormData({ bankName: '', accountNumber: '', accountName: '' });

    toast.success(language === 'fr' ? 'Compte ajouté!' : 'Account Added!', {
      description: language === 'fr' ? 'Compte bancaire lié avec succès' : 'Bank account linked successfully',
      icon: <CheckCircle2 className="w-5 h-5 text-success" />,
    });
  };

  const handleRemoveAccount = (id: number) => {
    setAccounts(accounts.filter(acc => acc.id !== id));
    toast.success(language === 'fr' ? 'Compte supprimé' : 'Account Removed', {
      description: language === 'fr' ? 'Compte bancaire délié' : 'Bank account unlinked',
    });
  };

  return (
    <div className="min-h-screen bg-muted pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent text-white p-6 safe-area-inset-top">
        <button
          onClick={() => setCurrentScreen('settings')}
          className="mb-4 p-2 hover:bg-white/10 rounded-full"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-white mb-2">{language === 'fr' ? 'Comptes bancaires liés' : 'Linked Bank Accounts'}</h2>
        <p className="text-white/80 text-sm">
          {accounts.length} {language === 'fr' ? 'comptes liés' : 'linked accounts'}
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 max-w-2xl mx-auto space-y-4"
      >
        {/* Add Account Button */}
        <Button 
          onClick={() => setShowAddDialog(true)}
          className="w-full h-12 bg-accent hover:bg-accent/90"
        >
          <Plus className="w-5 h-5 mr-2" />
          {language === 'fr' ? 'Ajouter un compte bancaire' : 'Add Bank Account'}
        </Button>

        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{language === 'fr' ? 'Ajouter un compte bancaire' : 'Add Bank Account'}</DialogTitle>
              <DialogDescription>
                {language === 'fr' 
                  ? 'Liez votre compte bancaire pour faciliter les transactions'
                  : 'Link your bank account for easy transactions'}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label>{language === 'fr' ? 'Nom de la banque' : 'Bank Name'}</Label>
                <Input
                  value={formData.bankName}
                  onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                  placeholder={language === 'fr' ? 'Ex: Access Bank' : 'e.g. Access Bank'}
                  className="mt-2"
                />
              </div>
              <div>
                <Label>{language === 'fr' ? 'Numéro de compte' : 'Account Number'}</Label>
                <Input
                  value={formData.accountNumber}
                  onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                  placeholder="0123456789"
                  className="mt-2"
                />
              </div>
              <div>
                <Label>{language === 'fr' ? 'Nom du compte' : 'Account Name'}</Label>
                <Input
                  value={formData.accountName}
                  onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
                  placeholder={language === 'fr' ? 'Votre nom' : 'Your Name'}
                  className="mt-2"
                />
              </div>
              <Button onClick={handleAddAccount} className="w-full">
                {language === 'fr' ? 'Ajouter le compte' : 'Add Account'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Accounts List */}
        <div className="space-y-3">
          {accounts.map((account) => (
            <Card key={account.id} className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <CreditCard className="w-6 h-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-foreground">{account.bankName}</h4>
                      {account.isPrimary && (
                        <Badge className="bg-success text-xs">
                          {language === 'fr' ? 'Principal' : 'Primary'}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{account.accountNumber}</p>
                    <p className="text-sm text-muted-foreground">{account.accountName}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveAccount(account.id)}
                  className="p-2 hover:bg-destructive/10 rounded-full transition-colors"
                  disabled={account.isPrimary && accounts.length > 1}
                >
                  <Trash2 className="w-5 h-5 text-destructive" />
                </button>
              </div>
            </Card>
          ))}
        </div>

        {accounts.length === 0 && (
          <Card className="p-12 text-center">
            <CreditCard className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              {language === 'fr' ? 'Aucun compte bancaire lié' : 'No bank accounts linked'}
            </p>
          </Card>
        )}
      </motion.div>
    </div>
  );
}
