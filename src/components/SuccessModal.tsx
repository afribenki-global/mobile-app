import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, X } from 'lucide-react';
import { Button } from './ui/button';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function SuccessModal({ isOpen, onClose, title, message, action }: SuccessModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: 50 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-muted rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="w-20 h-20 bg-success rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle2 className="w-12 h-12 text-white" />
                </motion.div>
                
                <h3 className="text-foreground mb-2">{title}</h3>
                <p className="text-muted-foreground mb-6">{message}</p>
                
                {action && (
                  <Button
                    onClick={action.onClick}
                    className="w-full h-12 bg-primary hover:bg-primary/90 rounded-xl mb-2"
                  >
                    {action.label}
                  </Button>
                )}
                
                <Button
                  onClick={onClose}
                  variant="outline"
                  className="w-full h-12 rounded-xl"
                >
                  Close
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
