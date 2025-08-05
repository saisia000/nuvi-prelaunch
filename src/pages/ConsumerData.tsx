import { PolicyLayout } from "@/components/layout/PolicyLayout";

const ConsumerData = () => {
  return (
    <PolicyLayout title="Consumer Health Data Privacy Notice" lastUpdated="July 21, 2025">
      <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-6 my-8">
        <p className="text-destructive font-semibold">
          <strong>Legal Disclaimer:</strong> This document is a template and does not constitute legal advice. 
          You must consult with a qualified legal professional to ensure your policies are fully compliant with 
          all applicable laws, including but not limited to Washington's My Health My Data Act and other 
          state-level privacy regulations.
        </p>
      </div>

      <p className="text-lg text-foreground/80">
        This notice supplements our main <a href="/privacy" className="text-primary hover:text-primary-light">Privacy Policy</a> 
        and provides specific disclosures required by certain state laws regarding the collection, use, and sharing of "Consumer Health Data."
      </p>

      <h2>1. Categories of Consumer Health Data We Collect</h2>
      <p>
        To provide the nuvori. service, we may collect the following categories of data that may be considered
        Consumer Health Data:
      </p>
      <ul className="list-disc list-inside space-y-2 text-foreground/80">
        <li><strong>Health Conditions and Diagnoses:</strong> Information about specific health conditions,
            treatments, symptoms, and diseases related to you or the person you are caring for.</li>
        <li><strong>Medication and Treatment Information:</strong> Data related to prescriptions, dosages,
            schedules, and other treatments managed by the Logistics Agent.</li>
        <li><strong>Healthcare Appointments and Services:</strong> Information about past and future
            appointments with healthcare providers, including specialists and therapists.</li>
        <li><strong>Measurements and Vital Signs:</strong> Any bodily function or vital sign data you choose to
            track within the Platform.</li>
        <li><strong>Mental and Emotional Health Information:</strong> Data related to your emotional state,
            stress levels, feelings of burnout, and other mental health indicators, often inferred from your
            interactions with the Connection Agent.</li>
        <li><strong>Data Identifying You as Seeking Health Care Services:</strong> Your use of the nuvori.
            platform itself may be considered an indicator that you are seeking health care services or
            information for yourself or another person.</li>
      </ul>

      <h2>2. Sources of Consumer Health Data</h2>
      <p>
        We collect the Consumer Health Data listed above directly from you when you voluntarily provide it
        through your use of the nuvori. Platform.
      </p>

      <h2>3. Purpose of Collection and Use (Why We Collect It)</h2>
      <p>
        We collect and use Consumer Health Data for one primary purpose: <strong>to operate, maintain, and
        provide the features of the nuvori. Platform</strong>. This includes:
      </p>
      <ul className="list-disc list-inside space-y-2 text-foreground/80">
        <li>Enabling our AI agents to provide personalized caregiving support and recommendations</li>
        <li>Helping you manage appointments, medications, and care tasks</li>
        <li>Providing emotional support and connection guidance tailored to your situation</li>
        <li>Improving the overall quality and effectiveness of our AI assistance</li>
      </ul>

      <h2>4. Sharing and Disclosure</h2>
      <p>
        We do not sell, rent, or otherwise commercially disclose your Consumer Health Data to third parties. 
        We may share your Consumer Health Data only in the following limited circumstances:
      </p>
      <ul className="list-disc list-inside space-y-2 text-foreground/80">
        <li><strong>Service Providers:</strong> With trusted third-party service providers who assist us in operating our Platform, 
            such as cloud hosting services. These providers are bound by strict confidentiality agreements.</li>
        <li><strong>Legal Requirements:</strong> When required by law, regulation, or valid legal process.</li>
        <li><strong>Safety and Protection:</strong> To protect the vital interests of you or others in emergency situations.</li>
      </ul>

      <h2>5. Your Rights Regarding Consumer Health Data</h2>
      <p>
        Depending on your state of residence, you may have specific rights regarding your Consumer Health Data, including:
      </p>
      <ul className="list-disc list-inside space-y-2 text-foreground/80">
        <li><strong>Right to Access:</strong> You can request a copy of the Consumer Health Data we have collected about you.</li>
        <li><strong>Right to Delete:</strong> You can request that we delete your Consumer Health Data, subject to certain exceptions.</li>
        <li><strong>Right to Withdraw Consent:</strong> You can withdraw your consent to our collection and processing of your Consumer Health Data.</li>
        <li><strong>Right to Restrict Processing:</strong> You may request that we limit how we process your Consumer Health Data.</li>
      </ul>

      <h2>6. How to Exercise Your Rights</h2>
      <p>
        To exercise any of these rights, please contact us at:
        <br />
        Email: <a href="mailto:privacy@nuvori.app" className="text-primary hover:text-primary-light">privacy@nuvori.app</a>
        <br />
        We will respond to your request within the time period required by applicable law.
      </p>

      <h2>7. Data Security</h2>
      <p>
        We implement appropriate technical and organizational security measures to protect your Consumer Health Data 
        against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over 
        the Internet or electronic storage is 100% secure.
      </p>

      <h2>8. Changes to This Notice</h2>
      <p>
        We may update this Consumer Health Data Privacy Notice from time to time. We will notify you of any material 
        changes by posting the new notice on our Platform and updating the "Last Updated" date above.
      </p>

      <h2>9. Contact Information</h2>
      <p>
        If you have any questions about this notice or our handling of your Consumer Health Data, please contact us at:
        <br />
        Email: <a href="mailto:privacy@nuvori.app" className="text-primary hover:text-primary-light">privacy@nuvori.app</a>
        <br />
        Address: 123 Wellness Avenue, San Francisco, CA 94110
      </p>
    </PolicyLayout>
  );
};

export default ConsumerData;