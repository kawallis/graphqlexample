module.exports =  {
    Query: {
        allCats: async (parent, args, { Cat }) => {
            //{ _id: 123212, name: 'whatevsBro'}
            const cats = await Cat.find()
            return cats.map(cat => {
                cat._id = cat._id.toString();
                return cat
            })
        }
    },
    Mutation: {
        createCat: async (parent, args, { Cat }) => {
            const kitty = await new Cat(args).save()
            kitty._id = kitty._id.toString();
            return kitty
        }
    }
}