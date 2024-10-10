/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "pokeapi.co",
                port: '', // No port specified
                pathname: '/api/v2/pokemon/**', // Matches all API Pokémon endpoints
            },
            {
                protocol: "https",
                hostname: "raw.githubusercontent.com", // New entry for raw.githubusercontent.com
                port: '',
                pathname: '/PokeAPI/sprites/master/sprites/pokemon/**', // Matches all sprite URLs
            },
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
                port: '',
                pathname: '/**', 
            },

        ],
    },
};

export default nextConfig;
