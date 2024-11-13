import Image from "next/image";
import FooterList from "./ui/footerlist";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer mx-[5%]">
      <section>
        <Link href="/">
          <Image
            src="/logofooter.svg"
            alt=""
            width={72}
            height={50}
            className="mb-5"
          ></Image>
        </Link>
      </section>
      <section className="footerlist grid grid-cols-2 sm:flex sm:justify-between mb-20">
        <section>
          <FooterList>{["Product", "Updates", "Security", "Join"]}</FooterList>
        </section>
        <section>
          <FooterList>{["Company", "About", "FAQ", "Forum"]}</FooterList>
        </section>
        <section>
          <FooterList>
            {[
              "Industries",
              "Business Model",
              "Taxation Information",
              "Ventures",
            ]}
          </FooterList>
        </section>
        <section>
          <FooterList>
            {[
              "Help",
              "Support Email",
              "Support Docs",
              "Complaints",
              "System Status",
            ]}
          </FooterList>
        </section>
        <section className=" hidden subscribe mt-8 lg:block">
          <h1 className="text-grayf text-[18px] ml-4 mb-3">
            Subscribe to our newsletter!
          </h1>
          <form className="flex justify-between border-2 border-grayf rounded-[40px] w-[500px] cursor-text">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-transparent border-none outline-none appearance-none w-[350px] text-grayf h-[60px] leading-[58px] align-middle ml-3 text-[16px]"
            />
            <button
              type="submit"
              className="bg-red-500 rounded-[40px] w-[120px] h-[60px] text-black align-middle leading-[58px] text-center "
            >
              Subscribe
            </button>
          </form>
        </section>
      </section>
      <section className="terms">
        <p className="text-[15px] float-right mb-4">
          Terms & Conditions | Privacy Policy
        </p>
      </section>
    </footer>
  );
}
