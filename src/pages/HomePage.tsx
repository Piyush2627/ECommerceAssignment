import { Button } from "@/components/ui/button";
import HomepageProducts from "@/components/HomepageProducts";
import { MoveDown } from "lucide-react";

function HomePage() {
  return (
    <div className="mx-auto mt-22 max-w-7xl">
      <div className="flex">
        <div className="">
          <div className="text-9xl font-bold tracking-tighter"> Marketa. </div>
          <div className="text-7xl leading-20 font-bold tracking-tight">
            Everything you
            <br /> need.
          </div>
          <div className="text-muted-foreground text-justify text-2xl text-gray-700">
            Discover your favorite products all in one place. Fast, easy, and
            secure shopping at your fingertips.
          </div>
          <div className="mt-12 flex items-center gap-4">
            <Button className="hover:bg-primary/90 rounded-md bg-black py-2 text-white">
              Shop Now
            </Button>
            <Button variant="outline" className="border-gray-300 px-4 py-2">
              Learn More
            </Button>
          </div>
          <a href="#section1">
            <div className="mt-6 flex animate-bounce items-center align-middle">
              <div className="text-2xl font-semibold">Scroll Down</div>
              <div>
                <MoveDown />
              </div>
            </div>
          </a>
        </div>
        <div>
          <img src="/src/assets/HeadphoneHomePage.png" alt="Headphone" />
        </div>
      </div>
      <div className="flex items-center">
        <hr className="grow border-t border-gray-300" />
        <span className="px-4 text-gray-500">OR</span>
        <hr className="grow border-t border-gray-300" />
      </div>

      <div>
        <div id="section1" className="text-9xl font-bold tracking-tighter">
          {" "}
          Products.{" "}
        </div>
      </div>
      <HomepageProducts />
    </div>
  );
}

export default HomePage;
