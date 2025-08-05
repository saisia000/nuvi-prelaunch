import { PolicyLayout } from "@/components/layout/PolicyLayout";

const Privacy = () => {
  return (
    <PolicyLayout title="Privacy Policy" lastUpdated="March 19, 2025">
      <p className="text-lg text-foreground/80">
        This Privacy Policy describes how nuvori. ("we," "us," or "our") handles the information we collect from and about you through our website, mobile applications, and other services that link to this Privacy Policy (collectively, the "Services"). Your privacy and trust are foundational to our mission.
      </p>

      <div className="bg-muted/20 border border-primary/20 rounded-lg p-6 my-10">
        <h2 className="!mt-0 !border-none text-xl font-semibold text-foreground mb-4">Index</h2>
        <div className="space-y-2">
          <a href="#info-collect" className="block text-primary hover:text-primary-light font-medium">1. Information We Collect</a>
          <a href="#info-use" className="block text-primary hover:text-primary-light font-medium">2. How We Use Your Information</a>
          <a href="#responsible-ai" className="block text-primary hover:text-primary-light font-medium">3. Our Commitment to Responsible AI</a>
          <a href="#info-disclose" className="block text-primary hover:text-primary-light font-medium">4. How We Disclose Your Information</a>
          <a href="#rights-choices" className="block text-primary hover:text-primary-light font-medium">5. Your Rights and Choices</a>
          <a href="#security" className="block text-primary hover:text-primary-light font-medium">6. Security and Retention</a>
          <a href="#children" className="block text-primary hover:text-primary-light font-medium">7. Children's Privacy</a>
          <a href="#changes" className="block text-primary hover:text-primary-light font-medium">8. Changes to This Privacy Policy</a>
          <a href="#contact" className="block text-primary hover:text-primary-light font-medium">9. How To Contact Us</a>
          <a href="#california" className="block text-primary hover:text-primary-light font-medium">10. Additional Information for California Residents</a>
          <a href="#health-data" className="block text-primary hover:text-primary-light font-medium">11. Consumer Health Data Notice</a>
        </div>
      </div>

      <h2 id="info-collect">1. Information We Collect</h2>
      <p>The information we collect depends on how you interact with us. The sources include:</p>

      <h3>Information You Provide to Us</h3>
      <ul className="list-disc list-inside space-y-2 text-foreground/80">
        <li><strong>Contact Data:</strong> Your first and last name and email address.</li>
        <li><strong>Profile Data:</strong> The username and password you set to establish an account, and any other information you choose to include in your profile.</li>
        <li><strong>Communications Data:</strong> Information from your communications with us, including support requests, questions, and feedback.</li>
        <li><strong>Health and Wellness Data:</strong> Information you provide about health conditions, medications, appointments, symptoms, and emotional well-being to enable the AI agents to function. This is treated as sensitive data.</li>
      </ul>

      <h3>Information We Collect Automatically</h3>
      <ul className="list-disc list-inside space-y-2 text-foreground/80">
        <li><strong>Device Data:</strong> Information about your device's operating system, browser type, IP address, and unique identifiers.</li>
        <li><strong>Usage Data:</strong> Information about your activity on our Services, such as pages viewed, features used, and crash logs. This helps us improve the service. We use standard technologies like cookies and software development kits (SDKs) for this purpose.</li>
      </ul>

      <h2 id="info-use">2. How We Use Your Information</h2>
      <p>We use your information for the following purposes:</p>
      <ul className="list-disc list-inside space-y-2 text-foreground/80">
        <li><strong>Service Delivery:</strong> To provide, operate, and improve the Services; create and manage your account; and respond to your requests.</li>
        <li><strong>Research and Development:</strong> To analyze and improve the Services and our business. We may use de-identified data for this purpose, which cannot be linked back to you.</li>
        <li><strong>Compliance and Protection:</strong> To comply with laws, enforce our terms, and protect the rights, privacy, and safety of our users and others.</li>
      </ul>

      <h2 id="responsible-ai">3. Our Commitment to Responsible AI</h2>
      <p>We are committed to developing and deploying our AI technology ethically and responsibly. Our AI is a tool designed to support, not replace, human connection and judgment. Our commitment is built on the following principles:</p>
      <ul className="list-disc list-inside space-y-2 text-foreground/80">
        <li><strong>Transparency and Explainability:</strong> We believe you should understand how our AI assists you. While the underlying technology is complex, the goals of our AI agents are straightforward.</li>
        <li><strong>Fairness and Impartiality:</strong> We are committed to designing and testing our AI models to minimize and mitigate harmful biases.</li>
        <li><strong>Human Control and Oversight:</strong> You are always in control. The suggestions provided by our AI are optional, and you have the final say in how you use them.</li>
        <li><strong>Accountability:</strong> We take responsibility for the technology we build. We have internal oversight processes to ensure our AI systems are developed and used in a manner consistent with our values and this policy.</li>
      </ul>

      <h2 id="info-disclose">4. How We Disclose Your Information</h2>
      <p>We do not sell your data. We only disclose your information in the following limited circumstances:</p>
      <ul className="list-disc list-inside space-y-2 text-foreground/80">
        <li><strong>Service Providers:</strong> To companies that provide services on our behalf, such as cloud hosting (e.g., Amazon Web Services) and customer support. They are contractually obligated to protect your data.</li>
        <li><strong>Business Transferees:</strong> In connection with a business transaction like a merger or acquisition.</li>
        <li><strong>Authorities and Others:</strong> To comply with legal obligations or to protect and defend our rights and safety.</li>
      </ul>

      <h2 id="rights-choices">5. Your Rights and Choices</h2>
      <p>You have control over your information. Depending on your location, you may have the right to:</p>
      <ul className="list-disc list-inside space-y-2 text-foreground/80">
        <li>Access a copy of your personal information.</li>
        <li>Correct or update your personal information.</li>
        <li>Delete your personal information.</li>
      </ul>
      <p>You can submit requests to exercise these rights by emailing us at <a href="mailto:privacy@nuvori.app" className="text-primary hover:text-primary-light">privacy@nuvori.app</a>. We will need to verify your identity to process your request.</p>

      <h2 id="security">6. Security and Retention</h2>
      <p>We use a variety of technical and organizational safeguards designed to protect your information. We retain information for as long as necessary to fulfill the purposes for which it was collected and as required by law.</p>

      <h2 id="children">7. Children's Privacy</h2>
      <p>Our Services are not intended for use by children under the age of 18. We do not knowingly collect personal information from children. If you believe we have, please contact us immediately.</p>

      <h2 id="changes">8. Changes to This Privacy Policy</h2>
      <p>We may update this Privacy Policy from time to time. If we make material changes, we will notify you by email or through a notice in the application.</p>

      <h2 id="contact">9. How To Contact Us</h2>
      <p>Please direct any questions or comments to <a href="mailto:privacy@nuvori.app" className="text-primary hover:text-primary-light">privacy@nuvori.app</a>.</p>

      <h2 id="california">10. Additional Information for California Residents</h2>
      <p>If you are a California resident, you have the rights outlined in the California Consumer Privacy Act (CCPA). This includes the right to know about the personal information we collect and the right to delete your information, as described in Section 5. We do not "sell" or "share" your personal information as those terms are defined under the CCPA.</p>

      <h2 id="health-data">11. Consumer Health Data Notice</h2>
      <p>Certain state laws, like Washington's My Health My Data Act, provide specific rights regarding "Consumer Health Data." This notice addresses those requirements.</p>
      <ul className="list-disc list-inside space-y-2 text-foreground/80">
        <li><strong>Categories of Health Data Collected:</strong> As detailed in Section 1, this includes Health and Wellness Data you provide.</li>
        <li><strong>Purpose of Collection:</strong> We collect this data solely to provide and improve the nuvori. service to you.</li>
        <li><strong>Sharing:</strong> We do not share Consumer Health Data with any third parties except for essential Service Providers as described in Section 4.</li>
      </ul>
    </PolicyLayout>
  );
};

export default Privacy;