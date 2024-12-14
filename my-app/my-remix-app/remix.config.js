module.exports = {
    // other configs
    routes: (defineRoutes) => {
        return defineRoutes((route) => {
            route("movies/$movieId", "routes/movies/$movieId.tsx");
        });
    },
};