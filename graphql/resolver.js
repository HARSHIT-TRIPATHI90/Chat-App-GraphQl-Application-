const {v4: uuidv4} = require('uuid')

let messages = [];

const resolvers = {
    Query: {
        messages: () => messages,
    },
    Mutation: {
        sendMessage: (_,{content,author}) => {
            const newMessage = {id: uuidv4(),content,author};
            messages.push(newMessage);
            return newMessage;
        },
    },
};

module.exports = resolvers;
