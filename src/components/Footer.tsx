import Image from "next/image";

const Footer = () => {
  const customerCareItems = [
    "Trung Tâm Trợ Giúp",
    "Hướng Dẫn Mua Hàng",
    "Thanh Toán",
    "Vận Chuyển",
    "Chăm Sóc Khách Hàng",
    "Chính Sách Bảo Hành",
  ];

  const aboutFoodPtitItems = [
    "Giới Thiệu",
    "Tuyển Dụng",
    "Điều Khoản",
    "Chính Sách Bảo Mật",
    "Kênh Người Bán",
    "Liên Hệ Với Truyền Thông",
  ];

  return (
    <div className="bg-red-100 py-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 px-12">
          <div className="text-center lg:text-start">
            <h2 className="text-lg font-semibold mb-4">Chăm Sóc Khách Hàng</h2>
            <ul className="text-gray-800">
              {customerCareItems.map((item, index) => (
                <li
                  key={index}
                  className="hover:underline hover:font-bold cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="text-center lg:text-start">
            <h2 className="text-lg font-semibold mb-4">VỀ FOOD PTIT</h2>
            <ul className="text-gray-800">
              {aboutFoodPtitItems.map((item, index) => (
                <li
                  key={index}
                  className="hover:underline hover:font-bold cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="text-center lg:text-start lg:block hidden">
            <div className="flex items-center md:col-span-2">
              <h2 className="text-lg font-semibold text-gray-800 mr-4">
                THEO DÕI CHÚNG TÔI TRÊN
              </h2>
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/1200px-Facebook_f_logo_%282019%29.svg.png"
                width={20}
                height={20}
                className="mr-2"
                alt="Facebook"
              />
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png"
                width={20}
                height={20}
                className="mr-2"
                alt="Instagram"
              />
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/600px-LinkedIn_logo_initials.png"
                width={20}
                height={20}
                className="mr-2"
                alt="LinkedIn"
              />
            </div>
            <div className="flex items-center mt-4 md:col-span-2">
              <div>
                <p className="text-gray-800 mr-4">Liên hệ: (012) 345-6789</p>
                <p className="text-gray-800 mr-2"></p>
                <p className="text-gray-800 mr-4">Email: abc@gmail.com</p>
                <p className="text-gray-800"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
