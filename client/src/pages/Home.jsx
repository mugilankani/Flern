import clsx from "clsx";
import { pricingCards } from "@/lib/constants"; // Adjust the path as needed
import { Check } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import Flern from "../../public/Flern.png";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa"; // Import social media icons

export default function Home() {
  return (
    <>
      <section className="relative flex h-full w-full flex-col items-center justify-center pt-52">
        {/* Fixed background */}
        <div className="fixed top-0 z-[-2] h-[100vh] w-full bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] dark:bg-black" />

        <p className="text-center">Learn Everything in a single place</p>

        <div className="relative bg-gradient-to-r from-primary to-secondary-foreground bg-clip-text text-transparent">
          <h1 className="text-center text-9xl font-bold md:text-[300px]">
            Flern
          </h1>
        </div>

        <div className="relative flex items-center justify-center md:mt-[-70px]">
          <img
            src={Flern}
            alt="Banner image"
            height={1200}
            width={1200}
            className="rounded-tl-3xl rounded-tr-2xl border-2 border-muted"
          />
          <div className="absolute bottom-0 left-0 right-0 top-[50%] z-10 bg-gradient-to-t dark:from-background"></div>
        </div>
      </section>

      {/* Scrollable Content Section */}
      <section className="z-10 mt-10 flex flex-col items-center justify-center gap-4 overflow-y-auto pt-36">
        <h2 className="text-center text-4xl">Choose what fits you right</h2>
        <p className="text-center text-muted-foreground">
          Our straightforward pricing plans are tailored to meet your needs. If{" "}
          you're not ready to commit, you can get started for free.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          {pricingCards.map((card) => {
            return (
              <Card
                key={card.title}
                className={clsx("flex w-[300px] flex-col justify-between", {
                  "border-2 border-primary": card.title === "Unlimited Saas",
                })}
              >
                <CardHeader>
                  <CardTitle
                    className={clsx("", {
                      "text-muted-foreground": card.title !== "Unlimited Saas",
                    })}
                  >
                    {card.title}
                  </CardTitle>
                  <CardDescription>{card.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="text-4xl font-bold">{card.price}</span>
                  <span className="text-muted-foreground">/m</span>
                </CardContent>
                <CardFooter className="flex flex-col items-start gap-4">
                  <div>
                    {card.features.map((feature) => {
                      return (
                        <div key={feature} className="flex items-center gap-2">
                          <Check />
                          <p>{feature}</p>
                        </div>
                      );
                    })}
                  </div>
                  <Link
                    href={`/agency?plan=${card.priceId}`}
                    className={clsx(
                      "w-full rounded-md bg-primary p-2 text-center text-white",
                      {
                        "!bg-muted-foreground": card.title !== "Unlimited Saas",
                      },
                    )}
                  >
                    Get Started
                  </Link>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-10 bg-background py-8">
        <hr />
        <div className="container mx-auto flex flex-col items-center px-6 text-center text-muted-foreground">
          {/* Logo and tagline */}
          <div className="m-6">
            <h2 className="text-4xl font-bold text-primary">Flern</h2>
          </div>

          {/* Navigation links */}
          <nav className="mb-6">
            <ul className="flex space-x-6">
              <li>
                <Link to="/about" className="hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-primary">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          {/* Social Media Links */}
          <div className="mb-6 flex space-x-6">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary"
            >
              <FaLinkedin size={24} />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary"
            >
              <FaGithub size={24} />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Flern. All Rights Reserved.
            <h3 className="mt-6 text-center text-xl font-semibold text-primary">
              Made ❤️ by team Strix
            </h3>
          </p>
        </div>
      </footer>
    </>
  );
}
