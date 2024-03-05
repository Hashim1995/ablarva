/* eslint-disable no-useless-escape */
/* eslint-disable react/no-unstable-nested-components */

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from '@nextui-org/react';
import { useTranslation } from 'react-i18next';

interface ITermsConditionModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
}

function TermsConditionsModal({
  isOpen,
  onOpenChange
}: ITermsConditionModalProps) {
  const { t } = useTranslation();
  return (
    <div>
      <Modal
        size="lg"
        backdrop="opaque"
        isOpen={isOpen}
        className="centerModalOnMobile"
        onOpenChange={onOpenChange}
        hideCloseButton
      >
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-row items-center gap-1 border-b-1">
                {t('privacyPolicy')}
              </ModalHeader>
              <ModalBody className="scrollBar overflow-y-scroll">
                <div className="justify-center   h-80 pr-3">
                  <p className="pb-6 text-md">
                    We, in AI-zade, (" Company ", "we", "us", "our") are
                    committed to protecting your personal information and your
                    right to privacy.
                  </p>
                  <p className="pb-6 text-md">
                    When you visit our website{' '}
                    <a href="/" className="text-emerald-500">
                      https:// ai-zade
                    </a>{' '}
                    (the "Website"), and more generally, use any of our services
                    (the "Services", which include the Website ), we appreciate
                    that you are trusting us with your personal information. We
                    take your privacy very seriously. In this privacy notice, we
                    seek to explain to you in the clearest way possible what
                    information we collect, how we use it and what rights you
                    have in relation to it. We hope you take some time to read
                    through it carefully, as it is important. If there are any
                    terms in this privacy notice that you do not agree with,
                    please discontinue use of our Services immediately.
                  </p>
                  <p className="pb-6 text-md">
                    This privacy notice applies to all information collected
                    through our Services (which, as described above, includes
                    our Website ), as well as, any related services, sales,
                    marketing or events.
                  </p>
                  <h2 className="pb-6 text-xl font-medium text-wuiSlate-800">
                    1. What Information Do We Collect?
                  </h2>
                  <p className="pb-6 text-md">
                    We collect personal information that you provide to us.
                  </p>
                  <p className="pb-6 text-md">
                    We collect personal information that you voluntarily provide
                    to us when you express an interest in obtaining information
                    about us or our products and Services, when you participate
                    in activities on the Website or otherwise when you contact
                    us. The personal information that we collect depends on the
                    context of your interactions with us and the Website, the
                    choices you make and the products and features you use. The
                    personal information we collect may include the following:{' '}
                    <span className="font-medium">
                      Personal Information Provided by You.
                    </span>{' '}
                    We collect names; email addresses; passwords; and other
                    similar information. All personal information that you
                    provide to us must be true, complete and accurate, and you
                    must notify us of any changes to such personal information.
                  </p>
                  <h3 className="pb-6 text-lg font-medium text-wuiSlate-700">
                    Information automatically collected
                  </h3>
                  <p className="pb-6 text-md">
                    Some information, such as your Internet Protocol (IP)
                    address and/or browser and device characteristics — is
                    collected automatically when you visit our Website.
                  </p>
                  <p className="pb-6 text-md">
                    We automatically collect certain information when you visit,
                    use or navigate the Website. This information does not
                    reveal your specific identity (like your name or contact
                    information) but may include device and usage information,
                    such as your IP address, browser and device characteristics,
                    operating system, language preferences, referring URLs,
                    device name, country, location, information about how and
                    when you use our Website and other technical information.
                    This information is primarily needed to maintain the
                    security and operation of our Website, and for our internal
                    analytics and reporting purposes.
                  </p>
                  <p className="pb-6 text-md">
                    Like many businesses, we also collect information through
                    cookies and similar technologies.
                  </p>
                  <p className="pb-6 text-md">
                    The information we collect includes:
                  </p>
                  <ul className="pl-6 list-disc text-md">
                    <li className="mb-6">
                      <span className="font-medium">Log and Usage Data: </span>
                      Log and usage data is service-related, diagnostic, usage
                      and performance information our servers automatically
                      collect when you access or use our Website and which we
                      record in log files. Depending on how you interact with
                      us, this log data may include your IP address, device
                      information, browser type and settings and information
                      about your activity in the Website (such as the date/time
                      stamps associated with your usage, pages and files viewed,
                      searches and other actions you take such as which features
                      you use), device event information (such as system
                      activity, error reports (sometimes called "crash dumps")
                      and hardware settings).
                    </li>
                    <li className="mb-6">
                      <span className="font-medium">Device Data: </span>We
                      collect device data such as information about your
                      computer, phone, tablet or other device you use to access
                      the Website. Depending on the device used, this device
                      data may include information such as your IP address (or
                      proxy server), device and application identification
                      numbers, location, browser type, hardware model Internet
                      service provider and/or mobile carrier, operating system
                      and system configuration information.
                    </li>
                    <li className="mb-6">
                      <span className="font-medium">Location Data: </span>We
                      collect location data such as information about your
                      device's location, which can be either precise or
                      imprecise. How much information we collect depends on the
                      type and settings of the device you use to access the
                      Website. For example, we may use GPS and other
                      technologies to collect geolocation data that tells us
                      your current location (based on your IP address). You can
                      opt out of allowing us to collect this information either
                      by refusing access to the information or by disabling your
                      Location setting on your device. Note however, if you
                      choose to opt out, you may not be able to use certain
                      aspects of the Services.
                    </li>
                  </ul>
                  <h2 className="pb-6 text-xl font-medium text-wuiSlate-800">
                    2. How Do We Use Your Information?
                  </h2>
                  <p className="pb-6 text-md">
                    We process your information for purposes based on legitimate
                    business interests, the fulfillment of our contract with
                    you, compliance with our legal obligations, and/or your
                    consent.
                  </p>
                  <p className="pb-6 text-md">
                    We use personal information collected via our Website for a
                    variety of business purposes described below. We process
                    your personal information for these purposes in reliance on
                    our legitimate business interests, in order to enter into or
                    perform a contract with you, with your consent, and/or for
                    compliance with our legal obligations. We indicate the
                    specific processing grounds we rely on next to each purpose
                    listed below.
                  </p>
                  <p className="pb-6 text-md">
                    We use the information we collect or receive:
                  </p>
                  <ul className="pl-6 list-disc text-md">
                    <li className="mb-6">
                      <span className="font-medium">
                        To protect our Services:{' '}
                      </span>
                      We may use your information as part of our efforts to keep
                      our Website safe and secure (for example, for fraud
                      monitoring and prevention).
                    </li>
                    <li className="mb-6">
                      <span className="font-medium">
                        To send administrative information to you:{' '}
                      </span>
                      We may use your personal information to send you product,
                      service and new feature information and/or information
                      about changes to our terms, conditions, and policies.
                    </li>
                    <li className="mb-6">
                      <span className="font-medium">
                        To enforce our terms, conditions and policies for
                        business purposes, to comply with legal and regulatory
                        info-tip or in connection with our contract.
                      </span>
                    </li>
                    <li className="mb-6">
                      <span className="font-medium">
                        To respond to legal requests and prevent harm:{' '}
                      </span>
                      If we receive a subpoena or other legal request, we may
                      need to inspect the data we hold to determine how to
                      respond.
                    </li>
                    <li className="mb-6">
                      <span className="font-medium">
                        To deliver and facilitate delivery of services to the
                        user:{' '}
                      </span>
                      We may use your information to provide you with the
                      requested service.
                    </li>
                    <li className="mb-6">
                      <span className="font-medium">
                        To respond to user inquiries/offer support to users:{' '}
                      </span>
                      We may use your information to respond to your inquiries
                      and solve any potential issues you might have with the use
                      of our Services.
                    </li>
                    <li className="mb-6">
                      <span className="font-medium">
                        To send you marketing and promotional communications:{' '}
                      </span>
                      We and/or our third-party marketing partners may use the
                      personal information you send to us for our marketing
                      purposes, if this is in accordance with your marketing
                      preferences. For example, when expressing an interest in
                      obtaining information about us or our Website, subscribing
                      to marketing or otherwise contacting us, we will collect
                      personal information from you. You can opt-out of our
                      marketing emails at any time.
                    </li>
                    <li className="mb-6">
                      <span className="font-medium">
                        Deliver targeted advertising to you:{' '}
                      </span>
                      We may use your information to develop and display
                      personalized content and advertising (and work with third
                      parties who do so) tailored to your interests and/or
                      location and to measure its effectiveness.
                    </li>
                  </ul>
                  <h2 className="pb-6 text-xl font-medium text-wuiSlate-800">
                    3. Will Your Information Be Shared With Anyone?
                  </h2>
                  <p className="pb-6 text-md">
                    We only share information with your consent, to comply with
                    laws, to provide you with services, to protect your rights,
                    or to fulfill business obligations.
                  </p>
                  <p className="pb-6 text-md">
                    We may process or share your data that we hold based on the
                    following legal basis:
                  </p>
                  <ul className="pl-6 list-disc text-md">
                    <li className="mb-6">
                      <span className="font-medium">Consent: </span>We may
                      process your data if you have given us specific consent to
                      use your personal information for a specific purpose.
                    </li>
                    <li className="mb-6">
                      <span className="font-medium">
                        Legitimate Interests:{' '}
                      </span>
                      We may process your data when it is reasonably necessary
                      to achieve our legitimate business interests.
                    </li>
                    <li className="mb-6">
                      <span className="font-medium">
                        Performance of a Contract:{' '}
                      </span>
                      Where we have entered into a contract with you, we may
                      process your personal information to fulfill the terms of
                      our contract.
                    </li>
                    <li className="mb-6">
                      <span className="font-medium">Legal Obligations: </span>We
                      may disclose your information where we are legally
                      required to do so in order to comply with applicable law,
                      governmental requests, a judicial proceeding, court order,
                      or legal process, such as in response to a court order or
                      a subpoena (including in response to public authorities to
                      meet national security or law enforcement info-tip).
                    </li>
                    <li className="mb-6">
                      <span className="font-medium">Vital Interests: </span>We
                      may disclose your information where we believe it is
                      necessary to investigate, prevent, or take action
                      regarding potential violations of our policies, suspected
                      fraud, situations involving potential threats to the
                      safety of any person and illegal activities, or as
                      evidence in litigation in which we are involved.
                    </li>
                    <li className="mb-6">
                      <span className="font-medium">Business Transfers: </span>
                      We may share or transfer your information in connection
                      with, or during negotiations of, any merger, sale of
                      company assets, financing, or acquisition of all or a
                      portion of our business to another company.
                    </li>
                  </ul>
                  <h2 className="pb-6 text-xl font-medium text-wuiSlate-800">
                    4. Do We Use Cookies And Other Tracking Technologies?
                  </h2>
                  <p className="pb-6 text-md">
                    We may use cookies and other tracking technologies to
                    collect and store your information.
                  </p>
                  <p className="pb-6 text-md">
                    We may use cookies and similar tracking technologies (like
                    web beacons and pixels) to access or store information.
                    Specific information about how we use such technologies and
                    how you can refuse certain cookies is set out in our Cookie
                    Notice.
                  </p>
                  <h2 className="pb-6 text-xl font-medium text-wuiSlate-800">
                    5. What Is Our Stance On Third-party Websites?
                  </h2>
                  <p className="pb-6 text-md">
                    We are not responsible for the safety of any information
                    that you share with third-party providers who advertise, but
                    are not affiliated with, our Website.
                  </p>
                  <p className="pb-6 text-md">
                    The Website may contain advertisements from third parties
                    that are not affiliated with us and which may link to other
                    websites, online services or mobile applications. We cannot
                    guarantee the safety and privacy of data you provide to any
                    third parties. Any data collected by third parties is not
                    covered by this privacy notice. We are not responsible for
                    the content or privacy and security practices and policies
                    of any third parties, including other websites, services or
                    applications that may be linked to or from the Website. You
                    should review the policies of such third parties and contact
                    them directly to respond to your questions.
                  </p>
                  <h2 className="pb-6 text-xl font-medium text-wuiSlate-800">
                    6. How Long Do We Keep Your Information?
                  </h2>
                  <p className="pb-6 text-md">
                    We keep your information for as long as necessary to fulfill
                    the purposes outlined in this privacy notice unless
                    otherwise required by law.
                  </p>
                  <p className="pb-6 text-md">
                    We will only keep your personal information for as long as
                    it is necessary for the purposes set out in this privacy
                    notice, unless a longer retention period is required or
                    permitted by law (such as tax, accounting or other legal
                    info-tip). No purpose in this notice will require us keeping
                    your personal information for longer than the period of time
                    in which users have an account with us.
                  </p>
                  <p className="pb-6 text-md">
                    When we have no ongoing legitimate business need to process
                    your personal information, we will either delete or
                    anonymize such information, or, if this is not possible (for
                    example, because your personal information has been stored
                    in backup archives), then we will securely store your
                    personal information and isolate it from any further
                    processing until deletion is possible.
                  </p>
                  <h2 className="pb-6 text-xl font-medium text-wuiSlate-800">
                    7. What Are Your Privacy Rights?
                  </h2>
                  <p className="pb-6 text-md">
                    In some regions, such as the European Economic Area, you
                    have rights that allow you greater access to and control
                    over your personal information.
                  </p>
                  <p className="pb-6 text-md">
                    In some regions (like the European Economic Area), you have
                    certain rights under applicable data protection laws. These
                    may include the right (i) to request access and obtain a
                    copy of your personal information, (ii) to request
                    rectification or erasure; (iii) to restrict the processing
                    of your personal information; and (iv) if applicable, to
                    data portability. In certain circumstances, you may also
                    have the right to object to the processing of your personal
                    information. To make such a request, please use our contact
                    email{' '}
                    <a
                      href="mailto:info@ ai-zade.com"
                      target="blank"
                      className="text-emerald-500"
                      aria-label="Contact WindUI link"
                    >
                      info@ ai-zade.com
                    </a>
                    . We will consider and act upon any request in accordance
                    with applicable data protection laws.
                  </p>
                  <p className="pb-6 text-md">
                    If we are relying on your consent to process your personal
                    information, you have the right to withdraw your consent at
                    any time. Please note however that this will not affect the
                    lawfulness of the processing before its withdrawal, nor will
                    it affect the processing of your personal information
                    conducted in reliance on lawful processing grounds other
                    than consent.
                  </p>
                  <p className="pb-6 text-md">
                    If you are a resident in the European Economic Area and you
                    believe we are unlawfully processing your personal
                    information, you also have the right to complain to your
                    local data protection supervisory authority. You can find
                    their contact details here:{' '}
                    <a className="text-emerald-500" href="/#">
                      ai-zade.az
                    </a>
                  </p>
                  <p className="pb-6 text-md">
                    If you have questions or comments about your privacy rights,
                    you may contact us through our email{' '}
                    <a
                      href="mailto:info@ai-zade.az"
                      aria-label="Contact WindUI link"
                      target="blank"
                      className="text-emerald-500"
                    >
                      info@ai-zade.az
                    </a>
                    .
                  </p>
                  <h3 className="pb-6 text-lg font-medium text-wuiSlate-700">
                    Cookies and similar technologies:
                  </h3>
                  <p className="pb-6 text-md">
                    Most Web browsers are set to accept cookies by default. If
                    you prefer, you can usually choose to set your browser to
                    remove cookies and to reject cookies. If you choose to
                    remove cookies or reject cookies, this could affect certain
                    features or services of our Website.{' '}
                  </p>
                  <h2 className="pb-6 text-xl font-medium text-wuiSlate-800">
                    8. Controls For Do-not-track Features
                  </h2>
                  <p className="pb-6 text-md">
                    Most web browsers and some mobile operating systems and
                    mobile applications include a Do-Not-Track ("DNT") feature
                    or setting you can activate to signal your privacy
                    preference not to have data about your online browsing
                    activities monitored and collected. At this stage no uniform
                    technology standard for recognizing and implementing DNT
                    signals has been finalized. As such, we do not currently
                    respond to DNT browser signals or any other mechanism that
                    automatically communicates your choice not to be tracked
                    online. If a standard for online tracking is adopted that we
                    must follow in the future, we will inform you about that
                    practice in a revised version of this privacy notice.
                  </p>
                  <h2 className="pb-6 text-xl font-medium text-wuiSlate-800">
                    9. Do We Make Updates To This Notice?
                  </h2>
                  <p className="pb-6 text-md">
                    Yes, we will update this notice as necessary to stay
                    compliant with relevant laws.
                  </p>
                  <p className="pb-6 text-md">
                    We may update this privacy notice from time to time. The
                    updated version will be indicated by an updated "Revised"
                    date and the updated version will be effective as soon as it
                    is accessible. If we make material changes to this privacy
                    notice, we may notify you either by prominently posting a
                    notice of such changes or by directly sending you a
                    notification. We encourage you to review this privacy notice
                    frequently to be informed of how we are protecting your
                    information.
                  </p>
                  <h2 className="pb-6 text-xl font-medium text-wuiSlate-800">
                    10. How Can You Contact Us About This Notice?
                  </h2>
                  <p className="pb-6 text-md">
                    If you have questions or comments about this notice, you may
                    contact us here{' '}
                    <a
                      href="mailto:info@ai-zade.az"
                      target="blank"
                      className="text-emerald-500"
                    >
                      info@ai-zade.az
                    </a>
                  </p>
                </div>
              </ModalBody>
              <ModalFooter className="border-t-1">
                <Button onPress={onClose}>{t('closeBtn')}</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default TermsConditionsModal;
