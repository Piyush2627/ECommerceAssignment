import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaCartShopping } from "react-icons/fa6";

interface HomepageProductsProps {
  categories: string;
}
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { FaMinus, FaPlus, FaRegHeart } from "react-icons/fa";
import { fetchProductCategories } from "@/api/fetchProductCategories";
import { useParams } from "react-router-dom";
import { Input } from "./ui/input";
import { Product } from "@/@types/Types";

import {
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  Sheet,
} from "./ui/sheet";
import { ArrowLeftIcon } from "lucide-react";
import { ButtonGroup } from "./ui/button-group";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

function HomepageProducts() {
  const [isSearchText, setIsSearchText] = useState("");
  const [isAmountCounter, setIsAmountCounter] = useState(1);

  const [expandedCards, setExpandedCards] = useState<{ [id: number]: boolean }>(
    {},
  );

  const { categoryName } = useParams();
  const handleFilterData = () => {};

  const categoryMap: Record<string, number> = {
    cloths: 1,
    electronics: 2,
    furniture: 3,
    shoes: 4,
  };

  const categoryId = categoryName ? categoryMap[categoryName] : null;

  const fetchUrl = categoryId
    ? `products/?categoryId=${categoryId}`
    : "products";

  const { data, isLoading } = useQuery({
    queryKey: ["products", categoryName || "all"], // Key changes automatically!
    queryFn: () => fetchProductCategories(fetchUrl),
  });
  const [isFilterData, setIsFilterData] = useState<Product[] | undefined>(data);
  const filteredProducts = useMemo(() => {
    if (!data) return [];
    return data.filter((product) =>
      product.title.toLowerCase().includes(isSearchText.toLowerCase()),
    );
  }, [data, isSearchText]);
  const toggleDescription = (id: number) => {
    setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="bg-gray-50/50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between">
          <h2 className="mb-8 text-3xl font-bold tracking-tight text-gray-900">
            Featured Collection
          </h2>
          <div>
            <Input
              value={isSearchText}
              onChange={(e) => setIsSearchText(e.target.value)}
              className="border-gray-200"
              placeholder="Search"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts?.map((product) => {
            const isExpanded = expandedCards[product.id];

            return (
              <Card
                key={product.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border-0 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <CardHeader className="p-0">
                  <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
                    <img
                      src={product.images[0] || "https://placehold.co/400"}
                      alt={product.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    <div className="absolute top-4 left-4 bg-white/90 text-[10px] tracking-wider text-black uppercase shadow-sm backdrop-blur-sm hover:bg-white">
                      {product.category.name}
                    </div>

                    <button
                      className="absolute top-4 right-4 rounded-full bg-white/80 p-2 text-gray-600 shadow-sm backdrop-blur-sm transition-colors hover:bg-red-50 hover:text-red-500"
                      aria-label="Add to wishlist"
                    >
                      <FaRegHeart size={18} />
                    </button>
                  </div>
                </CardHeader>

                <CardContent className="flex flex-col gap-3 p-5">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle
                      className="line-clamp-1 text-lg leading-tight font-bold text-gray-900"
                      title={product.title}
                    >
                      {product.title}
                    </CardTitle>
                    <span className="shrink-0 text-lg font-bold text-emerald-700">
                      {product.price}
                    </span>
                  </div>

                  <div>
                    <p
                      className={`text-sm leading-relaxed text-gray-600 transition-all ${
                        !isExpanded ? "line-clamp-2" : ""
                      }`}
                    >
                      {product.description}
                    </p>

                    {product.description.length > 80 && (
                      <Button
                        onClick={() => toggleDescription(product.id)}
                        className="mt-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 hover:underline focus:outline-none"
                      >
                        {isExpanded ? "Show Less" : "Read More"}
                      </Button>
                    )}
                  </div>
                </CardContent>

                <CardFooter className="mt-auto pt-0">
                  <Sheet>
                    <SheetTrigger className="w-full gap-2 rounded-md bg-black py-2 text-white shadow-lg shadow-gray-900/20 transition-colors hover:bg-gray-800">
                      Shop now
                    </SheetTrigger>
                    <SheetContent className="border-0 bg-white">
                      <SheetHeader>
                        <SheetTitle>{product.title}</SheetTitle>

                        <SheetDescription>
                          {product.category.slug}
                        </SheetDescription>
                      </SheetHeader>
                      <div className="flex items-center">
                        <hr className="grow border-t border-gray-300" />
                        <hr className="grow border-t border-gray-300" />
                      </div>
                      <div className="p-4">
                        <img
                          src={product.images[0]}
                          className="rounded"
                          alt=""
                        />
                      </div>
                      <div className="px-4">
                        <div className="text-xl font-semibold">
                          Payment Method
                        </div>
                        <div className="mt-4">
                          <RadioGroup
                            defaultValue="comfortable"
                            className="w-fit"
                          >
                            <div className="flex items-center gap-3">
                              <RadioGroupItem value="default" id="r1" />
                              <Label htmlFor="r1">GPay</Label>
                            </div>
                            <div className="flex items-center gap-3">
                              <RadioGroupItem value="comfortable" id="r2" />
                              <Label htmlFor="r2">Card</Label>
                            </div>
                          </RadioGroup>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 px-4 align-middle">
                        <div>Quantity </div>
                        <ButtonGroup className="sm:flex">
                          <Button
                            variant="outline"
                            size="icon"
                            aria-label="Go Back"
                            className="border-gray-100"
                            onClick={() =>
                              setIsAmountCounter((prev) => prev + 1)
                            }
                          >
                            <FaPlus />
                          </Button>
                        </ButtonGroup>
                        <ButtonGroup>
                          <Button variant="outline" className="border-gray-100">
                            {isAmountCounter}
                          </Button>
                          <Button
                            variant="outline"
                            className="bg-black text-white"
                          >
                            {isAmountCounter * product.price}
                          </Button>
                        </ButtonGroup>

                        <ButtonGroup className="sm:flex">
                          <Button
                            variant="outline"
                            size="icon"
                            aria-label="Go Back"
                            className="border-gray-100"
                            onClick={() =>
                              setIsAmountCounter((prev) => prev - 1)
                            }
                          >
                            <FaMinus />
                          </Button>
                        </ButtonGroup>
                      </div>
                      <SheetFooter>
                        <Button
                          variant="default"
                          size="icon"
                          aria-label="Go Back"
                          className="w-full border-gray-100 bg-black text-white"
                        >
                          <div className="flex space-x-2">
                            <div>Check Out</div>
                            <div>
                              <FaCartShopping />
                            </div>
                          </div>
                        </Button>
                      </SheetFooter>
                    </SheetContent>
                  </Sheet>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default HomepageProducts;
