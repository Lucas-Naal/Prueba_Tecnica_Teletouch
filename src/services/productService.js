const API_URL = "https://dummyjson.com";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const STORAGE_KEY = "mock_products";

const getLocalProducts = async () => {
    const local = localStorage.getItem(STORAGE_KEY);
    if (local) return JSON.parse(local);

    const res = await fetch(`${API_URL}/products?limit=20`);
    const data = await res.json();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data.products));
    return data.products;
};

const saveLocalProducts = (products) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
};

export const productService = {
    async getProducts() {
        await delay(500); 
        return getLocalProducts();
    },

    async createProduct(data) {
        await delay(800); 
        const products = await getLocalProducts();

        const newProduct = {
            ...data,
            id: Date.now(), 
            thumbnail: "https://dummyjson.com/icon/placeholder/150", 
            rating: 4.5,
            stock: 10,
        };

        const updatedProducts = [newProduct, ...products];
        saveLocalProducts(updatedProducts);

        return newProduct;
    },

    async updateProduct(id, data) {
        await delay(800);
        const products = await getLocalProducts();

        const updatedProducts = products.map((p) =>
            p.id === id ? { ...p, ...data } : p
        );

        saveLocalProducts(updatedProducts);
        return data;
    },

    async deleteProduct(id) {
        await delay(800);
        const products = await getLocalProducts();
        const filtered = products.filter((p) => p.id !== id);

        saveLocalProducts(filtered);
        return { success: true };
    },
};