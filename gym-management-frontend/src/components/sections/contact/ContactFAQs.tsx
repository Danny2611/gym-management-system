import React, { useState } from "react";
import { Disclosure, Transition } from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa";

interface FAQ {
  question: string;
  answer: string;
}

interface ContactFAQsProps {
  title?: string;
  subtitle?: string;
  faqs: FAQ[];
}

const ContactFAQs: React.FC<ContactFAQsProps> = ({
  title = "Frequently Asked Questions",
  subtitle = "Find answers to common questions about our gym and services",
  faqs,
}) => {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          {title && (
            <div className="mb-12 text-center">
              <h2 className="mb-3 text-3xl font-bold">{title}</h2>
              {subtitle && <p className="text-gray-600">{subtitle}</p>}
            </div>
          )}

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Disclosure
                key={index}
                as="div"
                className="rounded-lg border border-gray-200"
              >
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full justify-between px-6 py-4 text-left focus:outline-none">
                      <span className="text-lg font-medium">
                        {faq.question}
                      </span>
                      <FaChevronDown
                        className={`${
                          open ? "text-primary-500 rotate-180 transform" : ""
                        } h-5 w-5 text-gray-500 transition-transform duration-200`}
                      />
                    </Disclosure.Button>
                    <Transition
                      enter="transition duration-100 ease-out"
                      enterFrom="transform scale-95 opacity-0"
                      enterTo="transform scale-100 opacity-100"
                      leave="transition duration-75 ease-out"
                      leaveFrom="transform scale-100 opacity-100"
                      leaveTo="transform scale-95 opacity-0"
                    >
                      <Disclosure.Panel className="px-6 py-4 pt-0 text-gray-600">
                        {faq.answer}
                      </Disclosure.Panel>
                    </Transition>
                  </>
                )}
              </Disclosure>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactFAQs;
