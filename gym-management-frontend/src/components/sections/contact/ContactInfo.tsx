import React from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from "react-icons/fa";

interface ContactInfoItemProps {
  icon: React.ReactNode;
  title: string;
  text: string | React.ReactNode;
}

const ContactInfoItem: React.FC<ContactInfoItemProps> = ({
  icon,
  title,
  text,
}) => {
  return (
    <div className="flex items-start rounded-lg bg-white p-6 shadow-md">
      <div className="text-primary-500 mr-4 flex-shrink-0 text-2xl">{icon}</div>
      <div>
        <h3 className="mb-2 text-lg font-bold">{title}</h3>
        {typeof text === "string" ? (
          <p className="text-gray-600">{text}</p>
        ) : (
          text
        )}
      </div>
    </div>
  );
};

const ContactInfo: React.FC = () => {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <ContactInfoItem
            icon={<FaMapMarkerAlt />}
            title="Our Location"
            text="123 Fitness Street, Gym City, GC 12345"
          />
          <ContactInfoItem
            icon={<FaPhone />}
            title="Phone Number"
            text={
              <>
                <p className="text-gray-600">Main: (123) 456-7890</p>
                <p className="text-gray-600">Support: (123) 456-7891</p>
              </>
            }
          />
          <ContactInfoItem
            icon={<FaEnvelope />}
            title="Email Address"
            text={
              <>
                <p className="text-gray-600">info@fittlife.com</p>
                <p className="text-gray-600">support@fittlife.com</p>
              </>
            }
          />
          <ContactInfoItem
            icon={<FaClock />}
            title="Working Hours"
            text={
              <>
                <p className="text-gray-600">Mon-Fri: 6:00 AM - 10:00 PM</p>
                <p className="text-gray-600">Sat-Sun: 8:00 AM - 8:00 PM</p>
              </>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
