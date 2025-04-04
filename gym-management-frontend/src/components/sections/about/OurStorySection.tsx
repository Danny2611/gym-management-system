import React from "react";
import SectionTitle from "../../common/SectionTitle";

const OurStorySection: React.FC = () => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div className="relative">
            <img
              src="/images/about/story-main.jpg"
              alt="Our Gym Story"
              className="h-auto w-full rounded-lg object-cover shadow-lg"
            />
            <div className="absolute -bottom-8 -right-8 hidden md:block">
              <img
                src="/images/about/story-accent.jpg"
                alt="Fitness Training"
                className="h-48 w-48 rounded-lg border-4 border-white object-cover shadow-lg"
              />
            </div>
          </div>
          <div>
            <SectionTitle
              subtitle="OUR STORY"
              title="Experience Fitness Excellence Since 2010"
              alignment="left"
            />
            <p className="mb-6 text-gray-600">
              At FittLife, our journey began with a simple mission: to create a
              fitness environment where everyone feels welcome and empowered to
              achieve their health goals. Founded in 2010, we've grown from a
              small local gym to a community-focused fitness center that puts
              people first.
            </p>
            <p className="mb-6 text-gray-600">
              Our team of certified trainers brings decades of combined
              experience to help you transform your life through fitness. We
              believe in a balanced approach to wellness that combines effective
              workouts, proper nutrition, and mental well-being.
            </p>
            <div className="mt-8 flex flex-wrap gap-6">
              <div className="flex items-center">
                <div className="bg-primary-600 mr-4 flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold text-white">
                  14+
                </div>
                <div>
                  <h4 className="text-lg font-bold">Years Experience</h4>
                  <p className="text-gray-500">In the fitness industry</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="bg-primary-600 mr-4 flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold text-white">
                  25+
                </div>
                <div>
                  <h4 className="text-lg font-bold">Pro Trainers</h4>
                  <p className="text-gray-500">Certified experts</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStorySection;
