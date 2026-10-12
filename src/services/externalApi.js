const BASE_URL = "https://dummyjson.com";

export async function getRecipes(signal) {
    const res = await fetch(`${BASE_URL}/recipes?limit=20`, { signal });
    if (!res.ok) throw new Error(`Ошибка сервера: ${res.status}`);
    const data = await res.json();
    return data.recipes;
}
