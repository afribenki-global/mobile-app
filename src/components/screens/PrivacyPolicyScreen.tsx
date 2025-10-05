import { motion } from 'motion/react';
import { useApp } from '../AppContext';
import { ArrowLeft } from 'lucide-react';
import { Card } from '../ui/card';

export function PrivacyPolicyScreen() {
  const { setCurrentScreen, language } = useApp();

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
        <h2 className="text-white mb-2">
          {language === 'fr' ? 'Politique de confidentialité' : 'Privacy Policy'}
        </h2>
        <p className="text-white/80 text-sm">
          {language === 'fr' ? 'Dernière mise à jour: 4 octobre 2025' : 'Last updated: October 4, 2025'}
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 max-w-2xl mx-auto space-y-4"
      >
        <Card className="p-6 space-y-6">
          <section>
            <h3 className="text-foreground mb-3">
              {language === 'fr' ? '1. Informations que nous collectons' : '1. Information We Collect'}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              {language === 'fr' ? 'Nous collectons les types d\'informations suivants:' : 'We collect the following types of information:'}
            </p>
            <ul className="text-sm text-muted-foreground space-y-1 ml-4 list-disc">
              <li>{language === 'fr' ? 'Informations personnelles (nom, email, numéro de téléphone)' : 'Personal information (name, email, phone number)'}</li>
              <li>{language === 'fr' ? 'Informations financières (comptes bancaires, transactions)' : 'Financial information (bank accounts, transactions)'}</li>
              <li>{language === 'fr' ? 'Informations d\'appareil (adresse IP, type de navigateur)' : 'Device information (IP address, browser type)'}</li>
              <li>{language === 'fr' ? 'Données d\'utilisation (pages visitées, fonctionnalités utilisées)' : 'Usage data (pages visited, features used)'}</li>
            </ul>
          </section>

          <section>
            <h3 className="text-foreground mb-3">
              {language === 'fr' ? '2. Comment nous utilisons vos informations' : '2. How We Use Your Information'}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              {language === 'fr' ? 'Nous utilisons vos informations pour:' : 'We use your information to:'}
            </p>
            <ul className="text-sm text-muted-foreground space-y-1 ml-4 list-disc">
              <li>{language === 'fr' ? 'Fournir et améliorer nos services' : 'Provide and improve our services'}</li>
              <li>{language === 'fr' ? 'Traiter vos transactions' : 'Process your transactions'}</li>
              <li>{language === 'fr' ? 'Communiquer avec vous sur votre compte' : 'Communicate with you about your account'}</li>
              <li>{language === 'fr' ? 'Prévenir la fraude et assurer la sécurité' : 'Prevent fraud and ensure security'}</li>
              <li>{language === 'fr' ? 'Se conformer aux exigences légales' : 'Comply with legal requirements'}</li>
            </ul>
          </section>

          <section>
            <h3 className="text-foreground mb-3">
              {language === 'fr' ? '3. Partage d\'informations' : '3. Information Sharing'}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {language === 'fr'
                ? 'Nous ne vendons pas vos informations personnelles. Nous pouvons partager vos données avec des prestataires de services, des institutions financières et des autorités réglementaires uniquement si nécessaire pour fournir nos services ou respecter la loi.'
                : 'We do not sell your personal information. We may share your data with service providers, financial institutions, and regulatory authorities only as necessary to provide our services or comply with law.'}
            </p>
          </section>

          <section>
            <h3 className="text-foreground mb-3">
              {language === 'fr' ? '4. Sécurité des données' : '4. Data Security'}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {language === 'fr'
                ? 'Nous utilisons des mesures de sécurité standard de l\'industrie pour protéger vos données, y compris le cryptage, les pare-feu et l\'accès sécurisé. Cependant, aucune méthode de transmission sur Internet n\'est 100% sécurisée.'
                : 'We use industry-standard security measures to protect your data, including encryption, firewalls, and secure access. However, no method of transmission over the Internet is 100% secure.'}
            </p>
          </section>

          <section>
            <h3 className="text-foreground mb-3">
              {language === 'fr' ? '5. Conservation des données' : '5. Data Retention'}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {language === 'fr'
                ? 'Nous conservons vos informations personnelles aussi longtemps que votre compte est actif ou selon les besoins pour fournir des services. Nous pouvons conserver certaines données pour nous conformer aux obligations légales.'
                : 'We retain your personal information for as long as your account is active or as needed to provide services. We may retain certain data to comply with legal obligations.'}
            </p>
          </section>

          <section>
            <h3 className="text-foreground mb-3">
              {language === 'fr' ? '6. Vos droits' : '6. Your Rights'}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              {language === 'fr' ? 'Vous avez le droit de:' : 'You have the right to:'}
            </p>
            <ul className="text-sm text-muted-foreground space-y-1 ml-4 list-disc">
              <li>{language === 'fr' ? 'Accéder à vos informations personnelles' : 'Access your personal information'}</li>
              <li>{language === 'fr' ? 'Corriger les données inexactes' : 'Correct inaccurate data'}</li>
              <li>{language === 'fr' ? 'Demander la suppression de vos données' : 'Request deletion of your data'}</li>
              <li>{language === 'fr' ? 'Vous opposer au traitement' : 'Object to processing'}</li>
              <li>{language === 'fr' ? 'Demander la portabilité des données' : 'Request data portability'}</li>
            </ul>
          </section>

          <section>
            <h3 className="text-foreground mb-3">
              {language === 'fr' ? '7. Cookies et technologies de suivi' : '7. Cookies and Tracking Technologies'}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {language === 'fr'
                ? 'Nous utilisons des cookies et des technologies similaires pour améliorer votre expérience, analyser l\'utilisation et personnaliser le contenu. Vous pouvez contrôler les cookies via les paramètres de votre navigateur.'
                : 'We use cookies and similar technologies to improve your experience, analyze usage, and personalize content. You can control cookies through your browser settings.'}
            </p>
          </section>

          <section>
            <h3 className="text-foreground mb-3">
              {language === 'fr' ? '8. Services tiers' : '8. Third-Party Services'}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {language === 'fr'
                ? 'Notre plateforme peut contenir des liens vers des sites Web tiers. Nous ne sommes pas responsables de leurs pratiques de confidentialité. Veuillez consulter leurs politiques de confidentialité.'
                : 'Our platform may contain links to third-party websites. We are not responsible for their privacy practices. Please review their privacy policies.'}
            </p>
          </section>

          <section>
            <h3 className="text-foreground mb-3">
              {language === 'fr' ? '9. Confidentialité des enfants' : '9. Children\'s Privacy'}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {language === 'fr'
                ? 'Nos services ne sont pas destinés aux personnes de moins de 18 ans. Nous ne collectons pas sciemment d\'informations personnelles auprès d\'enfants.'
                : 'Our services are not intended for individuals under 18. We do not knowingly collect personal information from children.'}
            </p>
          </section>

          <section>
            <h3 className="text-foreground mb-3">
              {language === 'fr' ? '10. Modifications de la politique' : '10. Policy Changes'}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {language === 'fr'
                ? 'Nous pouvons mettre à jour cette politique de confidentialité périodiquement. Nous vous informerons des changements importants par email ou via une notification dans l\'application.'
                : 'We may update this privacy policy periodically. We will notify you of significant changes via email or in-app notification.'}
            </p>
          </section>

          <section>
            <h3 className="text-foreground mb-3">
              {language === 'fr' ? '11. Transferts internationaux' : '11. International Transfers'}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {language === 'fr'
                ? 'Vos informations peuvent être transférées et stockées sur des serveurs situés en dehors de votre pays. Nous prenons des mesures pour assurer une protection adéquate.'
                : 'Your information may be transferred to and stored on servers located outside your country. We take steps to ensure adequate protection.'}
            </p>
          </section>

          <section>
            <h3 className="text-foreground mb-3">
              {language === 'fr' ? '12. Nous contacter' : '12. Contact Us'}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {language === 'fr'
                ? 'Pour toute question sur la confidentialité, contactez notre responsable de la protection des données à privacy@afribenki.com'
                : 'For any privacy questions, contact our Data Protection Officer at privacy@afribenki.com'}
            </p>
          </section>
        </Card>
      </motion.div>
    </div>
  );
}
