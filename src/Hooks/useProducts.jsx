import { useQuery } from "@tanstack/react-query";

// Hook lấy products
export function useProducts(category = "all", page = 1) {
  return useQuery({
    queryKey: ["products", category, page],
    queryFn: async () => {
      let url = "http://localhost:8080/api/v1/products";

      // Nếu là "all" thì dùng ?isActive=true
      if (category === "all") {
        url += "?status=active&page=" + page;
      } else {
        // Nếu khác all thì dùng ?productCategoriesId=<id>
        url += `?productCategoriesId=${category}&page=` + page;
      }

      const res = await fetch(url);
      if (!res.ok) throw new Error("Network response was not ok");

      const data = await res.json();

      // console.log(category, data, url);

      // Trả về danh sách products
      return {
        products: data?.data?.content || [],
        totalPages: data?.data?.totalPages || 0,
      };
    },
    staleTime: 1000 * 60, // cache 1 phút
  });
}

// Helper format giá
export function formatPrice(price) {
  if (price == null) return "0₫";
  return Number(price).toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
}
