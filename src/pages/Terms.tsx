import { PolicyLayout } from "@/components/layout/PolicyLayout";

const Terms = () => {
  return (
    <PolicyLayout title="Terms of Service" lastUpdated="July 21, 2025">
      <p className="text-lg text-foreground/80">
        Welcome to nuvori. These Terms of Service ("Terms") govern your access to and use of the nuvori. application,
        website, and services (collectively, the "Platform"). Please read these Terms carefully before using our
        Platform.
      </p>

      <h2>1. Agreement to Terms</h2>
      <p>
        These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf
        of an entity ("you") and nuvori. ("we," "us," or "our"), concerning your access to and use of our Platform. By
        accessing or using the Platform, you agree to be bound by these Terms. If you disagree with any part of the
        terms, then you may not access the Platform.
      </p>

      <h2>2. Account Registration</h2>
      <p>
        To access certain features of the Platform, you may be required to register for an account. You agree to provide
        accurate, current, and complete information during the registration process and to update such information to
        keep it accurate, current, and complete. You are responsible for safeguarding your password and for any
        activities or actions under your account. You agree to notify us immediately of any unauthorized use of your
        account.
      </p>

      <h2>3. User Content</h2>
      <p>
        You are solely responsible for any data, text, graphics, messages, or other materials you submit or post to the
        Platform ("User Content"). By posting User Content, you grant us a non-exclusive, worldwide, royalty-free
        license to use, reproduce, and display such User Content in connection with providing the Platform's services.
        You represent and warrant that you have all the rights, power, and authority necessary to grant the rights
        granted herein to any User Content that you submit and that your User Content does not violate any third-party
        rights, including privacy and intellectual property rights.
      </p>

      <h2>4. Prohibited Activities</h2>
      <p>
        You agree not to misuse the Platform. This includes, but is not limited to: engaging in any activity that is
        illegal, harmful, or fraudulent; scraping, data mining, or harvesting user information without consent;
        impersonating any person or entity; hacking or attempting to gain unauthorized access to the Platform or its
        related systems; or using any unauthorized automated systems to access the Platform. Activities that disrupt the
        service or violate applicable laws are strictly prohibited.
      </p>

      <h2>5. Intellectual Property</h2>
      <p>
        The Platform and all of its original content, features, and functionality are and will remain the exclusive
        property of nuvori. and its licensors. The Platform is protected by copyright, trademark, and other laws of the
        United States and foreign countries. Our trademarks and trade dress may not be used in connection with any
        product or service without the prior written consent of nuvori.
      </p>

      <h2>6. Termination</h2>
      <p>
        We may suspend or terminate your access to the Platform at any time, without prior notice or liability, for any
        reason whatsoever, including without limitation if you breach these Terms. Upon termination, your right to use
        the Platform will immediately cease.
      </p>

      <h2>7. Disclaimer of Warranties</h2>
      <p>
        The Platform is provided on an "AS IS" and "AS AVAILABLE" basis. We make no warranties, expressed or implied,
        regarding the operation of the Platform or the information, content, or materials included therein. We do not
        guarantee that the service will be uninterrupted, secure, or error-free.
      </p>

      <h2>8. Limitation of Liability</h2>
      <p>
        In no event shall nuvori., nor its directors, employees, partners, agents, suppliers, or affiliates, be liable
        for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of
        profits, data, use, goodwill, or other intangible losses, resulting from your use of our Platform.
      </p>

      <h2>9. Governing Law</h2>
      <p>
        These Terms shall be governed and construed in accordance with the laws of the State of California, United
        States, without regard to its conflict of law provisions.
      </p>

      <h2>10. Changes to Terms</h2>
      <p>
        We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is
        material, we will provide at least 30 days' notice prior to any new terms taking effect. By continuing to access
        or use our Platform after those revisions become effective, you agree to be bound by the revised terms.
      </p>

      <h2>11. Contact Us</h2>
      <p>
        If you have any questions about these Terms, please contact us at:
        <br />
        Email: <a href="mailto:terms@nuvori.app" className="text-primary hover:text-primary-light">terms@nuvori.app</a>
        <br />
        Address: 123 Wellness Avenue, San Francisco, CA 94110
      </p>
    </PolicyLayout>
  );
};

export default Terms;