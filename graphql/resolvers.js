const resolvers = {
    Query: {
        hello: () => "world",
        Satellites: function () {
            return [
                {
                    id: 1,
                },
                {
                    id: 2,
                },
                {
                    id: 3,
                },
            ];
        },
    },
};

export default resolvers;
