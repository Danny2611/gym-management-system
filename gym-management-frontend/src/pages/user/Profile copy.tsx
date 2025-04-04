import React, { useState, useEffect } from "react";
import { FiEdit, FiSave, FiX } from "react-icons/fi";
import PageMeta from "~/components/dashboard/common/PageMeta";
import ProfileImage from "~/components/user/ProfileImage";
import { memberService } from "~/services/memberService";
import { toast } from "react-hot-toast";

export default function Profile() {
  const [userData, setUserData] = useState({
    avatar: "",
    name: "",
    email: "",
    phone: "",
    gender: "",
    dateOfBirth: "",
    address: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(userData);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setIsLoading(true);
      const response = await memberService.getCurrentProfile();
      if (response.success && response.data) {
        let formattedDate = "";
        if (response.data.dateOfBirth) {
          const date = new Date(response.data.dateOfBirth);
          formattedDate = date.toISOString().split("T")[0];
        }

        const profileData = {
          avatar: response.data.avatar || "",
          name: response.data.name || "",
          email: response.data.email || "",
          phone: response.data.phone || "",
          gender: response.data.gender || "",
          dateOfBirth: formattedDate,
          address: response.data.address || "",
        };

        setUserData(profileData);
        setFormData(profileData);
      } else {
        toast.error("Không thể tải thông tin người dùng");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Đã xảy ra lỗi khi tải thông tin cá nhân");
    } finally {
      setIsLoading(false);
    }
  };

  const validateField = (name: string, value: string) => {
    const newErrors = { ...errors };

    switch (name) {
      case "phone":
        if (value && !/^(\+84|84|0)?[1-9][0-9]{8,9}$/.test(value)) {
          newErrors.phone =
            "Số điện thoại không hợp lệ (10-11 số, bắt đầu bằng 0, 84 hoặc +84)";
        } else {
          delete newErrors.phone;
        }
        break;

      case "dateOfBirth":
        if (value) {
          const dob = new Date(value);
          const now = new Date();
          const minAgeDate = new Date(now.setFullYear(now.getFullYear() - 10));
          const maxAgeDate = new Date(now.setFullYear(now.getFullYear() - 100));

          if (dob > minAgeDate) {
            newErrors.dateOfBirth = "Bạn phải ít nhất 10 tuổi";
          } else if (dob < maxAgeDate) {
            newErrors.dateOfBirth = "Ngày sinh không hợp lệ";
          } else {
            delete newErrors.dateOfBirth;
          }
        } else {
          delete newErrors.dateOfBirth;
        }
        break;

      case "name":
        if (!value.trim()) {
          newErrors.name = "Tên không được để trống";
        } else if (value.length < 2 || value.length > 100) {
          newErrors.name = "Tên phải có độ dài từ 2-100 ký tự";
        } else {
          delete newErrors.name;
        }
        break;

      case "address":
        if (value && (value.length < 5 || value.length > 255)) {
          newErrors.address = "Địa chỉ phải có độ dài từ 5-255 ký tự";
        } else {
          delete newErrors.address;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Validate real-time
    validateField(name, value);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Chỉ validate các trường đã thay đổi
    if (formData.name !== userData.name) {
      if (!formData.name.trim()) {
        newErrors.name = "Tên không được để trống";
      } else if (formData.name.length < 2 || formData.name.length > 100) {
        newErrors.name = "Tên phải có độ dài từ 2-100 ký tự";
      }
    }

    if (formData.phone !== userData.phone) {
      if (
        formData.phone &&
        !/^(\+84|84|0)?[1-9][0-9]{8,9}$/.test(formData.phone)
      ) {
        newErrors.phone =
          "Số điện thoại không hợp lệ (10-11 số, bắt đầu bằng 0, 84 hoặc +84)";
      }
    }

    if (formData.dateOfBirth !== userData.dateOfBirth) {
      if (formData.dateOfBirth) {
        const dob = new Date(formData.dateOfBirth);
        const now = new Date();
        const minAgeDate = new Date(now.setFullYear(now.getFullYear() - 10));
        const maxAgeDate = new Date(now.setFullYear(now.getFullYear() - 100));

        if (dob > minAgeDate) {
          newErrors.dateOfBirth = "Bạn phải ít nhất 10 tuổi";
        } else if (dob < maxAgeDate) {
          newErrors.dateOfBirth = "Ngày sinh không hợp lệ";
        }
      }
    }

    if (formData.address !== userData.address) {
      if (
        formData.address &&
        (formData.address.length < 5 || formData.address.length > 255)
      ) {
        newErrors.address = "Địa chỉ phải có độ dài từ 5-255 ký tự";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Vui lòng kiểm tra lại thông tin");
      return;
    }

    const updateData: Record<string, string> = {};

    if (formData.name !== userData.name) updateData.name = formData.name;
    if (formData.phone !== userData.phone) updateData.phone = formData.phone;
    if (formData.gender !== userData.gender)
      updateData.gender = formData.gender;
    if (formData.dateOfBirth !== userData.dateOfBirth)
      updateData.dateOfBirth = formData.dateOfBirth;
    if (formData.address !== userData.address)
      updateData.address = formData.address;

    try {
      const response = await memberService.updateProfile(updateData);

      if (response.success) {
        setUserData({ ...formData });
        setIsEditing(false);
        toast.success("Cập nhật thông tin thành công");
        await fetchUserProfile();
      } else {
        // Hiển thị lỗi từ server
        if (response.errors) {
          response.errors.forEach((err: any) => {
            toast.error(err.msg); // Hiển thị từng lỗi
            console.error(`Lỗi field ${err.path}:`, err.msg);
          });
        }
      }
    } catch (error: any) {
      console.error("Chi tiết lỗi:", error.response?.data);

      // Xử lý lỗi từ axios
      if (error.response?.data?.errors) {
        error.response.data.errors.forEach((err: any) => {
          toast.error(err.msg);
          // Cập nhật state errors để highlight field lỗi
          setErrors((prev) => ({ ...prev, [err.path]: err.msg }));
        });
      } else {
        toast.error(
          error.response?.data?.message || "Lỗi khi cập nhật thông tin",
        );
      }
    }
  };

  const handleCancel = () => {
    setFormData(userData);
    setIsEditing(false);
    setErrors({});
  };

  const handleAvatarChange = async (file: File) => {
    try {
      const response = await memberService.updateAvatar(file);
      if (response.success && response.data) {
        const updatedData = {
          ...formData,
          avatar: response.data.avatar,
        };
        setFormData(updatedData);
        setUserData(updatedData);
        toast.success("Cập nhật ảnh đại diện thành công");
      } else {
        toast.error(response.message || "Cập nhật ảnh đại diện thất bại");
      }
    } catch (error) {
      console.error("Error updating avatar:", error);
      toast.error("Đã xảy ra lỗi khi cập nhật ảnh đại diện");
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-full min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8 dark:bg-gray-900 sm:px-6 lg:px-8">
      <PageMeta
        title="Thông tin cá nhân | GymManagement"
        description="Xem và cập nhật thông tin cá nhân"
      />

      <div className="mx-auto max-w-4xl overflow-hidden rounded-lg bg-white shadow-lg dark:bg-gray-800">
        <div className="bg-blue-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Thông tin cá nhân</h2>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-blue-600 transition hover:bg-blue-50"
              >
                <FiEdit />
                <span>Chỉnh sửa</span>
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  type="submit"
                  form="profileForm"
                  className="flex items-center gap-2 rounded-full bg-green-500 px-4 py-2 text-white transition hover:bg-green-600"
                  disabled={Object.keys(errors).length > 0}
                >
                  <FiSave />
                  <span>Lưu</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 rounded-full bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
                >
                  <FiX />
                  <span>Hủy</span>
                </button>
              </div>
            )}
          </div>
        </div>

        <form id="profileForm" onSubmit={handleSubmit} className="p-6">
          <div className="flex flex-col gap-8 md:flex-row">
            <div className="w-full md:w-1/3">
              <ProfileImage
                avatar={userData.avatar}
                name={userData.name}
                editable={isEditing}
                onChange={handleAvatarChange}
              />
            </div>

            <div className="grid w-full grid-cols-1 gap-6 md:w-2/3 md:grid-cols-2">
              {/* Name Field */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Họ và tên
                </label>
                {isEditing ? (
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 ${
                        errors.name
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-blue-500 dark:border-gray-600 dark:focus:ring-blue-400"
                      } dark:bg-gray-700 dark:text-white`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-900 dark:text-white">
                    {userData.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <p className="text-gray-900 dark:text-white">
                  {userData.email}
                </p>
              </div>

              {/* Phone Field */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Số điện thoại
                </label>
                {isEditing ? (
                  <div>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 ${
                        errors.phone
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-blue-500 dark:border-gray-600 dark:focus:ring-blue-400"
                      } dark:bg-gray-700 dark:text-white`}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-900 dark:text-white">
                    {userData.phone}
                  </p>
                )}
              </div>

              {/* Gender Field */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Giới tính
                </label>
                {isEditing ? (
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-400"
                  >
                    <option value="">Chọn giới tính</option>
                    <option value="male">Nam</option>
                    <option value="female">Nữ</option>
                    <option value="other">Khác</option>
                  </select>
                ) : (
                  <p className="text-gray-900 dark:text-white">
                    {formData.gender === "male"
                      ? "Nam"
                      : formData.gender === "female"
                        ? "Nữ"
                        : "Khác"}
                  </p>
                )}
              </div>

              {/* Date of Birth Field */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Ngày sinh
                </label>
                {isEditing ? (
                  <div>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      className={`w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 ${
                        errors.dateOfBirth
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-blue-500 dark:border-gray-600 dark:focus:ring-blue-400"
                      } dark:bg-gray-700 dark:text-white`}
                    />
                    {errors.dateOfBirth && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.dateOfBirth}
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-900 dark:text-white">
                    {userData.dateOfBirth
                      ? new Date(userData.dateOfBirth).toLocaleDateString(
                          "vi-VN",
                        )
                      : "Chưa cập nhật"}
                  </p>
                )}
              </div>

              {/* Address Field - Full Width */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Địa chỉ
                </label>
                {isEditing ? (
                  <div>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows={3}
                      className={`w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 ${
                        errors.address
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-blue-500 dark:border-gray-600 dark:focus:ring-blue-400"
                      } dark:bg-gray-700 dark:text-white`}
                    />
                    {errors.address && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.address}
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-900 dark:text-white">
                    {userData.address || "Chưa cập nhật"}
                  </p>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
