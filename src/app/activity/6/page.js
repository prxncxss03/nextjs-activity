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
    ${process.env.NEXT_PUBLIC_POKEMON_BASE_URL}/pokemon
    `);

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
}

const fetchPokemonDescription = async (name) => {
  const response = await fetch(`
            ${process.env.NEXT_PUBLIC_POKEMON_BASE_URL}/pokemon-species/${name}
        `);

  if (!response.ok) {
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
                  src={`${process.env.NEXT_PUBLIC_POKEMON_IMAGE_URL}/${
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
