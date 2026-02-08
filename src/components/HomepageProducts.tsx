import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
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

import { FaShoppingCart, FaRegHeart, FaSpinner } from "react-icons/fa";
import { fetchProductCategories } from "@/api/fetchProductCategories";
import { useParams } from "react-router-dom";

function HomepageProducts() {
  const [expandedCards, setExpandedCards] = useState<{ [id: number]: boolean }>(
    {},
  );
  const { categoryName } = useParams();

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

  const toggleDescription = (id: number) => {
    setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="bg-gray-50/50">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-3xl font-bold tracking-tight text-gray-900">
          Featured Collection
        </h2>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data?.map((product) => {
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
                  <Button className="w-full gap-2 bg-black text-white shadow-lg shadow-gray-900/20 transition-colors hover:bg-gray-800">
                    <FaShoppingCart size={16} />
                    Add to Cart
                  </Button>
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
