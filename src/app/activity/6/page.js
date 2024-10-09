import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

async function fetchPokemonData() {
  const response = await fetch(`
        https://pokeapi.co/api/v2/pokemon
    `);

  if (!response.ok) {
    console.error("Failed to fetch data:", response);
    throw new Error("Failed to fetch data");
  }
  return response.json();
}

const fetchPokemonDescription = async (name) => {
  const response = await fetch(`
            https://pokeapi.co/api/v2/pokemon-species/${name}
        `);

  if (!response.ok) {
    console.error("Failed to fetch data:", response);
    throw new Error("Failed to fetch data");
  }
  return response.json();
};

const Activity6 = async () => {
  let data = await fetchPokemonData();

  return (
    <div>
      <div className="flex flex-wrap justify-center items-center w-full">
        {data.results.map((pokemon, index) => {
          return (
            <Card key={index} className="w-80 m-2">
              <CardHeader>
                <CardTitle>
                  {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Image
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                    index + 1
                  }.png`}
                  alt={pokemon.name}
                  width={150}
                  height={150}
                  className="rounded-full 
                    mx-auto
                  "
                />
              </CardContent>

              <CardFooter>
                <CardDescription>
                  {fetchPokemonDescription(pokemon.name).then((data) => {
                    return data.flavor_text_entries[1].flavor_text;
                  })}
                </CardDescription>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Activity6;
