import Image from "next/image";
import FooterList from "./ui/footerlist";

export default function Footer() {
  return (
    <div className="footer mx-[5%]">
      <Image
        src="/logofooter.svg"
        alt=""
        width={72}
        height={50}
        className="mb-5"
      ></Image>
      <div className="footerlist grid grid-cols-2 sm:flex sm:justify-between mb-20">
        <FooterList>{["Product", "Updates", "Security", "Join"]}</FooterList>
        <FooterList>{["Company", "About", "FAQ", "Forum"]}</FooterList>
        <FooterList>
          {["Industries", "Business Model", "Taxation Information", "Ventures"]}
        </FooterList>
        <FooterList>
          {[
            "Help",
            "Support Email",
            "Support Docs",
            "Complaints",
            "System Status",
          ]}
        </FooterList>
        <div className=" hidden subscribe mt-8 lg:block">
          <p className="text-grayf text-[18px] ml-4 mb-3">
            Subscribe to our newsletter!
          </p>
          <div className="flex justify-between border-2 border-grayf rounded-[40px] w-[500px] cursor-text">
            <p className="text-grayf h-[60px] leading-[58px] align-middle ml-3 text-[16px] ">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent border-none outline-none appearance-none w-[350px]"
              />
            </p>
            <div className="bg-red-500 rounded-[40px] w-[120px] h-[60px] text-black align-middle leading-[58px] text-center cursor-pointer ">
              Subscribe
            </div>
          </div>
        </div>
      </div>
      <div className="terms">
        <div className="h-[0.5px] mb-4 bg-grayf"></div>
        <p className="text-[15px] float-right mb-4">
          Terms & Conditions | Privacy Policy
        </p>
      </div>
    </div>
  );
}
