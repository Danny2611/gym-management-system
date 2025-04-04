import React from "react";
import SectionTitle from "../../common/SectionTitle";
import { Disclosure, Transition } from "@headlessui/react";
import Button from "../../common/Button";
interface FAQ {
  question: string;
  answer: string;
}

const FAQSection: React.FC = () => {
  const faqs: FAQ[] = [
    {
      question: "What are your gym hours?",
      answer:
        "Our gym is open Monday through Friday from 5:00 AM to 11:00 PM, and on weekends from 7:00 AM to 9:00 PM. Holiday hours may vary and will be posted in advance.",
    },
    {
      question: "Do I need to bring my own equipment?",
      answer:
        "No, our facility is fully equipped with all the necessary fitness equipment. We provide towels, but we recommend bringing your own water bottle, though we do have water fountains available.",
    },
    {
      question: "Is there a fee to cancel my membership?",
      answer:
        "For monthly memberships, we require a 30-day notice for cancellation with no additional fee. Annual memberships may have an early termination fee if canceled before the contract period ends. Please refer to your membership agreement for specific terms.",
    },
    {
      question: "Do you offer childcare services?",
      answer:
        "Yes, we offer childcare services for members at select times during the week. There is a small additional fee for this service, and reservations are recommended during peak hours.",
    },
    {
      question: "Can I freeze my membership temporarily?",
      answer:
        "Yes, members can freeze their membership for a minimum of 1 month and a maximum of 3 months per year. A small monthly holding fee applies during the freeze period. Please contact our membership services for assistance.",
    },
    {
      question: "How do I sign up for group fitness classes?",
      answer:
        "You can sign up for classes through our website, mobile app, or at the front desk. We recommend booking in advance as popular classes fill up quickly. Premium members enjoy priority booking privileges.",
    },
  ];

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <SectionTitle
          subtitle="FAQ"
          title="Frequently Asked Questions"
          description="Find answers to the most common questions about our services, membership options, and policies."
        />

        <div className="mx-auto mt-12 max-w-3xl">
          {faqs.map((faq, index) => (
            <Disclosure key={index} as="div" className="mt-4">
              {({ open }) => (
                <>
                  <Disclosure.Button className="focus-visible:ring-primary-500 flex w-full justify-between rounded-lg bg-gray-50 px-6 py-4 text-left text-lg font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-opacity-75">
                    <span>{faq.question}</span>
                    <span
                      className={`${open ? "rotate-180 transform" : ""} transition-transform duration-200`}
                    >
                      <i className="fas fa-chevron-down"></i>
                    </span>
                  </Disclosure.Button>
                  <Transition
                    show={open}
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                  >
                    <Disclosure.Panel className="rounded-b-lg border border-gray-100 bg-white px-6 py-4 text-gray-600">
                      {faq.answer}
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="mb-4 text-gray-600">
            Can't find the answer you're looking for?
          </p>
          <Button variant="primary" size="large">
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
