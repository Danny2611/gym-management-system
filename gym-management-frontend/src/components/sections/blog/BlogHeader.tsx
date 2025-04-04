import React from "react";
import SectionTitle from "../../common/SectionTitle";

interface BlogHeaderProps {
  title: string;
  subtitle?: string;
  alignment?: string;
}

const BlogHeader: React.FC<BlogHeaderProps> = ({
  title,
  subtitle,
  alignment,
}) => {
  return (
    <div className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <SectionTitle
          title={title}
          subtitle={
            subtitle ||
            "Stay updated with our latest fitness tips, news and stories"
          }
          alignment={"center"}
        />
      </div>
    </div>
  );
};

export default BlogHeader;
