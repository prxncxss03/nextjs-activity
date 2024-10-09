
export const dynamic = 'force-dynamic'; // defaults to auto

export async function GET() {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon");
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
    }
    const pokemons = await res.json();
    return Response.json({ pokemons });
}
