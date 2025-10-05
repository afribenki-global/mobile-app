import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useApp } from '../AppContext';
import { Upload, CheckCircle2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

export function KYCScreen() {
  const { setCurrentScreen } = useApp();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    dateOfBirth: '',
    address: '',
    city: '',
    state: '',
    idType: '',
    idNumber: '',
  });
  const [uploadedDocs, setUploadedDocs] = useState({
    idCard: false,
    selfie: false,
  });

  const handleFileUpload = (type: 'idCard' | 'selfie') => {
    // Simulate file upload
    setTimeout(() => {
      setUploadedDocs({ ...uploadedDocs, [type]: true });
    }, 1000);
  };

  const handleSubmit = () => {
    setCurrentScreen('goal-quiz');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-primary-foreground px-4 py-6 safe-area-inset-top">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-lg mx-auto"
        >
          <h2 className="mb-2">Verify Your Identity</h2>
          <p className="text-sm text-primary-foreground/80">
            This helps us keep your account secure
          </p>
          <div className="flex gap-2 mt-4">
            {[1, 2].map((s) => (
              <div
                key={s}
                className={`h-1 flex-1 rounded-full ${
                  step >= s ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-6 max-w-lg mx-auto"
      >
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="dob">Date of Birth</Label>
              <Input
                id="dob"
                type="date"
                className="mt-1 h-12 rounded-xl"
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="address">Street Address</Label>
              <Input
                id="address"
                type="text"
                placeholder="123 Main Street"
                className="mt-1 h-12 rounded-xl"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  type="text"
                  placeholder="Lagos"
                  className="mt-1 h-12 rounded-xl"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  type="text"
                  placeholder="Lagos"
                  className="mt-1 h-12 rounded-xl"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="idType">ID Type</Label>
              <Select value={formData.idType} onValueChange={(value) => setFormData({ ...formData, idType: value })}>
                <SelectTrigger className="mt-1 h-12 rounded-xl">
                  <SelectValue placeholder="Select ID type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="national-id">National ID</SelectItem>
                  <SelectItem value="passport">International Passport</SelectItem>
                  <SelectItem value="drivers-license">Driver's License</SelectItem>
                  <SelectItem value="voters-card">Voter's Card</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="idNumber">ID Number</Label>
              <Input
                id="idNumber"
                type="text"
                placeholder="Enter your ID number"
                className="mt-1 h-12 rounded-xl"
                value={formData.idNumber}
                onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
              />
            </div>

            <Button
              onClick={() => setStep(2)}
              className="w-full h-12 bg-primary hover:bg-primary/90 rounded-xl mt-6"
            >
              Continue
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-xl p-6">
              <h4 className="text-foreground mb-4">Upload ID Document</h4>
              <button
                onClick={() => handleFileUpload('idCard')}
                className={`w-full border-2 border-dashed rounded-xl p-8 flex flex-col items-center gap-3 transition-colors ${
                  uploadedDocs.idCard
                    ? 'border-success bg-success/5'
                    : 'border-border hover:border-primary'
                }`}
              >
                {uploadedDocs.idCard ? (
                  <>
                    <CheckCircle2 className="w-12 h-12 text-success" />
                    <span className="text-success">Document Uploaded</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-12 h-12 text-muted-foreground" />
                    <span className="text-muted-foreground">Tap to upload</span>
                  </>
                )}
              </button>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h4 className="text-foreground mb-4">Upload Selfie</h4>
              <button
                onClick={() => handleFileUpload('selfie')}
                className={`w-full border-2 border-dashed rounded-xl p-8 flex flex-col items-center gap-3 transition-colors ${
                  uploadedDocs.selfie
                    ? 'border-success bg-success/5'
                    : 'border-border hover:border-primary'
                }`}
              >
                {uploadedDocs.selfie ? (
                  <>
                    <CheckCircle2 className="w-12 h-12 text-success" />
                    <span className="text-success">Selfie Uploaded</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-12 h-12 text-muted-foreground" />
                    <span className="text-muted-foreground">Tap to upload</span>
                  </>
                )}
              </button>
            </div>

            <Button
              onClick={handleSubmit}
              disabled={!uploadedDocs.idCard || !uploadedDocs.selfie}
              className="w-full h-12 bg-primary hover:bg-primary/90 rounded-xl"
            >
              Complete Verification
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
